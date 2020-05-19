const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./backend/routes/api/auth');

dotenv.config();

app.use(express.json());
app.use(express.static(__dirname + '/dist/Teamy'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/Teamy/index.html'));
});

app.use('/api/user', authRoute);


mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function (err) {
  if (err) {
    console.log(process.env.MONGODB_URI);
    console.log(err);
    process.exit(1);
  }
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
