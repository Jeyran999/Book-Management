const express = require("express");
const bookController = require("../controllers/book.controller");
const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/auth.middleware");

const {
  createBookSchema,
  updateBookSchema,
} = require("../validations/book.validation");

const bookRouter = express.Router();

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Validation error
 */
bookRouter.post(
  "/",
  authenticate,
  validate(createBookSchema),
  bookController.createBook,
);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Successfully retrieved books
 *       404:
 *         description: No books found
 */
bookRouter.get("/", authenticate, bookController.getAllBooks);
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 */
bookRouter.get("/:id", authenticate, bookController.getBookById);
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 */
bookRouter.put(
  "/:id",
  authenticate,
  validate(updateBookSchema),
  bookController.updateBook,
);
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Invalid book ID
 *       404:
 *         description: Book not found
 */
bookRouter.delete("/:id", authenticate, bookController.deleteBook);
module.exports = bookRouter;
