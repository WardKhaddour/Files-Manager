const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const University = require('../src/modules/University/models/University');
const Faculty = require('../src/modules/Faculty/models/Faculty');
const User = require('../src/modules/User/models/User');
const Course = require('../src/modules/Course/models/Course');
const Folder = require('../src/modules/Folder/models/Folder');
const File = require('../src/modules/File/models/File');
const Project = require('../src/modules/Project/models/Project');

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`),
});
console.log(process.env.DB_HOST);

const DB = process.env.DB_HOST;

mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const universities = JSON.parse(
  fs.readFileSync(`${__dirname}/universities.json`, 'utf-8')
);
const faculties = JSON.parse(
  fs.readFileSync(`${__dirname}/faculties.json`, 'utf-8')
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, 'utf-8')
);
// IMPORT DATA INTO DB

const importData = async () => {
  try {
    await Promise.all([
      User.create(users),
      University.create(universities),
      Faculty.create(faculties),
      Course.create(courses),
    ]);
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Promise.all([
      User.deleteMany(),
      University.deleteMany(),
      Faculty.deleteMany(),
      Course.deleteMany(),
      Folder.deleteMany(),
      File.deleteMany(),
      Project.deleteMany(),
    ]);
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
