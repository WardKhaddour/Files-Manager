const { Router } = require('express');

const { validateSignup, validateLogin } = require('../validators/validation');

const validateRequest = require('../../../middlewares/validateRequest');
const { authController } = require('../dependencies');

const router = Router();

router.post(
  '/signup',
  validateSignup,
  validateRequest,
  authController.signup.bind(authController)
);

router.post(
  '/login',
  validateLogin,
  validateRequest,
  authController.login.bind(authController)
);

router.patch(
  '/confirm-email/:token',
  authController.confirmEmail.bind(authController)
);

router.post(
  '/resend-confirm-token',
  authController.resendConfirmToken.bind(authController)
);

router.post('/logout', authController.logout.bind(authController));

module.exports = router;
