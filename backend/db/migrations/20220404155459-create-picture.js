'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        // allowNull: false,
        type: Sequelize.INTEGER,
        // references: { model: 'Users' }
      },
      album_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Albums' }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pictures');
  }
};