'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceViewer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceViewer.init({
    service_uuid: DataTypes.UUID,
    user_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ServiceViewer',
  });
  return ServiceViewer;
};