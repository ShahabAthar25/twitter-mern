const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    min: 3,
    max: 60,
  },
  email: {
    type: String,
    require: true,
    min: 3,
    max: 100,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  profilePic: {
    type: String,
    default: "",
  },
  likedPosts: {
    type: Array,
    default: [],
  },
  bookmarks: {
    type: Array,
    default: [],
  },
  recoveryEmail: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
