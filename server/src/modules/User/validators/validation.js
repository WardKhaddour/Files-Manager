const { validateSignup, validateLogin } = require('./auth');
const {
  validateResetPassword,
  validateUpdatePassword,
  validateForgotPassword,
} = require('./password');

module.exports = {
  validateResetPassword,
  validateUpdatePassword,
  validateForgotPassword,
  validateSignup,
  validateLogin,
};
