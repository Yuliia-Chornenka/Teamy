const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  photo: {
    type: String,
  },
  projects: {
    mentor: Array,
    member: Array,
  },
  dates: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('users', userSchema);
