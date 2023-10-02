const FileDAO = require('./DAO/FileDAO');
const FileServices = require('./services/FileService');
const FileController = require('./controllers/FileController');
const eventBus = require('../../events');

const fileDAO = FileDAO.getInstance();
const fileService = new FileServices(fileDAO, eventBus);
const fileController = new FileController(fileService);

module.exports = { fileController };
