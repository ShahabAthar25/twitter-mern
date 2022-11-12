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
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.pre("save", function (next, req) {
  this.ownerId = req.payload.id;
  next();
});

module.exports = mongoose.model("Post", postSchema);
