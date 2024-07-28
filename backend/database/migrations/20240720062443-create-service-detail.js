'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ServiceDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM,
        values: ['long-term', 'spot'],
        defaultValue: 'long-term'
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      service_hours: {
        type: Sequelize.STRING
      },
      paymethod: {
        type: Sequelize.ENUM,
        values: ['fixed', 'minutely', 'daily'],
        defaultValue: 'fixed'
      },
      point: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      maxmember: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      service_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Services',
          key: 'uuid'
        }
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ServiceDetails');
  }
};