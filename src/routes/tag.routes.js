const express = require("express");
const tagController = require("../controllers/tag.controller");

const tagRouter = express.Router();

tagRouter.get("/", tagController.getAllTags);
tagRouter.post("/", tagController.createTag);

module.exports = tagRouter;
