const Category = require("../models/category.model");

const findById = async (id) => {
  return await Category.findById(id);
};

const save = async (category) => {
  return await category.save();
};

module.exports = { findById, save };
