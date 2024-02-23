'use strict';

/* @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'pesca',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'camping',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'optica',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'iluminacion',
        createdAt: new Date(),
        updatedAt : new Date(),
      },
      {
        name: 'accesorios',
        createdAt: new Date(),
        updatedAt : new Date(),
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
