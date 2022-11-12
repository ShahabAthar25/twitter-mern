const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
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

postSchema.pre("save", function (next) {
  this.ownerId = req.payload.id;
  next();
});

module.exports = mongoose.model("Post", postSchema);