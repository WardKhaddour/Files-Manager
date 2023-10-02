const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { body, param } = require('express-validator');
const AppError = require('../../../utils/AppError');

exports.validateUploadFile = [
  (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please Provide a file', BAD_REQUEST));
    }
    return next();
  },
  body('name').isString().withMessage('Please Provide a File Name'),
];

exports.validateUpdateFile = [
  body('name')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a File Name'),
];

exports.validateFileId = [
  param('fileId').isMongoId().withMessage('Please Provide a Valid File Id'),
];
