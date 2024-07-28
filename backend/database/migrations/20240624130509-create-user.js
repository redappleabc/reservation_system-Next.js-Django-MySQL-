'use strict';

const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['admin', 'buyer', 'seller'],
        defaultValue: 'buyer'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD_KEY, 10);
    await queryInterface.bulkInsert('Users', [{
      uuid: uuid(),
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      display_name: 'Admin',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};