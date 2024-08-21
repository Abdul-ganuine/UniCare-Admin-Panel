const mongoose = require("mongoose");

const comment = new mongoose.Schema(
  {
    name: String,
    commentProf: String,
    text: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "studentUsers",
    },
  },
  { timestamps: true }
);

const LibrarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: String,
    img: String,
    prof: String,
    vid: String,
    pdf: String,
    audio: String,
    author: String,
    likes: Number,
    likedBy: [
      {
        type: String,
      },
    ],
    accessLogs: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "studentUsers" },
        accessedAt: Date,
      },
    ],
    favorites: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "studentUsers" },
        accessedAt: Date,
      },
    ],
    comments: [comment],
    commentsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "studentUsers",
    },
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResourceLibrary", LibrarySchema);
