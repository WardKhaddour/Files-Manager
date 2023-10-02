const eventBus = require('../events');
const AuthService = require('./AuthService');
const AuthManager = require('./AuthManager');

const authService = new AuthService(eventBus);
const authManager = new AuthManager(authService);

module.exports = authManager;
