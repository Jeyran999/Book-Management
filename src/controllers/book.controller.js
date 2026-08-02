const mongoose = require("mongoose");
const bookService = require("../services/book.service");

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    return res.status(201).json({ message: "Book created successfully", book });
  } catch (error) {
    next(error);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const sortBy = req.query.sortBy || "createdArt";
    const order = req.query.order || "desc";

    const books = await bookService.getAllBooks(page, limit, sortBy, order);

    return res.status(200).json({ books });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ book });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }
    const book = await bookService.updateBook(req.params.id, req.body);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid book ID",
      });
    }
    const book = await bookService.deleteBook(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const { title, author, category, tag, minYear, maxYear, sortBy, order } =
      req.query;

    const books = await bookService.searchBooks(
      title,
      author,
      category,
      tag,
      minYear,
      maxYear,
      sortBy,
      order,
    );

    return res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
