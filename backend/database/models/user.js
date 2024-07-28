'use strict';

const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models['Profile'], {
        foreignKey: 'user_uuid',
        sourceKey: 'uuid'
      })

      this.hasOne(models['SocialLink'], {
        foreignKey: 'user_uuid',
        sourceKey: 'uuid'
      })

      this.hasMany(models['Service'], {
        foreignKey: 'user_uuid',
        sourceKey: 'uuid'
      })

      this.hasMany(models['OptionTemplate'], {
        foreignKey: 'user_uuid',
        sourceKey: 'uuid'
      })

      this.belongsToMany(models['Service'], {
        through: models['ServiceViewer'],
        as: 'ViewedServices',
        foreignKey: 'user_uuid',
        otherKey: 'service_uuid',
        sourceKey: 'uuid',
        targetKey: 'uuid',
      })

      this.belongsToMany(models['Service'], {
        through: models['ServiceBookmarkedUser'],
        as: 'BookmarkedServices',
        foreignKey: 'user_uuid',
        otherKey: 'service_uuid',
        sourceKey: 'uuid',
        targetKey: 'uuid'
      })
    }
  }
  User.init({
    uuid: DataTypes.UUID,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    display_name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
    user.uuid = uuid();
  })

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }
  })

  return User;
};