const fireBaseRoom = require('../../fireBaseDB/room');

module.exports = ({ io, db, socket, roomMatchingUsers }) => {
    socket.on("join room", ({ roomID, myNickname }) => {
        if (roomMatchingUsers[roomID] === undefined || !roomMatchingUsers[roomID].some((i) => i === myNickname)) {
            // room에 사용자 추가
            fireBaseRoom.joinRoom({ roomId: roomID, nickname: myNickname });
            socket.roomID = roomID;
            socket.nickname = myNickname;
            let setUsersInThisRoom = io.sockets.adapter.rooms.get(roomID);
            let usersInThisRoom = setUsersInThisRoom === undefined ? [] : Array.from(setUsersInThisRoom);
            console.log(usersInThisRoom);
            socket.join(roomID);
            if (roomMatchingUsers[roomID] === undefined) {
                roomMatchingUsers[roomID] = [];
            }
            roomMatchingUsers[roomID].push(myNickname);
            console.log("join room", roomID, myNickname);
            console.log("join usersInThisRoom", usersInThisRoom);
            console.log("join roomMatchingUsers", roomMatchingUsers);
            socket.emit("all users", usersInThisRoom); // Set으로 받아오기에 값을 array로 바꿔줬음.
        }
        else {
            socket.emit("Duplicate ID");
            socket.disconnect();
        }
    });

    socket.on("sending signal", ({ signal, callerID, userToSignal, myNickname }) => {
        console.log("sending signal");
        io.to(userToSignal).emit('user joined', { signal, callerID, peerNickname: myNickname });
    });

    socket.on("returning signal", ({ callerID, signal, myNickname }) => {
        socket.peerNickname = myNickname;
        console.log("returning signal");
        io.to(callerID).emit('receiving returned signal', { signal: signal, id: socket.id, peerNickname: myNickname });
    });

    // socket.on('disconnect', () => {
    //     console.log("disconnect");
    //     socket.broadcast.to(socket.roomID).emit("disconnect user", socket.id, socket.peerNickname);
    //     socket.broadcast.to(socket.voiceRoomID).emit("disconnect voice user", socket.id, socket.peerNickname);
    //     socket.leave(socket.rooms);
    // });
    // ----------------------------------------------------------------------
    // voice signalling and disconnect
};
