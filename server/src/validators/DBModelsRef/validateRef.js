const mongoose = require('mongoose');

const validateRef = modelName => {
  return {
    async validator(value) {
      if (value instanceof Array) {
        const entities = await mongoose
          .model(modelName)
          .find({ _id: { $in: value } });
        return entities.length === value.length;
      }

      const entity = await mongoose.model(modelName).findById(value);
      return entity !== null;
    },
    message: `Please provide a valid ${modelName.toLowerCase()} ID`,
  };
};

module.exports = validateRef;
