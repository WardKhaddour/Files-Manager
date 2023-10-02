const fs = require('fs');
const mimetype = require('mime-types');

exports.createFile = () => {};

exports.deleteFile = filePath => {
  return new Promise((resolve, reject) => {
    if (!filePath) resolve();
    fs.stat(filePath, err => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve();
        } else {
          reject(err);
        }
      } else {
        fs.unlink(filePath, error => {
          if (error) reject(error);
          resolve();
        });
      }
    });
  });
};

exports.getFileExtension = fileMimetype => mimetype.extension(fileMimetype);
