'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialLink extends Model {
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
  SocialLink.init({
    skype: DataTypes.STRING,
    portfolio_url: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    googleplus: DataTypes.STRING,
    youtube: DataTypes.STRING,
    pinterest: DataTypes.STRING,
    vimeo: DataTypes.STRING,
    user_uuid: DataTypes.UUID
  }, {
    sequelize,
    timestamps: true,
    modelName: 'SocialLink',
  });
  return SocialLink;
};