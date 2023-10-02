const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const multer = require('multer');
const AppError = require('../../utils/AppError');
const { getFileExtension } = require('../../utils/file');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files');
  },
  filename: (req, file, cb) => {
    const name = `file-${req.userId}-${Date.now()}.${getFileExtension(
      file.mimetype
    )}`;
    cb(null, name);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('pdf') ||
    file.mimetype.includes('msword') ||
    file.mimetype.includes(
      'vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) ||
    file.mimetype.includes('vnd.ms-powerpoint') ||
    file.mimetype.includes(
      'vnd.openxmlformats-officedocument.presentationml.presentation'
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'File Type Not Supported, Supported Types are PDF, Microsoft Word Documents and Power Point Presentations',
        BAD_REQUEST
      )
    );
  }
};

const uploadFile = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 30, // 30MB max file size
  },
  fileFilter: multerFilter,
});

module.exports = uploadFile.single('file');
