'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      overview: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.ENUM,
        values: ['school', 'lodging', 'part-time-job'],
        defaultValue: 'school'
      },
      status: {
        type: Sequelize.ENUM,
        values: ['draft', 'in_review', 'open', 'closed'],
        defaultValue: 'draft'
      },
      min_level: {
        type: Sequelize.TINYINT.UNSIGNED,
        defaultValue: 0,
      },
      tags: {
        type: Sequelize.JSON,
        defaultValue: [],
      },
      user_uuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'uuid'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Services');
  }
};