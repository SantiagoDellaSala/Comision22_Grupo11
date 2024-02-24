'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('States', [
     {
        name: 'Comprando',
        createdAt: new Date(),
        updatedAt: new Date(),
     },
     {
      name: 'Pagar',
      createdAt: new Date(),
      updatedAt: new Date(),
   },
     {
      name: 'Finalizado',
      createdAt: new Date(),
      updatedAt: new Date(),
   }

    
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('States', null, {});
  }
};
