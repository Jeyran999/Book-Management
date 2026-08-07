const mongoose = require("mongoose");
const { toBookDto } = require("../dto/book.dto");
const AppError = require("../utils/appError");
const bookRepository = require("../repositories/book.repository");
const authorRepository = require("../repositories/author.repository");
const categoryRepository = require("../repositories/category.repository");
const tagRepository = require("../repositories/tag.repository");
const cache = require("../utils/cache");
const { clearBooksCache } = require("../utils/cacheHelper");

const createBook = async (bookData) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const book = await bookRepository.create(bookData, session);

    const author = await authorRepository.findById(book.author, session);
    if (!author) {
      throw new AppError("Author not found", 404);
    }
    author.books.push(book._id);
    await authorRepository.save(author, session);

    const category = await categoryRepository.findById(book.category, session);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
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
    clearBooksCache();
    return toBookDto(book);
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllBooks = async (page, limit, sortBy, order) => {
  const cacheKey = `books:${page}:${limit}:${sortBy || "createdAt"}:${order || "desc"}`;
  const cachedBooks = cache.get(cacheKey);

  if (cachedBooks) return cachedBooks;

  const books = await bookRepository.findAll(page, limit, sortBy, order);
  const booksDto = books.map(toBookDto);

  cache.set(cacheKey, booksDto);

  return booksDto;
};

const getBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) throw new AppError("Book not found", 404);
  return toBookDto(book);
};

const updateBook = async (id, bookData) => {
  const book = await bookRepository.update(id, bookData);
  if (!book) throw new AppError("Book not found", 404);
  clearBooksCache();
  return toBookDto(book);
};

const deleteBook = async (id) => {
  const book = await bookRepository.deleteById(id);
  if (!book) throw new AppError("Book not found", 404);
  clearBooksCache();
  return book;
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
