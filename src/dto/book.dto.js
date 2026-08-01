const toBookDto = (book) => ({
  id: book._id,
  title: book.title,
  description: book.description,
  publishedYear: book.publishedYear,
  category: book.category,
  author: book.author,
  stock: book.stock,
  isbn: book.isbn,
  tags: book.tags,
});

module.exports = { toBookDto };
