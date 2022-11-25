const User = require("../models/User");

const setOwner = async (object) => {
  const user = await User.findById(object.owner);
  object.owner = {};
  object.owner.name = user.name;
  object.owner.username = user.username;
  object.owner.coverPic = user.coverPic;
};

module.exports = setOwner;
