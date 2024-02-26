'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    
     
      
      await queryInterface.bulkInsert('Images', [ {
        name: null,
        createdAt: new Date(),
        updatedAt : new Date(),
      },], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Images', null, {});
    
  }
};
