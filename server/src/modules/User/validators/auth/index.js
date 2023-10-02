const { body } = require('express-validator');
const isMatchedPasswords = require('../custom/isMatchedPasswords');

exports.validateSignup = [
  body('email').isEmail().withMessage('Please provide a valid E-Mail'),
  body('password')
    .trim()
    .isStrongPassword()
    .withMessage(
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, one symbol and be at least 8 characters long.'
    ),
  body('confirmPassword').custom(
    isMatchedPasswords({ compareWith: 'password' })
  ),
  body('year')
    .isInt({
      min: 1,
      max: 5,
    })
    .withMessage('Year must be between 1 and 5'),
  body('section')
    .optional()
    .custom(val => {
      return ['global', 'software', 'ai', 'networks'].includes(
        val.toLowerCase()
      );
    }),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid E-Mail'),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long'),
];
