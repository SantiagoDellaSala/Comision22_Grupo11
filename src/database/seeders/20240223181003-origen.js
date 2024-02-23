'use strict';

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Origins', [
        {
        name: 'Argentina',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'Brasil',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'China',
        createdAt: new Date(),
        updatedAt : new Date(),
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Origins', null, {});
     
  }
};