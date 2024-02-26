'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Troleys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      stateId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references:{
          model:{
            tableName:'States'
          }
        }
      },
      itemId: {
        type: Sequelize.INTEGER,
        
        allowNull: true, 
        references:{
          model:{
            tableName:'Items'
          }
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
    await queryInterface.dropTable('Troleys');
  }
};