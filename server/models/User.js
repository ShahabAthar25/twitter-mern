const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    max: 255,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
    max: 255,
  },
  password: {
    type: String,
    require: true,
    min: 8,
  },
  recoveryEmail: {
    type: String,
    require: true,
    lowercase: true,
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

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
