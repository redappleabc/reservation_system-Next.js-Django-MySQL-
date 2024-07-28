'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OptionTemplate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['User'], {
        foreignKey: 'user_uuid',
        targetKey: 'uuid'
      })
    }
  }
  OptionTemplate.init({
    name: DataTypes.STRING,
    service_type: DataTypes.STRING,
    point: DataTypes.INTEGER.UNSIGNED,
    content: DataTypes.TEXT,
    user_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'OptionTemplate',
  });
  return OptionTemplate;
};