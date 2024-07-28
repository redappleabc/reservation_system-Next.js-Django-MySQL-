'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceBookmarkedUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServiceBookmarkedUser.init({
    service_uuid: DataTypes.UUID,
    user_uuid: DataTypes.UUID,
    isView: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ServiceBookmarkedUser',
  });
  return ServiceBookmarkedUser;
};