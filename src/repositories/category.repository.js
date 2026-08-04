const Category = require("../models/category.model");

const findById = async (id, session) => {
  return await Category.findById(id).session(session);
};

const save = async (category, session) => {
  return await category.save({ session });
};

module.exports = { findById, save };
