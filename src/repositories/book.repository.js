const Book = require("../models/book.model");
const Author = require("../models/author.model");
const Category = require("../models/category.model");

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

const searchBooks = async (title, author, category, minYear, maxYear) => {
  const query = {};

  if (title) {
    query.title = {
      $regex: title,
      $options: "i",
    };
  }

  if (category) {
    const categoryDoc = await Category.findOne({
      name: {
        $regex: category,
        $options: "i",
      },
    });

    if (!categoryDoc) return [];
    query.category = categoryDoc._id;
  }

  if (author) {
    const authorDoc = await Author.findOne({
      name: {
        $regex: author,
        $options: "i",
      },
    });

    if (!authorDoc) return [];
    query.author = authorDoc._id;
  }

  if (minYear || maxYear) {
    query.publishedYear = {};

    if (minYear) {
      query.publishedYear.$gte = Number(minYear);
    }

    if (maxYear) {
      query.publishedYear.$lte = Number(maxYear);
    }
  }

  return await Book.find(query)
    .populate("author")
    .populate("category")
    .populate("tags");
};

module.exports = { create, findAll, findById, update, deleteById, searchBooks };
