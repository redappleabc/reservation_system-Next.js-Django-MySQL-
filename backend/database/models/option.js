'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Option extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['Service'], {
        foreignKey: 'service_uuid',
        targetKey: 'uuid'
      })
    }
  }
  Option.init({
    name: DataTypes.STRING,
    point: DataTypes.INTEGER.UNSIGNED,
    content: DataTypes.TEXT,
    service_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Option',
  });
  return Option;
};