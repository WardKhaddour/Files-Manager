const mongoose = require('mongoose');
const validateRef = require('../../../validators/DBModelsRef/validateRef');

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    university: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: true,
      validate: validateRef('University'),
    },
    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
      validate: validateRef('Faculty'),
    },
    teachers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      required: true,
      validate: validateRef('User'),
    },
    year: {
      type: [Number],
      required: true,
    },
    section: {
      type: [String],
      required: true,
    },
    isProject: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CourseSchema.virtual('folders', {
  ref: 'Folder',
  foreignField: 'course',
  localField: '_id',
});

CourseSchema.virtual('files', {
  ref: 'File',
  foreignField: 'course',
  localField: '_id',
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
