const joi = require("joi");

const userRegisterJoi = joi.object({
  email: joi.string().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phone: joi.number().required(),
  password: joi.string().required(),
});

const userUpdateJoi = joi.object({
  email: joi.string(),
  firstName: joi.string(),
  lastName: joi.string(),
  phone: joi.number(),
});

const userLoginJoi = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  userLoginJoi,
  userRegisterJoi,
  userUpdateJoi,
};
