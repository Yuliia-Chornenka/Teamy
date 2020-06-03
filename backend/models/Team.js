const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  project_id: {
    type: String,
    required: true,
  },
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
  ]
});

module.exports = mongoose.model("teams", teamSchema);
