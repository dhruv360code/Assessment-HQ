const User = require("../models/userSchema");

const registerUserRepo = async (data) => {
  try {
    const user = new User(data);
    const userData = await user.save();
    return [null, userData];
  } catch (error) {
    return [error, null];
  }
};

module.exports = {
  registerUserRepo,
};
