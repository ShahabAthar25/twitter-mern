const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const dotenv = require("dotenv");

const User = require("../models/User");
const client = require("../helpers/Redis");

dotenv.config();

module.exports = {
  signAccessToken: (userId) => {
    return new Promise(async (resolve, reject) => {
      const user = await User.findById(userId);
      const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        coverPic: user.coverPic,
      };
      const options = {
        expiresIn: "1h",
        issuer: "https://github.com/ShahabAthar25",
        audience: userId,
      };

      JWT.sign(payload, process.env.SECRET_KEY, options, (err, token) => {
        if (err) {
          console.log(err.message);
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
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;

        return next(createError.Unauthorized(message));
      }

      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise(async (resolve, reject) => {
      const payload = {};
      const options = {
        expiresIn: "1y",
        issuer: "https://github.com/ShahabAthar25",
        audience: userId,
      };

      JWT.sign(payload, process.env.PUBLIC_KEY, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }

        client
          .HSET("refreshTokens", userId, token)
          .then(() => {
            resolve(token);
          })
          .catch((err) => {
            console.log(err.message);
            reject(createError.InternalServerError());
          });
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(refreshToken, process.env.PUBLIC_KEY, (err, payload) => {
        if (err) return reject(createError.Unauthorized());
        const userId = payload.aud;

        client
          .HGET("refreshTokens", userId)
          .then((result) => {
            if (refreshToken === result) return resolve(userId);
            reject(createError.Unauthorized());
          })
          .catch((err) => {
            console.log(err.message);
            reject(createError.InternalServerError());
          });

        resolve(userId);
      });
    });
  },
};
