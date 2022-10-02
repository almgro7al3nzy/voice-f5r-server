
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection', function (socket) {   // 채팅방에 접속했을 때 - 1
    let count = 0;
    console.log("연결된 socketID : " , count , socket.id, "\n");
    socket.on('SEND_MESSAGE', function (nickname, text) {   // 메세지를 보냈을 때 - 3
        console.log("[debug] send message : ", nickname, text);
        socket.broadcast.emit('RECEIVE_MESSAGE', nickname, text);
    });

});

http.listen(4444, function () {
    console.log('server on..');
});
