const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { ObjectId } = require('mongoose').Types;
const { body, param, query } = require('express-validator');
const AppError = require('../../../utils/AppError');

exports.validateGetAllProjects = [
  query('course')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please provide a valid course'),
  query('folder')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please provide a valid folder'),
];

exports.validateUploadProject = [
  (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please Provide a project', BAD_REQUEST));
    }
    return next();
  },
  body('name').isString().withMessage('Please Provide a Project Name'),
  body('course')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Course'),
  body('folder')
    .optional({
      values: 'falsy',
    })
    .isMongoId()
    .withMessage('Please Provide a Valid Folder'),
  body('author')
    .isArray()
    .custom(values => values.every(val => ObjectId.isValid(val)))
    .withMessage('Please provide a valid users'),
];

exports.validateUpdateProject = [
  body('name')
    .optional({ values: 'falsy' })
    .isString()
    .withMessage('Please Provide a Project Name'),
];

exports.validateProjectId = [
  param('projectId')
    .isMongoId()
    .withMessage('Please Provide a Valid Project Id'),
];
