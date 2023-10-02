const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const multer = require('multer');
const AppError = require('../../utils/AppError');
const { getFileExtension } = require('../../utils/file');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/announcements');
  },
  filename: (req, file, cb) => {
    const name = `announcement-${req.userId}-${Date.now()}.${getFileExtension(
      file.mimetype
    )}`;
    cb(null, name);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.includes('pdf')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'File Type Not Supported, Supported Type is Only PDF',
        BAD_REQUEST
      )
    );
  }
};

const uploadFile = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 30MB max file size
  },
  fileFilter: multerFilter,
});

module.exports = uploadFile.single('announcement');
