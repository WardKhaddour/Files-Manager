const { body } = require('express-validator');
const isMatchedPasswords = require('../custom/isMatchedPasswords');

exports.validateResetPassword = [
  body('password')
    .trim()
    .isStrongPassword()
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol and be at least 8 characters long.'
    ),
  body('confirmPassword').custom(
    isMatchedPasswords({ compareWith: 'password' })
  ),
];

exports.validateUpdatePassword = [
  body('currentPassword').trim().isLength({
    min: 8,
  }),
  body('newPassword')
    .trim()
    .isStrongPassword()
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol and be at least 8 characters long.'
    ),
  body('confirmNewPassword').custom(
    isMatchedPasswords({ compareWith: 'newPassword' })
  ),
];

exports.validateForgotPassword = [
  body('email').isEmail().withMessage('Please provide a valid E-Mail'),
];
