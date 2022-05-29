const Joi = require('joi');

const schema = {
  addAccount: Joi.object({
    accountName: Joi.string()
      .min(1)
      .max(50)
      .required(),

    accountNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
  }),
  deposit: Joi.object({
    amount: Joi.number().required().min(1)
  }),
  transfer: Joi.object({
    amount: Joi.number().required().min(1),
    accountNumber: Joi.string().length(10).pattern(/^[0-9]+$/).required()
  })
}

module.exports = schema;