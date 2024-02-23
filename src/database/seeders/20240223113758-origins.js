"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Origins",
      [
        {
          name: "argentina",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "brasil",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "taiwan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Origins", null, {});
  },
};