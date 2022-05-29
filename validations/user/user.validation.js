const { register, login } = require("./user.schema");

module.exports = {
  registerValidation: async (req, res, next) => {
    const value = await register.validate(req.body);
    if (value.error) {
      return res.json({
        success: false,
        message: value.error.details[0].message
      })
    }
    next();
  },
  loginValidation: async (req, res, next) => {
    const value = await login.validate(req.body);
    if (value.error) {
      return res.json({
        success: false,
        message: value.error.details[0].message
      })
    }
    next();
  },
}