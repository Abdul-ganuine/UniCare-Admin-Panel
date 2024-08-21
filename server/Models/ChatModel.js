const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "studentUsers" }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "studentUsers" },
      text: String,
      senderImg: { type: String },
      senderUsername: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Chat", ChatSchema);
