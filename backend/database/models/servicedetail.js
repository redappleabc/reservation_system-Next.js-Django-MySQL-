'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServiceDetail extends Model {
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
  ServiceDetail.init({
    type: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      set(value) {
        this.setDataValue('startDate', new Date(value));
      }
    },
    endDate: {
      type: DataTypes.DATE,
      set(value) {
        this.setDataValue('endDate', new Date(value));
      }
    },
    service_hours: DataTypes.STRING,
    paymethod: DataTypes.STRING,
    point: DataTypes.INTEGER.UNSIGNED,
    maxmember: DataTypes.INTEGER.UNSIGNED,
    service_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'ServiceDetail',
  });
  return ServiceDetail;
};