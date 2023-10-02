const mongoose = require('mongoose');

class BaseDAO {
  constructor(Model) {
    this.Model = Model;
  }

  async findAll(filter) {
    const entities = await this.Model.find(filter);
    return entities.map(entity => this.formatEntity(entity));
  }

  async searchAll(searchBy) {
    if (!searchBy || !searchBy.length) {
      return null;
    }

    const filter = {};

    const searchConditions = searchBy.map(searchField => {
      if (searchField.searchKeys.length > 1) {
        return {
          $or: searchField.searchKeys.map(key => ({
            [key]: {
              $regex: searchField.searchStr,
              $options: searchField.insensitiveCase ? 'i' : 's',
            },
          })),
        };
      }

      return {
        [searchField.searchKeys[0]]: {
          $regex: searchField.searchStr,
          $options: searchField.insensitiveCase ? 'i' : 's',
        },
      };
    });
    filter.$and = searchConditions;

    const entities = await this.Model.find(filter);
    return entities.map(entity => this.formatEntity(entity));
  }

  async findById(id, options) {
    const populate = options && options.populate;
    let fields = '';
    let entity;
    if (populate) {
      fields = populate.join(' ');
      entity = await this.Model.findById(id).populate(fields);
    } else entity = await this.Model.findById(id);
    const formattedEntity = this.formatEntity(entity);
    if (formattedEntity)
      options?.populate?.forEach(field => {
        formattedEntity[field] =
          formattedEntity[field]?.map(ent => this.formatEntity(ent)) ||
          formattedEntity[field];
      });
    return formattedEntity;
  }

  async createEntity(entityData) {
    const entity = await this.Model.create(entityData);
    return this.formatEntity(entity);
  }

  async updateEntity(entityId, updateData) {
    const entity = await this.Model.findById(entityId);
    Object.entries(updateData).forEach(([key, value]) => {
      if (value) entity[key] = value;
    });
    const updatedEntity = await this.saveEntity(entity);
    return updatedEntity;
  }

  async deleteEntity(entityId) {
    const deletedEntity = await this.Model.findByIdAndRemove(entityId);
    return deletedEntity && this.formatEntity(deletedEntity);
  }

  async saveEntity(entity, withValidate) {
    const savedEntity = await entity.save({
      validateBeforeSave: withValidate,
    });
    return this.formatEntity(savedEntity);
  }

  formatEntity(entity) {
    if (!entity) return null;
    const formattedEntity =
      typeof entity.toObject === 'function' ? entity?.toObject() : entity;

    const convertValue = value => {
      if (value instanceof mongoose.Types.ObjectId) {
        return value.toString();
      }
      if (Array.isArray(value)) {
        return value.map(convertValue);
      }
      return value;
    };

    const convertFields = obj => {
      const convertedObj = {};

      Object.keys(obj).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          convertedObj[key] = convertValue(obj[key]);
        }
      });

      return convertedObj;
    };

    const convertedEntity = convertFields(formattedEntity);
    convertedEntity.id = convertedEntity._id;
    delete convertedEntity._id;
    delete convertedEntity.__v;

    return convertedEntity;
  }
}

module.exports = BaseDAO;
