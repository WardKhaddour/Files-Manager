const UserDAO = require('../DAO/UserDAO');
const UserEventProcessor = require('./UserEventProcessor');

const userDAO = UserDAO.getInstance();
const userEventProcessor = new UserEventProcessor(userDAO);

module.exports = userEventProcessor;
