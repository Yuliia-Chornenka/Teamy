const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const io = require("socket.io")(http);

const authRoute = require("./backend/routes/api/auth");
const createProjectRoute = require("./backend/routes/api/create-project");

dotenv.config();

app.use(express.json());
app.use(express.static(__dirname + "/dist/Teamy"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/Teamy/index.html"));
});

app.use("/api/user", authRoute);
app.use("/api", createProjectRoute);

// Chat sockets
io.sockets.on("connection", (socket) => {
  socket.on("room", (data) => {
    socket.join(data.room);
    console.log(`${data.user} joined room ${data.room}`);
  });

  socket.on("message", (data) => {
    console.log(`Message '${data.text}' in room ${data.room}`);
    io.sockets.in(data.room).emit("message", {
      text: data.text,
      user: data.user,
    });
  });
});

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

    var server = http.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);
