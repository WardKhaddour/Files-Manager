const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { body, param, query } = require('express-validator');
const AppError = require('../../../utils/AppError');

exports.validateCreateAnnouncement = [
  (req, res, next) => {
    if (!req.file) {
      return next(new AppError('Please Provide a file', BAD_REQUEST));
    }
    return next();
  },
  body('name').isString().withMessage('Please Provide an Announcement Name'),
  body('type')
    .isString()
    .withMessage(
      'Please Provide a Valid Type, valid types are: [announcement, chapterMarks, distributions]'
    ),
  body('university')
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  body('faculty').isMongoId().withMessage('Please Provide a Valid Faculty'),
  body('year').isNumeric().withMessage('Please Provide a Valid Year'),
  body('section').isString().withMessage('Please Provide a Valid Section'),
];

exports.validateGetAllAnnouncements = [
  query('university')
    .isMongoId()
    .withMessage('Please Provide a Valid University'),
  query('faculty').isMongoId().withMessage('Please Provide a Valid Faculty'),
  query('year').isNumeric().withMessage('Please Provide a Valid Year'),
  query('section').isString().withMessage('Please Provide a Valid Section'),
];

exports.validateAnnouncementId = [
  param('announcementId')
    .isMongoId()
    .withMessage('Please Provide a Valid File Id'),
];
