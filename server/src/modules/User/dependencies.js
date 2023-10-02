const UserDAO = require('./DAO/UserDAO');
const AuthController = require('./controllers/AuthController');
const AuthService = require('./services/AuthService');
const EmailService = require('./helpers/Email/EmailService');
const EmailHelper = require('./helpers/Email/EmailHelper');
const PasswordService = require('./services/PasswordService');
const PasswordController = require('./controllers/PasswordController');
const UserService = require('./services/UserService');
const UserController = require('./controllers/UserController');

const userDAO = UserDAO.getInstance();
const emailService = new EmailService();

const emailHelper = new EmailHelper(emailService, userDAO);
const authService = new AuthService(userDAO, emailHelper);
const passwordService = new PasswordService(userDAO, emailHelper);
const userService = new UserService(userDAO, emailHelper);
const authController = new AuthController(authService);
const passwordController = new PasswordController(passwordService);
const userController = new UserController(userService);

module.exports = {
  authController,
  passwordController,
  userController,
};
