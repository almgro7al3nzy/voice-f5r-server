const fireBaseRoom = require('../fireBaseDB/room');


module.exports = ({ io }) => {
    let roomMatchingUsers = { }
    let voiceRoomMatchingUsers = { }
    io.on('connection', socket => {
        require("./Room/room")({ io, socket, roomMatchingUsers });
        require("./Room/voiceRoom")({ io, socket, voiceRoomMatchingUsers });
        // require("./chat/chat")({ io, socket });
        socket.on('disconnect', () => {

            //  firestore에서 room 안에 있던 사용자 제거
            fireBaseRoom.disconnectRoom({ roomId: socket.roomID, nickname: socket.nickname });

            console.log("disconnect");
            socket.broadcast.to(socket.roomID).emit("disconnect user", socket.id, socket.nickname);
            console.log("disconnect emit roomID");
            socket.broadcast.to(socket.voiceRoomID).emit("disconnect voice user", socket.id, socket.nickname);
            console.log("disconnect emit voiceRoomID");
            if (roomMatchingUsers[socket.roomID] !== undefined) {
                roomMatchingUsers[socket.roomID] = roomMatchingUsers[socket.roomID].filter((i) => i !== socket.nickname);
            }
            if (voiceRoomMatchingUsers[socket.voiceRoomID] !== undefined) {
                voiceRoomMatchingUsers[socket.voiceRoomID] = voiceRoomMatchingUsers[socket.voiceRoomID].filter((i) => i !== socket.nickname)
            }
            console.log("disconnect roomMatchingUsers : ", roomMatchingUsers);
            console.log("disconnect voiceRoomMatchingUsers : ", voiceRoomMatchingUsers);
            socket.leave(socket.rooms);
        });
    });
};

