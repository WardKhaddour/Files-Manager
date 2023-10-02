const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const { StatusCodes } = require('http-status-codes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const {
  authRouter,
  passwordRouter,
  userRouter,
} = require('./modules/User/router');
const universityRouter = require('./modules/University/router');
const facultyRouter = require('./modules/Faculty/router');
const announcementRouter = require('./modules/Announcement/router');
const courseRouter = require('./modules/Course/router');
const fileRouter = require('./modules/File/router');
const folderRouter = require('./modules/Folder/router');
const projectRouter = require('./modules/Project/router');
const cloudRouter = require('./modules/CloudFile/router');
const authManager = require('./auth/dependencies');

const app = express();

// Set View Engine to PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

// Allow cors
app.use(
  cors({
    origin: ['http://localhost:3000', process.env.FRONT_END_LINK],
    credentials: true,
  })
);

// Cookie Parser
app.use(cookieParser());

// Set Security HTTP Headers
app.use(helmet());

// Body parser
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Compress text responses
app.use(compression());

// Limit the requests for the same IP
app.use(limiter);

app.use('/api/auth', authRouter);
app.use('/api/password', passwordRouter);
app.use('/api/user', userRouter);
app.use('/api/university', universityRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/course', courseRouter);
app.use('/api/file', fileRouter);
app.use('/api/folder', folderRouter);
app.use('/api/project', projectRouter);
app.use('/api/my-cloud', cloudRouter);

// Serve Static Files

app.use(
  // authManager.restrictAuthenticated,
  (req, res, next) => {
    res.setHeader('Content-Disposition', 'attachment');
    next();
  },
  express.static('public')
);

app.all('*', (req, _, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server`,
      StatusCodes.NOT_FOUND
    )
  );
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
