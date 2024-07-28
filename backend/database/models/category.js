'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
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
  Category.init({
    main: DataTypes.STRING,
    sub: DataTypes.STRING,
    service_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};