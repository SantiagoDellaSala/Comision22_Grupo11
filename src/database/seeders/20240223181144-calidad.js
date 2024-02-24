'use strict';

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Qualities', [
        {
        name: 'oferta',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'destacado',
        createdAt: new Date(),
        updatedAt : new Date(),
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Qualities', null, {});
     
  }
};