const Joi = require('joi');

const schema = {
  register: Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(50)
      .required(),

    lastName: Joi.string()
      .min(1)
      .max(50)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    password: Joi.string().min(5).required()
  }),
  login: Joi.object({
    email: Joi.string()
      .email()
      .required(),

    password: Joi.string().min(5).required()
  })
}

module.exports = schema;