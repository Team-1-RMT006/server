'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all([
      await queryInterface.addColumn("Tickets", "CustomerId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Customers"
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      await queryInterface.addColumn("Tickets", "EventId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Events"
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    Promise.all([
      await queryInterface.removeColumn("Tickets", "CustomerId"),
      await queryInterface.removeColumn("Tickets", "EventId")
    ])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
