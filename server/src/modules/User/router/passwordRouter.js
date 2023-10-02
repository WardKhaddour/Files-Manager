const { Router } = require('express');

const {
  validateResetPassword,
  validateForgotPassword,
  validateUpdatePassword,
} = require('../validators/validation');

const validateRequest = require('../../../middlewares/validateRequest');
const { passwordController } = require('../dependencies');

const authManager = require('../../../auth/dependencies');

const router = Router();

router.post(
  '/forgot-password',
  validateForgotPassword,
  validateRequest,
  passwordController.forgotPassword.bind(passwordController)
);

router.patch(
  '/reset-password/:token',
  validateResetPassword,
  validateRequest,
  passwordController.resetPassword.bind(passwordController)
);

router.patch(
  '/update-password',
  validateUpdatePassword,
  validateRequest,
  authManager.restrictAuthenticated,
  passwordController.updatePassword.bind(passwordController)
);

module.exports = router;
