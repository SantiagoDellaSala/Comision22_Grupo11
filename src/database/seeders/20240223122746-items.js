"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          cantidad: 3,
          productItemId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cantidad: 2,
          productItemId: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cantidad: 4,
          productItemId: 11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};