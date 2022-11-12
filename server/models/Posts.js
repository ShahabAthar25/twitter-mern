const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  ownerId: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    default: "",
  },
  retweet: {
    type: String,
    default: "",
  },
  retweets: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", function (next) {
  this.ownerId = req.payload.id;
  next();
});

module.exports = mongoose.model("User", userSchema);
