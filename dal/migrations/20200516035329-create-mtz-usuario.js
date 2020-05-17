'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mtz_usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      usuario: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      google: {
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mtz_usuarios');
  }
};