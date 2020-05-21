const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  created_by: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  deadline: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  mentors: {
    type: Array,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  requirements: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("projects", projectSchema);
