const express = require("express");
const app = express();
const room = require("./routes/room");

const cors = require("cors");
require("dotenv").config();
const { PORT, DATABASE_URI, CLIENT_URL, NODE_ENV } = process.env;

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const corsConfig = {
    origin: CLIENT_URL, //react frontend url
    methods: ["GET", "POST", "DELETE", "PUT"]
}
const io = new Server(server, {
    cors: corsConfig
});

const mongoose = require("mongoose");
mongoose.connect(DATABASE_URI);

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: (origin, callback) => {
        if (origin !== CLIENT_URL && NODE_ENV === "production") {
            return callback("Access to this host is denied", false);
        } else {
            return callback(null, true);
        }
    }
}));
app.use("/room", room);
const Room = require("./model/roomModel");

io.on("connection", (socket) => {
    socket.on("join", (data, callback) => {
        socket.join(data);
        console.log(`${socket.id} joined room ${data}`);
        socket.to(data).emit("newJoin", socket.id);
        callback(socket.id);
    })

    socket.on("sendMsg", (data) => {
        socket.broadcast.to(data.room).emit("receiveMsg", data.msg);
    })

    socket.on("disconnect", () => {
        async function handleDisc() {
            let room = await Room.findOne({ "users.userID": socket.id });
            if (room) {
                let updatedRm = await Room.findOneAndUpdate({ _id: room._id }, { $pull: { users: { userID: socket.id }, voiceUsers: { userID: socket.id } } }, { new: true });
                if (updatedRm.users.length === 0) {
                    await Room.findOneAndDelete({ _id: room._id });
                }
            }
        }
        handleDisc();
        socket.broadcast.emit("disc", socket.id);
    });

    /* webRTC connections */
    socket.on("joinVoice", (roomID) => {
        async function handleVoiceConnect(roomID) {
            let room = await Room.findOne({ _id: roomID });
            let users = room.voiceUsers.filter((user) => {
                return user.userID !== socket.id;
            })
            socket.emit("allUsers", users);
        }
        handleVoiceConnect(roomID);
    });

    socket.on("sendSgn", (payload) => {
        io.to(payload.userToSignal).emit("voiceJoined", { signal: payload.signal, caller: payload.caller });
    });

    socket.on("returnSgn", (payload) => {
        io.to(payload.caller).emit("receiveSgn", { signal: payload.signal, id: socket.id });
    });

    socket.on("voiceConfig", (payload) => {
        socket.broadcast.emit("voiceConfig", payload);
    })

})

server.listen(PORT, () => console.log(`listening on ${PORT}`));