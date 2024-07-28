'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FileRelatedService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['User'], {
        foreignKey: 'service_uuid',
        targetKey: 'uuid',
        as: 'RelatedService'
      })
    }
  }
  FileRelatedService.init({
    path: DataTypes.STRING,
    name: DataTypes.STRING,
    service_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'FileRelatedService',
  });
  return FileRelatedService;
};