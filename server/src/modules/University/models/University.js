const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const University = mongoose.model('University', UniversitySchema);

module.exports = University;
