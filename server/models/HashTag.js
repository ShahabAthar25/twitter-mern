const mongoose = require("mongoose");

const hashTagSchema = mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("HashTags", hashTagSchema);
