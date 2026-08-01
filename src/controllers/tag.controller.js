const tagService = require("../services/tag.service");

const createTag = async (req, res, next) => {
  try {
    const tag = await tagService.createTag(req.body);

    return res.status(201).json({ message: "Tag created successfully", tag });
  } catch (error) {
    next(error);
  }
};

const getAllTags = async (req, res, next) => {
  try {
    const tags = await tagService.getAllTags();

    return res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTag, getAllTags };
