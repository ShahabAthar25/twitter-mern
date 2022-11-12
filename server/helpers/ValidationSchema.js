const Joi = require("@hapi/joi");

// Auth

const userSchema = Joi.object({
  name: Joi.string().required().max(255),
  username: Joi.string().required().max(255),
  email: Joi.string().required().lowercase().max(255),
  password: Joi.string().min(8).required(),
  recoveryEmail: Joi.string().required().max(255),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

// Posts

const postSchema = Joi.object({
  body: Joi.string(),
  retweet: Joi.string(),
});

module.exports = {
  userSchema,
  loginSchema,
  postSchema,
};
