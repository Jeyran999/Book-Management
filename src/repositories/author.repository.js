const Author = require("../models/author.model");

const findById = async (id) => {
  return await Author.findById(id);
};

const save = async (author) => {
  return await author.save();
};

module.exports = { findById, save };
