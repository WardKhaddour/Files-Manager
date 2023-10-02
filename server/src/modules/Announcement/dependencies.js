const AnnouncementDAO = require('./DAO/AnnouncementDAO');
const AnnouncementController = require('./controllers/AnnouncementController');
const AnnouncementService = require('./services/AnnouncementService');

const announcementDAO = AnnouncementDAO.getInstance();
const announcementService = new AnnouncementService(announcementDAO);

const announcementController = new AnnouncementController(announcementService);

module.exports = { announcementController };
