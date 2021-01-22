'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    Promise.all([
      await queryInterface.addColumn("Events", "EventTypeId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "EventTypes"
          },
          key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      await queryInterface.addColumn("Events", "OrganizerId", {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Organizers"
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
      await queryInterface.removeColumn("Events", "TypeId"),
      await queryInterface.removeColumn("Events", "OrganizerId")
    ])
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
