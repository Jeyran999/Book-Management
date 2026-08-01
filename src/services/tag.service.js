const tagRepository = require("../repositories/tag.repository");

const createTag = async (tagData) => {
  return await tagRepository.create(tagData);
};

const getAllTags = async () => {
  return await tagRepository.findAll();
};

module.exports = { createTag, getAllTags };
