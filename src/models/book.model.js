const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    publishedYear: Number,
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    coverImage: {
      type: String,
    },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
