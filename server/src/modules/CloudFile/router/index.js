const { Router } = require('express');
const authManager = require('../../../auth/dependencies');
const { cloudFileController } = require('../dependencies');
const uploadCloudFile = require('../../../middlewares/cloudFiles/uploadCloudFile');
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
  .get(cloudFileController.getMyCloud.bind(cloudFileController))
  .post(
    uploadCloudFile,
    validateUploadFile,
    validateRequest,
    cloudFileController.createFile.bind(cloudFileController)
  );

router
  .route('/:fileId')
  .all(validateFileId)
  .get(cloudFileController.getFileById.bind(cloudFileController))
  .patch(
    validateUpdateFile,
    validateRequest,
    cloudFileController.updateFile.bind(cloudFileController)
  )
  .delete(cloudFileController.deleteFile.bind(cloudFileController));

module.exports = router;
