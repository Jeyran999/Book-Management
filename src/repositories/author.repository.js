const Author = require("../models/author.model");

const findById = async (id, session) => {
  return await Author.findById(id).session(session);
};

const save = async (author, session) => {
  return await author.save({ session });
};

module.exports = { findById, save };
