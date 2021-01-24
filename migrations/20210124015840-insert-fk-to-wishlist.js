'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all([
      await queryInterface.addColumn("Wishlists", "CustomerId", {
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
      await queryInterface.addColumn("Wishlists", "EventId", {
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
      await queryInterface.removeColumn("Wishlists", "CustomerId"),
      await queryInterface.removeColumn("Wishlists", "EventId")
    ])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
