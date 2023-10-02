const mongoose = require('mongoose');
const validateRef = require('../../../validators/DBModelsRef/validateRef');

const AnnouncementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['announcement', 'chapterMarks', 'distributions'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      validate: validateRef('User'),
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'University',
      validate: validateRef('University'),
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Faculty',
      validate: validateRef('Faculty'),
    },
    year: {
      type: [Number],
      required: true,
    },
    section: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

AnnouncementSchema.virtual('announcementLink').get(function () {
  const currentUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_URL
      : process.env.DEV_URL;

  const fileUrl = `${currentUrl}/${this.path?.split('public/')[1]}`;
  return fileUrl;
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

module.exports = Announcement;
