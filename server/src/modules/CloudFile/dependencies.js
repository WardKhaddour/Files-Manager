const CloudFileDAO = require('./DAO/CloudFileDAO');
const CloudFileServices = require('./services/CloudFileService');
const CloudFileController = require('./controllers/CloudFileController');
const eventBus = require('../../events');

const cloudFileDAO = CloudFileDAO.getInstance();
const cloudFileService = new CloudFileServices(cloudFileDAO, eventBus);
const cloudFileController = new CloudFileController(cloudFileService);

module.exports = { cloudFileController };
