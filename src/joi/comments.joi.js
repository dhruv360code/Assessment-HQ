const joi = require("joi");

const createCommentJoi = joi.object({
  textBody: joi.string().required(),
  userName: joi.string().required(),
  postId: joi.string().required(),
});

module.exports = {
  createCommentJoi,
};
