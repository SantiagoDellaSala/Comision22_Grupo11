"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Qualities",
      [
        {
          name: "offer", //oferta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "outstanding", //destacado
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "without-quality", //sin calidad
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Qualities", null, {});
  },
};