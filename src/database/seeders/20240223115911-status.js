"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "buying", //Comprando
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pay", //Pagar
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "finalized", //Finalizado
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};