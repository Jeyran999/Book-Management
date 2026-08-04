const mongoose = require("mongoose");
const bookService = require("../services/book.service");
const bookRepository = require("../repositories/book.repository");
const authorRepository = require("../repositories/author.repository");
const categoryRepository = require("../repositories/category.repository");
const tagRepository = require("../repositories/tag.repository");

jest.mock("mongoose");
jest.mock("../repositories/book.repository");
jest.mock("../repositories/author.repository");
jest.mock("../repositories/category.repository");
jest.mock("../repositories/tag.repository");

describe("Book Service", () => {
  const mockSession = {
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    abortTransaction: jest.fn(),
    endSession: jest.fn(),
  };
  beforeEach(() => {
    jest.clearAllMocks();
    mongoose.startSession.mockResolvedValue(mockSession);
  });
  test("should return a book by id", async () => {
    const mockBook = {
      _id: "123",
      title: "Clean Code",
      description: "A programming book",
    };
    bookRepository.findById.mockResolvedValue(mockBook);

    const result = await bookService.getBookById("123");

    expect(result).toBeDefined();
    expect(result.title).toBe("Clean Code");
    expect(bookRepository.findById).toHaveBeenCalledWith("123");
  });
  test("should return null if book is not found", async () => {
    bookRepository.findById.mockResolvedValue(null);

    const result = await bookService.getBookById("invalid-id");

    expect(result).toBeNull();
  });

  test("should rollback transaction if an error occurs", async () => {
    const bookData = {
      title: "Clean Code",
      author: "author-id",
      category: "category-id",
      tags: ["tag-id"],
    };
    const mockBook = {
      _id: "book-id",
      ...bookData,
    };

    const mockAuthor = {
      _id: "author-id",
      books: [],
    };

    const mockCategory = {
      _id: "category-id",
      books: [],
    };

    const mockTag = {
      _id: "tag-id",
      books: [],
    };

    bookRepository.create.mockResolvedValue(mockBook);

    authorRepository.findById.mockResolvedValue(mockAuthor);
    authorRepository.save.mockResolvedValue(mockAuthor);

    categoryRepository.findById.mockResolvedValue(mockCategory);
    categoryRepository.save.mockResolvedValue(mockCategory);

    tagRepository.findById.mockResolvedValue(mockTag);

    tagRepository.save.mockRejectedValue(new Error("Database error"));

    await expect(bookService.createBook(bookData)).rejects.toThrow(
      "Database error",
    );

    expect(mockSession.startTransaction).toHaveBeenCalled();
    expect(mockSession.abortTransaction).toHaveBeenCalled();
    expect(mockSession.commitTransaction).not.toHaveBeenCalled();
    expect(mockSession.endSession).toHaveBeenCalled();
  });
});
