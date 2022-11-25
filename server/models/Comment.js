const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  owner: {
    type: String,
    default: "",
  },
  postId: {
    type: String,
    default: "",
  },
  body: {
    type: String,
    default: "",
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

commentSchema.pre("save", function (next, req) {
  this.owner = req.payload.id;
  next();
});

module.exports = mongoose.model("Comment", commentSchema);
