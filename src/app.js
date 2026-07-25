require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../src/config/swagger");
const bookRouter = require("./routes/book.routes");
const errorHandler = require("./middlewares/error.middleware");
const authRouter = require("./routes/auth.routes");
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({
    message: "Book Management API is running",
  });
});

app.use("/books", bookRouter);
app.use("/auth", authRouter);
app.use(errorHandler);

module.exports = app;
