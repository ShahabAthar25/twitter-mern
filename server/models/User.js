const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    min: 3,
    max: 60,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    min: 3,
    max: 60,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  recoveryEmail: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  coverPic: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
    max: 160,
  },
  likedPosts: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
