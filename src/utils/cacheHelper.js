const cache = require("./cache");

const clearBooksCache = () => {
  const keys = cache.keys();

  keys.forEach((key) => {
    if (key.startsWith("books:")) {
      cache.del(key);
    }
  });
};

module.exports = { clearBooksCache };
