const User = require("../models/User");

module.exports = {
  getUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  searchUsers: async (req, res, next) => {
    try {
      const { q } = req.query;

      const users = JSON.parse(
        JSON.stringify(
          await User.find({
            $or: [
              { name: { $regex: new RegExp(q + ".*", "i") } },
              { username: { $regex: new RegExp(q + ".*", "i") } },
              { bio: { $regex: new RegExp(q + ".*", "i") } },
            ],
          }).select("name username coverPic")
        )
      );

      res.json(users);
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  followUser: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
  unFollowUser: async (req, res, next) => {
    try {
      res.json("Hello World");
    } catch (error) {
      next(error);
    }
  },
};
