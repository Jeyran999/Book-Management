const User = require("../models/user.model");

const create = async (userData) => {
  return await User.create(userData);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

module.exports = { create, findByEmail, findByUsername };
