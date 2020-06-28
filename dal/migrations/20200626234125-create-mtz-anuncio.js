'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mtz_anuncios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      fecha: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.INTEGER
      },
      precio: {
        type: Sequelize.DOUBLE
      },
      preview: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      id_usuario: {
        type: Sequelize.INTEGER
      },
      id_estado: {
        type: Sequelize.INTEGER
      },
      id_categoria: {
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
    return queryInterface.dropTable('mtz_anuncios');
  }
};