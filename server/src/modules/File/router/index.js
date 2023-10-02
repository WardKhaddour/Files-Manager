const { Router } = require('express');
const authManager = require('../../../auth/dependencies');
const { fileController } = require('../dependencies');
const uploadFile = require('../../../middlewares/files/uploadLectureFile');
const validateRequest = require('../../../middlewares/validateRequest');
const {
  validateUploadFile,
  validateUpdateFile,
  validateFileId,
} = require('../validators/validation');

const router = Router();

router.use(authManager.restrictAuthenticated);

router
  .route('/')
  .post(
    authManager.restrictTo('teacher'),
    uploadFile,
    validateUploadFile,
    validateRequest,
    fileController.createFile.bind(fileController)
  );

router
  .route('/:fileId')
  .all(validateFileId)
  .get(fileController.getFileById.bind(fileController))
  .patch(
    authManager.restrictTo('teacher'),
    validateUpdateFile,
    validateRequest,
    fileController.updateFile.bind(fileController)
  )
  .delete(
    authManager.restrictTo('teacher'),
    fileController.deleteFile.bind(fileController)
  );

module.exports = router;
