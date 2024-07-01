const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.use((socket, next) => {
  console.log("Socket connected", socket.id);
  next();
})

io.on("connection", socket => {
  console.log("A user connected:", socket.id);

  // chatSocket(socket, io);

  // notificationSocket(socket, io);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  })

})

const port = process.env.SOCKET_SERVER_PORT || 8001;

server.listen(port, () => {
  console.log(`Socket server is running on http://localhost:${port}`);
})
