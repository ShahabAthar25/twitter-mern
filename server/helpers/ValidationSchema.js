const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  name: Joi.string().required().max(255),
  username: Joi.string().required().max(255),
  email: Joi.string().required().lowercase().max(255),
  password: Joi.string().min(8).required(),
  recoveryEmail: Joi.string().required().max(255),
});

module.exports = {
  userSchema,
};
