const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true, select: false },
  first_name: String,
  last_name: String,
  number: String,
  picture: String,
  role: String,
  seenNotifications: {
    type: Array,
    default: [],
  },
  unSeenNotifications: {
    type: Array,
    default: [],
  },
  specialization: {
    type: String,
    required: true,
  },
  timings: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
