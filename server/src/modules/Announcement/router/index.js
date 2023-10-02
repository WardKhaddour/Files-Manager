const { Router } = require('express');
const authManager = require('../../../auth/dependencies');
const { announcementController } = require('../dependencies');
const {
  validateGetAllAnnouncements,
  validateCreateAnnouncement,
  validateAnnouncementId,
} = require('../validators/validation');
const validateRequest = require('../../../middlewares/validateRequest');
const uploadAnnouncement = require('../../../middlewares/announcements/uploadAnnouncement');

const router = Router();

router.use(authManager.restrictAuthenticated);

router
  .route('/')
  .get(
    validateGetAllAnnouncements,
    validateRequest,
    announcementController.getAllAnnouncements.bind(announcementController)
  )
  .post(
    authManager.restrictTo('teacher', 'admin'),
    uploadAnnouncement,
    validateCreateAnnouncement,
    validateRequest,
    announcementController.createAnnouncement.bind(announcementController)
  );

router.delete(
  '/:announcementId',
  authManager.restrictTo('teacher', 'admin'),
  validateAnnouncementId,
  validateRequest,
  announcementController.deleteAnnouncement.bind(announcementController)
);

module.exports = router;
