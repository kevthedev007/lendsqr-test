const { addAccount, deposit, transfer } = require("./account.schema");

module.exports = {
  accountValidation: async (req, res, next) => {
    const value = await addAccount.validate(req.body);
    if (value.error) {
      return res.json({
        success: false,
        message: value.error.details[0].message
      })
    }
    next();
  },
  depositValidation: async (req, res, next) => {
    const value = await deposit.validate(req.body);
    if (value.error) {
      return res.json({
        success: false,
        message: value.error.details[0].message
      })
    }
    next();
  },
  transferValidation: async (req, res, next) => {
    const value = await transfer.validate(req.body);
    if (value.error) {
      return res.json({
        success: false,
        message: value.error.details[0].message
      })
    }
    next();
  },
}