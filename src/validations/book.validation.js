const Joi = require("joi");

const createBookSchema = Joi.object({
  title: Joi.string().trim().min(2).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 2 characters long",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().optional(),
  isbn: Joi.string().trim().required().messages({
    "string.empty": "ISBN cannot be empty",
    "any.required": "ISBN is required",
  }),
  publishedYear: Joi.number().integer().min(0).optional().messages({
    "number.base": "Published year must be a number",
    "number.min": "Published year cannot be negative",
  }),
  stock: Joi.number().integer().min(0).required().messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
    "any.required": "Stock is required",
  }),

  author: Joi.string().required().messages({
    "string.empty": "Author is required",
    "any.required": "Author is required",
  }),

  category: Joi.string().required().messages({
    "string.empty": "Category is required",
    "any.required": "Category is required",
  }),
  tags: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(2).messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 2 characters long",
  }),
  description: Joi.string().trim().optional(),
  isbn: Joi.string().trim().messages({
    "string.empty": "ISBN cannot be empty",
  }),
  publishedYear: Joi.number().integer().min(0).optional().messages({
    "number.base": "Published year must be a number",
    "number.min": "Published year cannot be negative",
  }),
  stock: Joi.number().integer().min(0).messages({
    "number.base": "Stock must be a number",
    "number.min": "Stock cannot be negative",
  }),
  author: Joi.string(),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string().hex().length(24)).optional(),
});
module.exports = { createBookSchema, updateBookSchema };
