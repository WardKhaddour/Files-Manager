const { Router } = require('express');

const { userController } = require('../dependencies');
const authManager = require('../../../auth/dependencies');
const {
  validateFileId,
  validateUserId,
  validateDeleteMe,
  validateSearch,
} = require('../validators/user');
const validateRequest = require('../../../middlewares/validateRequest');
const uploadUserPhoto = require('../../../middlewares/userPhoto/uploadUserPhoto');
const resizeUserPhoto = require('../../../middlewares/userPhoto/formatAndSaveUserPhoto');

const router = Router();

// Only For Authenticated Users
router.use(authManager.restrictAuthenticated);

router.get(
  '/search',
  validateSearch,
  validateRequest,
  userController.searchForUsers.bind(userController)
);

router.get('/', userController.getAllUsers.bind(userController));

router.get('/auth-stat', userController.getAuthStatus.bind(userController));

router.get('/saved', userController.getSavedFiles.bind(userController));

router.get('/cloud-stats', userController.getCloudStats.bind(userController));

router.get(
  '/:userId',
  validateUserId,
  validateRequest,
  userController.getUser.bind(userController)
);
router.patch(
  '/me',
  uploadUserPhoto,
  resizeUserPhoto,
  userController.updateMe.bind(userController)
);

router.patch(
  '/saved/:fileId',
  validateFileId,
  userController.toggleSaveFile.bind(userController)
);

router.delete(
  '/me',
  validateDeleteMe,
  validateRequest,
  userController.deleteMe.bind(userController)
);

router.delete('/my-photo', userController.deleteMyPhoto.bind(userController));

router.delete(
  '/:userId',
  validateUserId,
  validateRequest,
  authManager.restrictTo('admin'),
  userController.deleteUser.bind(userController)
);

module.exports = router;
