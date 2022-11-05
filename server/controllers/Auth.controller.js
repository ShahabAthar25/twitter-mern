const createError = require("http-errors");

const User = require("../models/User");

const register = async (req, res, next) => {
  try {
    const { name, username, email, password, recoveryEmail } = req.body;
    if (!name || !username || !email || !password || !recoveryEmail)
      throw createError.BadRequest();

    const emailExist = await User.findOne({ email: email });
    if (emailExist) throw createError.Conflict(`Email ${email} already exists`);

    const usernameExist = await User.findOne({ username: username });
    if (usernameExist)
      throw createError.Conflict(`Username ${username} already exists`);

    const user = new User({
      name,
      username,
      email,
      password,
      recoveryEmail,
    });

    await user.save();

    res.json("User succesfully created");
  } catch (error) {
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
