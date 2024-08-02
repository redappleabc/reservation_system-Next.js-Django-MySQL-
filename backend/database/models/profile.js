'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
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
  Profile.init({
    avatar: DataTypes.STRING,
    lastname: DataTypes.STRING,
    firstname: DataTypes.STRING,
    occupationType: DataTypes.STRING,
    birthday: {
      type: DataTypes.DATE,
      set(value) {
        const date = new Date(value);

        if (date instanceof Date && !isNaN(date.getTime())) {
          this.setDataValue('birthday', date);
        } else {
          this.setDataValue('birthday', null);
        }
      }
    },
    gender: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    catchphrase: DataTypes.STRING,
    self_introduction: DataTypes.TEXT,
    user_uuid: DataTypes.UUID,
    fullname: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.lastname + " " + this.firstname;
      }
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Profile',
  });
  return Profile;
};