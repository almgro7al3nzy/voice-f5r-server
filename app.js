const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");

app.use(cors());
app.use(compression());

const socket_cors = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};

const http_server = require("http").createServer(app).listen(8081);
const io = require("socket.io")(http_server, socket_cors);

io.on("connection", (socket) => {
  socket.emit("getid", socket.id);

  socket.on("caller", (data) => {
    io.to(data.ToCall).emit("caller", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("acceptcall", data.signal);
  });
});
