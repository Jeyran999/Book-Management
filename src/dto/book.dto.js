const toBookDto = (book) => ({
  id: book._id.toString(),
  title: book.title,
  description: book.description,
  publishedYear: book.publishedYear,

  category: book.category
    ? {
        id: book.category._id.toString(),
        name: book.category.name,
      }
    : null,

  author: book.author
    ? {
        id: book.author._id.toString(),
        name: book.author.name,
        bio: book.author.bio,
      }
    : null,

  stock: book.stock,
  isbn: book.isbn,

  tags: book.tags
    ? book.tags.map((tag) => ({
        id: tag._id.toString(),
        name: tag.name,
      }))
    : [],
});

module.exports = { toBookDto };