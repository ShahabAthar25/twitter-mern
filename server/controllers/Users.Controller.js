const createError = require("http-errors");
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

      if (req.body.email) {
        const emailExists = await User.findOne({ email: result.email });
        if (emailExists)
          throw createError.Conflict(`Email ${result.email} already exists.`);
      }

      if (req.body.username) {
        const usernameExists = await User.findOne({
          username: result.username,
        });
        if (usernameExists)
          throw createError.Conflict(
            `Username ${result.username} already exists.`
          );
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

      for (const user of user.followings) {
        const followedUser = user.findById(user);
        await followedUser.updateOne({
          $pull: { followings: req.payload.id },
        });
      }

      await Post.find({ owner: req.payload.id }).deleteMany();
      await User.findById(req.payload.id).deleteOne();

      res.json("User deleted");
    } catch (error) {
      next(error);
    }
  },
  followUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      if (id == req.payload.id) throw createError.BadRequest();

      const user = await User.findById(id);
      if (!user) throw createError.NotFound();

      if (!user.followers.includes(req.payload.id)) {
        await user.updateOne({
          $push: { followers: req.payload.id },
        });

        await User.findOneAndUpdate(req.payload.id, {
          $push: { followings: req.payload.id },
        });

        res.json("The user has been followed");
      } else {
        await user.updateOne({
          $pull: { followers: req.payload.id },
        });

        await User.findOneAndUpdate(req.payload.id, {
          $pull: { followings: req.payload.id },
        });

        res.json("The user has been unfollowed");
      }
    } catch (error) {
      next(error);
    }
  },
};
