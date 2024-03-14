const Joi = require("joi");

const favImage = Joi.object({
  userId: Joi.string().required(),
  title: Joi.string().required(),
  byteSize: Joi.number().required(),
  url: Joi.string().uri().required()
});

module.exports = { favImage };