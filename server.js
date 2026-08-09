require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/config/database")
const { startCacheCleanupJob } = require("./src/schedulers/cache.scheduler");

const PORT = process.env.PORT

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}
startCacheCleanupJob();

startServer();