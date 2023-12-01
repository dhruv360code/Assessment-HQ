// const mongoose = require('mongoose')
// randomKey = require('random-key')

const mongoose = require("mongoose");

const insertOne = async (model, data) => {
  try {
    console.log(mongoose.models);
    const obj = new mongoose.models[model](data);
    const objData = await obj.save();
    return [null, objData];
  } catch (error) {
    return [error, null];
  }
};

const update = async (model, data) => {
  try {
    const updatedData = await mongoose.models[model].findOneAndUpdate(
      data.find,
      data.update,
      { upsert: true, new: true }
    );
    return [null, updatedData];
  } catch (error) {
    return [error, null];
  }
};

const fetchOne = async (model, findPara) => {
  try {
    const data = await mongoose.models[model].findOne(findPara);
    return [null, data];
  } catch (Error) {
    console.log(Error);
    return [Error, null];
  }
};
const fetchAll = async (model, findPara) => {
  try {
    const data = await mongoose.models[model]
      .find(findPara)
      .sort({ createdAt: -1 });
    return [null, data];
  } catch (Error) {
    console.log(Error);
    return [Error, null];
  }
};

module.exports = {
  update,
  fetchOne,
  fetchAll,
  insertOne,
};
