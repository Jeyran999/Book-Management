const express = require("express");
const bookController = require("../controllers/book.controller");
const validate = require("../middlewares/validate.middleware");
const authenticate = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload.middleware");

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
  roleMiddleware("ADMIN"),
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

bookRouter.get("/search", bookController.searchBooks);

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
  roleMiddleware("ADMIN"),
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
bookRouter.delete(
  "/:id",
  authenticate,
  roleMiddleware("ADMIN"),
  bookController.deleteBook,
);

/**
 * @swagger
 * /books/{id}/cover/download:
 *   get:
 *     summary: Download a book cover
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book cover file
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Book or cover not found
 */
bookRouter.get(
  "/:id/cover/download",
  authenticate,
  bookController.downloadCover,
);

/**
 * @swagger
 * /books/{id}/cover:
 *   post:
 *     summary: Upload a book cover
 *     tags:
 *       - Books
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cover:
 *                 type: string
 *                 format: binary
 *             required:
 *               - cover
 *     responses:
 *       200:
 *         description: Cover uploaded successfully
 *       400:
 *         description: Invalid file or cover is missing
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Access denied
 *       404:
 *         description: Book not found
 */
bookRouter.post(
  "/:id/cover",
  authenticate,
  roleMiddleware("ADMIN"),
  upload.single("cover"),
  bookController.uploadCover,
);

module.exports = bookRouter;
