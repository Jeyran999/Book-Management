const Tag = require("../models/tag.model");

const create = async (tagData) => {
  return await Tag.create(tagData);
};

const findAll = async () => {
  return await Tag.find();
};

const findById = async (id) => {
  return await Tag.findById(id);
};

const save = async (tag) => {
  return await tag.save();
};

module.exports = { create, findAll, findById, save };
