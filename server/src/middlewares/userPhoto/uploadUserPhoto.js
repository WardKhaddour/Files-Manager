const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const multer = require('multer');
const AppError = require('../../utils/AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please Upload a Valid Image', BAD_REQUEST));
  }
};

const uploadFile = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB max file size
  },
  fileFilter: multerFilter,
});

module.exports = uploadFile.single('photo');
