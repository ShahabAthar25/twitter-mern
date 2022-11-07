const createError = require("http-errors");

const User = require("../models/User");
const { userSchema } = require("../helpers/ValidationSchema");
const { signAccessToken } = require("../helpers/JWTHelper");

const register = async (req, res, next) => {
  try {
    const result = await userSchema.validateAsync(req.body);

    const emailExist = await User.findOne({ email: result.email });
    if (emailExist)
      throw createError.Conflict(`Email ${result.email} already exists`);

    const usernameExist = await User.findOne({ username: result.username });
    if (usernameExist)
      throw createError.Conflict(`Username ${result.username} already exists`);

    const newUser = new User(result);
    const user = await newUser.save();

    const accessToken = await signAccessToken(user.id);

    res.json({ accessToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const login = async (req, res) => {
  res.json("Hello World");
};

const logout = async (req, res) => {
  res.json("Hello World");
};

const refresh = async (req, res) => {
  res.json("Hello World");
};

const forgotPwd = async (req, res) => {
  res.json("Hello World");
};

module.exports = {
  register,
  login,
  logout,
  refresh,
  forgotPwd,
};
