const createError = require("http-errors");

const User = require("../models/User");
const { userSchema, loginSchema } = require("../helpers/ValidationSchema");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/JWTHelper");
const client = require("../helpers/Redis");

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
    const refreshToken = await signRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });
    if (!user) throw createError.NotFound("Invalid Email/Password.");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw createError.Unauthorized("Invalid Email/Password.");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    if (error.isJoi)
      return next(createError.BadRequest("Invalid Email/Password."));
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);

    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    client
      .HDEL("refreshTokens", userId)
      .then((val) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log(err.message);
        throw createError.InternalServerError();
      });
  } catch (error) {
    next(error);
  }
};

const forgotPwd = async (req, res) => {
  res.json("Hello World");
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  forgotPwd,
};
