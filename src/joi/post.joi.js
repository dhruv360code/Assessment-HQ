const joi = require("joi");

const createPostJoi = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
});

module.exports = {
  createPostJoi,
};
