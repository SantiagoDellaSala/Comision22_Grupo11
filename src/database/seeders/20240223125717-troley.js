"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          total: 140000,
          stateId: 1,
          itemId: 1,
        },
        {
          total: 85000,
          stateId: 3,
          itemId: 2,
        },
        {
          total: 41300,
          stateId: 2,
          itemId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};