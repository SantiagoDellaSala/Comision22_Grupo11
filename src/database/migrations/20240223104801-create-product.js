'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(45)
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      discount: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      mainImage: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      materialId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      originId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      qualityId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};