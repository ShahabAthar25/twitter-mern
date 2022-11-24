const bcrypt = require("bcrypt");

const { userUpdateSchema } = require("../helpers/ValidationSchema");
const Post = require("../models/Post");
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
  whoami: async (req, res, next) => {
    try {
      const user = await User.findById(req.payload.id);

      res.json({
        id: user._id,
        name: user.name,
        username: user.username,
        profilePic: user.profilePic,
        coverPic: user.coverPic,
        bio: user.bio,
        createdAt: user.createdAt,
        password: user.password,
      });
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
      const { id } = req.params;

      const result = await userUpdateSchema.validateAsync(req.body);
      if (!result) throw createError.BadRequest();

      if (req.payload.id != id) throw createError.Forbidden();

      if (result.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(result.password, salt);

        result.password = hashedPassword;
      }

      await User.findByIdAndUpdate(id, {
        $set: result,
      });

      res.json("User Updated");
    } catch (error) {
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) throw createError.NotFound();

      if (req.payload.id != user._id) throw createError.Forbidden();

      await Post.find({ owner: req.payload.id }).deleteMany();
      await User.findById(req.payload.id).deleteOne();

      res.json("User deleted");
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
