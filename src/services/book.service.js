const mongoose = require("mongoose");
const { toBookDto } = require("../dto/book.dto");
const bookRepository = require("../repositories/book.repository");
const authorRepository = require("../repositories/author.repository");
const categoryRepository = require("../repositories/category.repository");
const tagRepository = require("../repositories/tag.repository");

const createBook = async (bookData) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const book = await bookRepository.create(bookData, session);

    const author = await authorRepository.findById(book.author, session);
    author.books.push(book._id);
    await authorRepository.save(author, session);

    const category = await categoryRepository.findById(book.category, session);
    category.books.push(book._id);
    await categoryRepository.save(category, session);

    if (book.tags && book.tags.length > 0) {
      for (const tagId of book.tags) {
        const tag = await tagRepository.findById(tagId, session);

        if (tag) {
          tag.books.push(book._id);
          await tagRepository.save(tag, session);
        }
      }
    }
    await session.commitTransaction();
    return toBookDto(book);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllBooks = async (page, limit, sortBy, order) => {
  const books = await bookRepository.findAll(page, limit, sortBy, order);
  return books.map(toBookDto);
};

const getBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) return null;
  return toBookDto(book);
};

const updateBook = async (id, bookData) => {
  const book = await bookRepository.update(id, bookData);
  if (!book) return null;
  return toBookDto(book);
};

const deleteBook = async (id) => {
  return await bookRepository.deleteById(id);
};

const searchBooks = async (
  title,
  author,
  category,
  tag,
  minYear,
  maxYear,
  sortBy,
  order,
) => {
  const books = await bookRepository.searchBooks(
    title,
    author,
    category,
    tag,
    minYear,
    maxYear,
    sortBy,
    order,
  );
  return books.map(toBookDto);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
