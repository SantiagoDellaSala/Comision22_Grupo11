'use strict';

const bcryptjs = require('bcryptjs')




/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

    
      await queryInterface.bulkInsert('Users', [

        {
            name: 'Admin',
         surname: 'Suyds',
           email: 'admin@gmail.com',
        password: bcryptjs.hashSync(process.env.PASSWORD_ADMIN,10),
          roleId: 1, 
          avatar: '/images/avatars/1710913544026_img_.png',
        createdAt: new Date(),
       updatedAt: new Date()
        },
        {
          name: 'User',
         surname: 'Suyds',
           email: 'user@gmail.com',
        password: bcryptjs.hashSync(process.env.PASSWORD_ADMIN,10),
          roleId: 2, 
          troleyId: 1,
        createdAt: new Date(),
       updatedAt: new Date()
        } 
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Users', null, {});
  }
};
