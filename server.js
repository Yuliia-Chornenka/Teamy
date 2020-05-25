const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const io = require("socket.io")(http);
const cors = require('cors');

const authRoute = require("./backend/routes/api/auth");
const projectRoute = require("./backend/routes/api/project");

dotenv.config();

app.use(express.json());
app.use(express.static(__dirname + "/dist/Teamy"));
app.use(cors());

app.use("/api/user", authRoute);
app.use("/api/project", projectRoute);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Teamy/index.html"));
});

// Chat sockets --- START
const socketClients = [];
io.sockets.on('connection', (socket) => {
  socket.on('connect room', (data) => {
    socket.join(data.room);
    const client = {
      id: socket.id,
      room: data.room,
      user: data.user,
    };
    socketClients.push(client);
    io.sockets.in(data.room).emit('user connected', socketClients);
  });

  socket.on('message', (data) => {
    io.sockets.in(data.room).emit('message', {
      text: data.text,
      user: data.user,
      date: data.date,
    });
  });

  socket.on('disconnect', () => {
    const socketIndex = socketClients.findIndex((item) => item.id === socket.id);
    if (socketIndex) {
      const socketClient = socketClients[socketIndex];
      socketClients.splice(socketIndex, 1);
      io.sockets.in(socketClient.room).emit('user disconnected', socketClients);
    }
  });
});
// Chat sockets --- END

mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  function (err) {
    if (err) {
      console.log(process.env.MONGODB_URI);
      console.log(err);
      process.exit(1);
    }
    console.log("Database connection ready");

    const server = http.listen(process.env.PORT || 8080, function () {
      const port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);
