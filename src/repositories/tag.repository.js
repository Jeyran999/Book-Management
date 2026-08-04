const Tag = require("../models/tag.model");

const create = async (tagData) => {
  return await Tag.create(tagData);
};

const findAll = async () => {
  return await Tag.find();
};

const findById = async (id, session) => {
  return await Tag.findById(id).session(session);
};

const save = async (tag, session) => {
  return await tag.save({ session });
};

module.exports = { create, findAll, findById, save };
