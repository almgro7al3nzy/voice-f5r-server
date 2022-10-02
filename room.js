
class Room {

    constructor() {
        this.index = -1;
        this.peers = [];
        this.pass = '';
        this.word = undefined;
        this.winner = undefined;
        this.drawStack = [];
        this.chat = [];
        this.masterIndex = undefined;
        this.public = false;
    }

    addPeer(sid, sock) {
        let i = 0;
        for (;i < this.peers.length; i++) if (this.peers[i] !== undefined && this.peers[i].sid === sid) {
            this.peers[i].socket = sock;
            return i;
        }
        let p = {
            sid: sid,
            socket: sock,
            joined: false,
            nick: ''
        };
        return this.peers.push(p) - 1;
    }

    getPeerBySid(sid) {
        for (let i = 0; i < this.peers.length; i++) if (this.peers[i].sid === sid) return this.peers[i];
        return undefined;
    }

    removePeerBySid(sid) {
        for (let i = 0; i < this.peers.length; i++) {
            if (this.peers[i] !== undefined && this.peers[i].sid === sid) {
                if (this.peers[i].socket !== undefined && this.peers[i].socket.readyState <= 1) {
                    this.peers[i].socket.close();
                }
                this.peers[i].socket = undefined;
                this.peers[i].joined = false;
                return;
            }
        }
    }

}

class RoomList {

    constructor() {
        this.rooms = [];
        this.roomCount = 0;
    }

    addRoom(pass) {
        let r = new Room();
        r.pass = pass;
        let i = 0;
        for (;i < this.rooms.length; i++) if (this.rooms[i] === undefined) break;
        this.rooms[i] = r;
        r.index = i;
        this.roomCount++;
        setTimeout(() => {
            let activeConn = false;
            for (let i = 0; i < r.peers.length; i++) {
                if (r.peers[i] !== undefined && r.peers[i].socket !== undefined && r.peers[i].socket.readyState <= 1) {
                    activeConn = true;
                    break;
                }
            }
            if (!activeConn) {
                this.removeRoom(r.index);
            }
        }, 30000);
        console.log('Created room (' + r.index + ')');
        return r;
    }

    removeRoom(room) {
        if (room === undefined) return;
        if (typeof room === 'object' && room.index !== undefined) {
            room = room.index;
        }
        if (typeof room === 'number') {
            if (room < 0 || room >= this.rooms.length || this.rooms[room] === undefined) return;
            if (this.rooms[room].peers !== undefined && this.rooms[room].peers.length > 0) {
                for (let i = 0; i < this.rooms[room].peers.length; i++) {
                    if (this.rooms[room].peers[i] !== undefined && this.rooms[room].peers[i].socket !== undefined && this.rooms[room].peers[i].socket.readyState < 2) {
                        this.rooms[room].peers[i].socket.close();
                    }
                }
            }
            this.rooms[room].peers = [];
            this.rooms[room].index = -1;
            this.rooms[room] = undefined;
            this.roomCount--;
            console.log('Deleted room (' + room + ')');
        }
    }

}

module.exports = {Room: Room, RoomList: RoomList};
