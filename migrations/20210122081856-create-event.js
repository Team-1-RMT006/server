'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      event_preview: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity_regular: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      capacity_vip: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      capacity_vvip: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price_regular: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price_vip: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      price_vvip: {
        type: Sequelize.INTEGER,
        allowNull: true
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};