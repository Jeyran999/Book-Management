const { toBookDto } = require("../dto/book.dto");
const bookRepository = require("../repositories/book.repository");
const authorRepository = require("../repositories/author.repository");
const categoryRepository = require("../repositories/category.repository");
const tagRepository = require("../repositories/tag.repository");

const createBook = async (bookData) => {
  const book = await bookRepository.create(bookData);

  const author = await authorRepository.findById(book.author);
  author.books.push(book._id);
  await authorRepository.save(author);

  const category = await categoryRepository.findById(book.category);
  category.books.push(book._id);
  await categoryRepository.save(category);

  if (book.tags && book.tags.length > 0) {
    for (const tagId of book.tags) {
      const tag = await tagRepository.findById(tagId);

      if (tag) {
        tag.books.push(book._id);
        await tagRepository.save(tag);
      }
    }
  }

  return toBookDto(book);
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
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
