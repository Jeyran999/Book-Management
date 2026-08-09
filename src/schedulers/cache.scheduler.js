const cron = require("node-cron");
const { clearBooksCache } = require("../utils/cacheHelper");

const startCacheCleanupJob = () => {
  cron.schedule("0 0 * * *", () => {
    clearBooksCache();
    console.log("Daily books cache cleanup completed");
  });
};

module.exports = { startCacheCleanupJob };