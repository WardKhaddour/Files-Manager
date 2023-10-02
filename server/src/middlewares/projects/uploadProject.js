const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const multer = require('multer');
const AppError = require('../../utils/AppError');
const { getFileExtension } = require('../../utils/file');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/projects');
  },
  filename: (req, file, cb) => {
    const name = `project-${req.userId}-${Date.now()}.${getFileExtension(
      file.mimetype
    )}`;
    cb(null, name);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.includes('zip') ||
    file.mimetype.includes('x-rar-compressed')
  ) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'File Type Not Supported, Supported Types are ZIP and RAR',
        BAD_REQUEST
      )
    );
  }
};

const uploadFile = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 50, // 30MB max file size
  },
  fileFilter: multerFilter,
});

module.exports = uploadFile.single('project');
