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
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity_regular: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      capacity_vip: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      capacity_vvip: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      price_regular: {
        type: Sequelize.INTEGER
      },
      price_vip: {
        type: Sequelize.INTEGER
      },
      price_vvip: {
        type: Sequelize.INTEGER
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