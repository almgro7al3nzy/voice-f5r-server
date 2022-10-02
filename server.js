const ports = require('./ports.js');
const room = require('./room.js');
const options = require('./cert.js');

const path = require('path');
const url = require('url');
const https = require('https');
const http = require('http');
const ws = require('ws');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const signature = require('cookie-signature');

let rooms = new room.RoomList();
let masterIndex = null;

const secret = 'abc';
let store = new session.MemoryStore({
    checkPeriod: 3600000
});

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/room/', session({
    secret: secret,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 3600000,
        secure: false
    }
}));

function createRoom(word, pass, nick, req, res) {
    let r = rooms.addRoom(pass);
    if (r !== undefined && typeof r.index === 'number' && r.index >= 0) {
        r.word = word;
        req.session.cookie.path = '/room/' + r.index;
        req.session.cookie.httpOnly = false;
        req.session.room = r.index;
        req.session.pass = pass;
        req.session.nick = nick;
        req.session.touch();
        res.redirect(302, '/room/' + r.index);
    }
    else {
        res.redirect(302, '/');
    }
}
//
// app.get('/room/create', (req, res) => {
//     createRoom('', req, res);
// });
app.post('/room/create', (req, res) => {
    let pass = req.body.pass;
    let word = req.body.drawing;
    let nick = req.body.nick;
    if (pass === undefined) pass = '';
    if (word === undefined || word.trim() === '') {
        res.redirect(302, '/');
        return;
    }
    word = word.trim();
    if (nick === undefined || nick.trim() === '') {
        res.redirect(302, '/');
        return;
    }
    createRoom(word, pass, nick, req, res);
});
app.post('/room/join', (req, res) => {
    let roomNo = parseInt(req.body.roomNo);
    let nick = req.body.nick;
    if (roomNo === undefined || isNaN(roomNo)) {
        res.redirect(302, '/');
        return;
    }
    if (nick === undefined || nick.trim() === '') {
        res.redirect(302, '/');
        return;
    }
    let room = rooms.rooms[roomNo];
    if (room === undefined) {
        res.redirect(302, '/');
        return;
    }
    let peer = room.getPeerBySid(req.sessionID);
    if (peer !== undefined) {
        peer.nick = nick;
    }
    req.session.cookie.path = '/room/' + roomNo;
    req.session.cookie.httpOnly = false;
    req.session.room = roomNo;
    req.session.nick = nick;
    req.session.touch();
    res.redirect(302, '/room/'+roomNo);
});
app.get('/room/:id([0-9]+)', (req, res) => {
    req.session.cookie.path = '/room/' + req.params.id;
    req.session.cookie.httpOnly = false;
    req.session.room = parseInt(req.params.id);
    req.session.touch();
    res.sendFile(path.join(__dirname, 'room.html'));
});
app.use('/room/', express.static('static/'));
app.use('/', express.static('static/', {index: 'index.html'}));

let httpServer = http.createServer(app);
// let httpsServer = https.createServer(options, app);
// let wssServer = https.createServer(options);
let wss = new ws.Server({server: httpServer});

wss.on('connection', newWebsocketConnection);

function newWebsocketConnection(ws, req) {
    let addr = req.connection.remoteAddress;
    let sid = decodeURIComponent(url.parse(req.url, true).query.sid);
    if (sid === undefined || !sid.startsWith('s:')) {
        ws.close();
        return;
    }
    sid = signature.unsign(sid.substr(2), secret);
    store.get(sid, (err, sess) => {
        if (sess === undefined || sess === null) {
            ws.close();
            return;
        }
        if (typeof sess.room !== 'number' || rooms.rooms[sess.room] === undefined) {
            ws.close();
            return;
        }
        let peer = rooms.rooms[sess.room].addPeer(sid, ws);
        if (sess.nick !== undefined) {
            rooms.rooms[sess.room].peers[peer].nick = sess.nick;
        }
        sess.peer = peer;
        store.set(sid, sess, err => {
        });
        ws.sid = sid;
        console.log('New WebSocket connection from: ' + addr);
        ws.on('message', msg => {
            onMessage(ws, msg);
        });
        ws.on('close', event => {
            onWebsocketClose(ws, addr);
        });
        ws.binaryType = 'arraybuffer';
        if (rooms.rooms[sess.room].pass === undefined || rooms.rooms[sess.room].pass === '' || rooms.rooms[sess.room].pass === sess.pass) {
            rooms.rooms[sess.room].peers[peer].joined = true;
            ws.send(JSON.stringify({join: sess.room}));
            onJoin(sess.room, peer);
        }
        else {
            ws.send(JSON.stringify({needPass: sess.room}));
        }
    });
}

function onJoin(roomNo, peerNo) {
    let room = rooms.rooms[roomNo];
    for (let i = 0; i < room.peers.length; i++) {
        if (i === peerNo) continue;
        let peer = room.peers[i];
        if (peer.socket === undefined || peer.socket.readyState !== 1) continue;
        let initPeerNo = peerNo;
        if (i <= peerNo) initPeerNo--;
        // peer.socket.send(JSON.stringify({peers: room.peers.length - 1}));
        peer.socket.send(JSON.stringify({init: initPeerNo}));
        if (room.masterIndex === undefined || room.masterIndex === i) {
            room.peers[i].socket.send(JSON.stringify({master: true}));
            masterIndex = i;
            room.masterIndex = i;
        } else {
            room.peers[i].socket.send(JSON.stringify({master: false}));
        }
    }
    if (room.masterIndex === undefined) {
        room.masterIndex = peerNo;
        room.peers[peerNo].socket.send(JSON.stringify({master: true}));
    }
    else if (room.masterIndex === peerNo) {
        room.peers[peerNo].socket.send(JSON.stringify({master: true}));
    }
    else {
        room.peers[peerNo].socket.send(JSON.stringify({master: false}));
    }
    let peer = room.peers[peerNo];
    if (peer !== undefined && peer.socket !== undefined && peer.socket.readyState === 1) {
        peer.socket.send(JSON.stringify({nletters:room.word.length}));
        for (let i = 0; i < room.drawStack.length; i++) {
            peer.socket.send(room.drawStack[i]);
        }
        for (let i = 0; i < room.chat.length; i++) {
            peer.socket.send(room.chat[i]);
        }
    }
}

function onWebsocketClose(ws, addr) {
    store.get(ws.sid, (err, sess) => {
        if (sess !== undefined && sess !== null && typeof sess.room === 'number' && rooms.rooms[sess.room] !== undefined) {
            rooms.rooms[sess.room].removePeerBySid(ws.sid);
            let remove = true;
            for (let i = 0; i < rooms.rooms[sess.room].peers.length; i++) {
                if (rooms.rooms[sess.room].peers[i] !== undefined && rooms.rooms[sess.room].peers[i].socket !== undefined && rooms.rooms[sess.room].peers[i].socket.readyState <= 1) {
                    remove = false;
                    break;
                }
            }
            if (remove) {
                setTimeout(()=>{
                    for (let i = 0; i < rooms.rooms[sess.room].peers.length; i++) {
                        if (rooms.rooms[sess.room].peers[i] !== undefined && rooms.rooms[sess.room].peers[i].socket !== undefined && rooms.rooms[sess.room].peers[i].socket.readyState <= 1) {
                            remove = false;
                            break;
                        }
                    }
                    if (remove)
                        rooms.removeRoom(sess.roomNo);
                },5000);
            }
        }
        console.log('WebSocket disconnected from: ' + addr);
    });
}

function onMessage(ws, msg) {
    if (typeof msg === 'string') {
        try {
            let m = JSON.parse(msg);
            // console.log('json');
            // console.log(m);
            onMessageJson(ws, m);
        }
        catch (err) {
            console.log('string');
            // console.log(err);
            console.log(msg);
            onMessageString(ws, msg);
        }
    }
    else {
        if (ws.sid !== undefined) {
            store.get(ws.sid, (err, sess) => {
                let sid = ws.sid;
                let roomNo = undefined;
                let room = undefined;
                let peerNo = undefined;
                let peer = undefined;
                if (sess === undefined || sess === null) return;
                if (typeof sess.room === 'number' && rooms.rooms[sess.room] !== undefined) {
                    roomNo = sess.room;
                    room = rooms.rooms[roomNo];
                    if (typeof sess.peer === 'number' && room.peers[sess.peer] !== undefined && room.peers[sess.peer].sid === ws.sid) {
                        peerNo = sess.peer;
                        peer = room.peers[sess.peer];
                    }
                }
                if (peer !== undefined && peerNo === room.masterIndex) {
                    onMessageBinary(ws, msg, roomNo, peerNo);
                }
            });
        }
        // onMessageBinary(ws, msg);
    }
}

function onMessageJson(ws, msg) {
    if (ws.sid !== undefined) {
        store.get(ws.sid, (err, sess) => {
            let sid = ws.sid;
            let roomNo = undefined;
            let room = undefined;
            let peerNo = undefined;
            let peer = undefined;
            if (sess === undefined || sess === null) return;
            if (typeof sess.room === 'number' && rooms.rooms[sess.room] !== undefined) {
                roomNo = sess.room;
                room = rooms.rooms[roomNo];
                if (typeof sess.peer === 'number' && room.peers[sess.peer] !== undefined && room.peers[sess.peer].sid === ws.sid) {
                    peerNo = sess.peer;
                    peer = room.peers[sess.peer];
                }
            }
            if (typeof msg.pass === 'string' && peer !== undefined) {
                if (room.pass === msg.pass) {
                    sess.pass = msg.pass;
                    store.set(ws.sid, sess, err => {
                    });
                    room.join = true;
                    ws.send(JSON.stringify({join: sess.room}));
                    onJoin(roomNo, peerNo);
                }
                else {
                    ws.send(JSON.stringify({join: false}));
                }
            }
            if (typeof msg.chat === 'string' && peer !== undefined && peer.joined === true) {
                broadcast(JSON.stringify({nick: peer.nick, chat:msg.chat}), roomNo, peerNo);
                ws.send(JSON.stringify({nick: peer.nick, chat:msg.chat}));
                room.chat.push(JSON.stringify({nick: peer.nick, chat:msg.chat}));
                if (msg.chat === room.word && room.winner === undefined && peerNo !== room.masterIndex) {
                    room.winner = peerNo;
                    broadcast(JSON.stringify({win:{win:false,nick:peer.nick}}), roomNo, peerNo);
                    ws.send(JSON.stringify({win:{win:true,nick:peer.nick}}));
                }
            }
            if (msg.signal !== undefined && msg.signal.signal !== undefined && (msg.signal.peer === undefined || typeof msg.signal.peer === 'number') && peer !== undefined) {
                onMessageSignal(roomNo, peerNo, msg.signal.peer, msg.signal.signal);
            }
            if (msg.clear !== undefined && msg.clear === true && peer !== undefined && peerNo === room.masterIndex) {
                room.drawStack = [];
                broadcast(JSON.stringify({clear:true}), roomNo, peerNo);
                ws.send(JSON.stringify({clear:true}));
            }
        });
    }

    //TODO: json data
}

function onMessageString(ws, msg) {
    //TODO: non json string data
}

function onMessageBinary(ws, msg, roomNo, peerNo) {
    let room = rooms.rooms[roomNo];
    room.drawStack.push(msg);
    broadcast(msg, roomNo, peerNo);
}

function broadcast(msg, roomNo, peerNo) {
    if (rooms.rooms[roomNo] === undefined) return;
    const peers = rooms.rooms[roomNo].peers;
    for (let i = 0; i < peers.length; i++) {
        let peer = peers[i];
        if (peer !== undefined && peer.socket !== undefined && peer.socket.readyState === 1 && i !== peerNo) {
            peer.socket.send(msg);
        }
    }
}

function onMessagePeers(ws, peersCount) {
    store.get(ws.sid, (err, sess) => {
        // if (sess === undefined || typeof sess.room !== 'number' || typeof sess.peer !== 'number') return; //already checked in calling function
        if (rooms.rooms[sess.room].peers[sess.peer].joined !== true) return;
        ws.send(JSON.stringify({peers: rooms.rooms[sess.room].peers.length - 1}));
    });
}

function onMessageSignal(roomNo, peerNoFrom, peerNoTo, signal) {
    if (peerNoTo === undefined) {
        //broadcast??
    }
    else {
        if (peerNoTo >= peerNoFrom) peerNoTo++;
        let sock = rooms.rooms[roomNo].peers[peerNoTo].socket;
        if (peerNoFrom >= peerNoTo) peerNoFrom--;
        if (sock !== undefined) {
            sock.send(JSON.stringify({signal: {peer: peerNoFrom, signal: signal}}));
        }
    }
}

httpServer.listen(ports.https);
// wssServer.listen(ports.wss);
