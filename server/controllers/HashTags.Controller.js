const HashTag = require("../models/HashTag");

module.exports = {
  getHashtags: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  getHashtag: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
};
