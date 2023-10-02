const multer = require('multer');
const { BAD_REQUEST } = require('http-status-codes').StatusCodes;
const { getFileExtension } = require('../../utils/file');
const AppError = require('../../utils/AppError');
const eventBus = require('../../events');

const fileFilter = async (req, file, cb) => {
  const fileSize = parseInt(req.headers['content-length'], 10);
  const canUpload = await eventBus.emitUserEvent(
    'can-upload-file',
    req.userId,
    fileSize
  );
  if (!canUpload) {
    cb(new AppError(`You don't have enough space`, BAD_REQUEST));
  } else {
    cb(null, true);
  }
};

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/cloud');
  },
  filename: (req, file, cb) => {
    const name = `cloud-file-${req.userId}-${Date.now()}.${getFileExtension(
      file.mimetype
    )}`;
    cb(null, name);
  },
});

const uploadFile = multer({
  storage: multerStorage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 200, // 200MB max file size
  },
});

module.exports = uploadFile.single('file');
