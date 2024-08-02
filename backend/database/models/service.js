'use strict';

const { v4: uuid } = require('uuid');
const JsonField = require("sequelize-json");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models['User'], {
        as: 'seller',
        foreignKey: 'user_uuid',
        targetKey: 'uuid'
      })

      this.hasOne(models['ServiceLocation'], {
        foreignKey: 'service_uuid',
        sourceKey: 'uuid',
      })

      this.hasOne(models['Category'], {
        foreignKey: 'service_uuid',
        sourceKey: 'uuid'
      })

      this.hasMany(models['ServiceImage'], {
        as: 'RelatedImages',
        foreignKey: 'service_uuid',
        sourceKey: 'uuid',
      })

      this.hasMany(models['FileRelatedService'], {
        as: 'RelatedFiles',
        foreignKey: 'service_uuid',
        sourceKey: 'uuid',
      })

      this.hasOne(models['ServiceDetail'], {
        foreignKey: 'service_uuid',
        sourceKey: 'uuid',
        as: 'DetailInfo'
      })

      this.hasMany(models['Option'], {
        foreignKey: 'service_uuid',
        sourceKey: 'uuid'
      })

      this.belongsToMany(models['User'], {
        through: models['ServiceViewer'],
        as: 'Viewers',
        foreignKey: 'service_uuid',
        otherKey: 'user_uuid',
        sourceKey: 'uuid',
        targetKey: 'uuid',
      })

      this.belongsToMany(models['User'], {
        through: models['ServiceBookmarkedUser'],
        as: 'BookmarkedUsers',
        foreignKey: 'service_uuid',
        otherKey: 'user_uuid',
        sourceKey: 'uuid',
        targetKey: 'uuid'
      })
    }
  }
  Service.init({
    uuid: DataTypes.UUID,
    title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    min_level: DataTypes.TINYINT.UNSIGNED,
    max_candidates: DataTypes.INTEGER.UNSIGNED,
    tags: JsonField(sequelize, 'Service', 'tags'),
    viewerCount: DataTypes.INTEGER.UNSIGNED,
    reservationCount: DataTypes.INTEGER.UNSIGNED,
    user_uuid: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Service',
  });

  Service.beforeCreate(service => {
    service.uuid = uuid();
  })
  return Service;
};