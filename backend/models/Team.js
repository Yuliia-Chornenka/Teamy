const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  name: String,
  members: [
    {
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
    },
  ],
  mentors: [
    {
      user_id: {
        type: String,
        required: true,
      },
      user_name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        default: '',
      },
      mark: {
        type: Number,
        default: 0,
      },
    },
  ],
  history: [
    {
      user_id: {
        type: String,
        required: true,
      },
      date: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      }
    }
  ],
  files: Array,
  images: Array,
});

module.exports = mongoose.model("teams", teamSchema);
