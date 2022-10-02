module.exports = ({io, socket}) => {
    console.log("CHAT -- 연결된 socketID : ", socket.id, "\n");
    socket.on('SEND_MESSAGE', function (nickname, text) {   // 메세지를 보냈을 때 - 3
        console.log("[debug] send message : ", nickname, text);
        socket.broadcast.emit('RECEIVE_MESSAGE', nickname, text);
    });
}
