const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");

const User = require("../models/User");

dotenv.config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise(async (resolve, reject) => {
      const user = await User.findById(userId);
      const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
      };
      const options = {
        expiresIn: "1h",
        issuer: "https://github.com/ShahabAthar25",
        audience: userId,
      };

      JWT.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
        if (err) {
          console.log(err);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return next(createError.Unauthorized());

    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) {
        return next(createError.Unauthorized());
      }

      req.payload = payload;
      next();
    });
  },
};
