module.exports = ({ io, socket, voiceRoomMatchingUsers }) => {
    socket.on("join voice room", ({ roomID, myNickname }) => {
        if (voiceRoomMatchingUsers[roomID] === undefined || !voiceRoomMatchingUsers[roomID].some((i) => i === myNickname)) {
            socket.voiceRoomID = roomID;
            socket.voiceNickname = myNickname;
            let setUsersInThisRoom = io.sockets.adapter.rooms.get(roomID);
            let usersInThisRoom = setUsersInThisRoom === undefined ? [] : Array.from(setUsersInThisRoom);
            socket.join(roomID);
            if (voiceRoomMatchingUsers[roomID] === undefined) {
                voiceRoomMatchingUsers[roomID] = [];
            }
            voiceRoomMatchingUsers[roomID].push(myNickname);
            console.log("join room", roomID, myNickname);
            console.log("join voice room", roomID, myNickname);
            console.log("join voiceRoomMatchingUsers : ", voiceRoomMatchingUsers)
            socket.emit("all voice users", usersInThisRoom); // Set으로 받아오기에 값을 array로 바꿔줬음.
        }
        else {
            socket.emit("Duplicate ID");
        }
    });

    socket.on("sending voice signal", ({ signal, callerID, userToSignal, myNickname }) => {
        console.log("sending voice signal", myNickname);
        io.to(userToSignal).emit('voice user joined', { signal, callerID, peerNickname: myNickname });
    });

    socket.on("returning voice signal", ({ callerID, signal, myNickname }) => {
        console.log("returning voice signal", myNickname);
        socket.voicePeerNickname = myNickname;
        io.to(callerID).emit('receiving returned voice signal', { signal: signal, id: socket.id, peerNickname: myNickname });
    });
}