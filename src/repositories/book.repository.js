const Book = require("../models/book.model");

const create = async (bookData) => {
  return await Book.create(bookData);
};

const findAll = async (page, limit, sortBy, order) => {
  const skip = (page - 1) * limit;

  const sortOrder = order === "asc" ? 1 : -1;
  return await Book.find()
    .populate("author")
    .populate("category")
    .populate("tags")
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
};

const findById = async (id) => {
  return await Book.findById(id)
    .populate("author")
    .populate("category")
    .populate("tags");
};

const update = async (id, bookData) => {
  return await Book.findByIdAndUpdate(id, bookData, {
    runValidators: true,
    new: true,
  })
    .populate("author")
    .populate("category")
    .populate("tags");
};

const deleteById = async (id) => {
  return await Book.findByIdAndDelete(id);
};
module.exports = { create, findAll, findById, update, deleteById };
