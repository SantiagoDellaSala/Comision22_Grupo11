"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Materials",
      [
        {
          name: "cuero",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "metal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "plastico",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Materials", null, {});
  },
};