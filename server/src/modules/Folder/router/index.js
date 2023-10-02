const { Router } = require('express');
const { folderController } = require('../dependencies');
const authManager = require('../../../auth/dependencies');
const {
  validateCreateFolder,
  validateFolderId,
  validateUpdateFolder,
} = require('../validators/validation');
const validateRequest = require('../../../middlewares/validateRequest');

const router = Router();

router.use(authManager.restrictAuthenticated);

router
  .route('/')
  .post(
    authManager.restrictTo('teacher'),
    validateCreateFolder,
    validateRequest,
    folderController.createFolder.bind(folderController)
  );

router
  .route('/:folderId')
  .all(validateFolderId, validateRequest)
  .get(folderController.getFolderById.bind(folderController))
  .patch(
    validateUpdateFolder,
    validateRequest,
    authManager.restrictTo('teacher'),
    folderController.updateFolder.bind(folderController)
  )
  .delete(
    authManager.restrictTo('teacher'),
    folderController.deleteFolder.bind(folderController)
  );

module.exports = router;
