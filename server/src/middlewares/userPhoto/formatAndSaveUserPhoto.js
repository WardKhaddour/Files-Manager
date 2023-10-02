const jimp = require('jimp');

const formatAndSaveUserPhoto = async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.userId}-${Date.now()}.jpeg`;
  const photo = await jimp.read(req.file.buffer);
  photo.resize(500, 500).quality(90);
  await photo.writeAsync(`public/images/users/${req.file.filename}`);
  return next();
};

module.exports = formatAndSaveUserPhoto;
