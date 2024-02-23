"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: 'Eric',
          surname: 'Mena',
          email: 'menaeric2024@gmail.com',
          password: 'asd123',      
          avatar: 'default.png',
          troleyId: 1,
          roleId: 2,
        },
        {
          name: 'Santiago',
          surname: 'Della Sala',
          email: 'santiagodellasala2024@gmail.com',
          password: 'asd123',        
          avatar: 'default.png',
          troleyId: 2,
          roleId: 3,
        },
        {
          name: 'Yamila',
          surname: 'Nieto',
          email: 'yamilanieto2024@gmail.com',
          password: 'asd123',
          avatar: 'default.png',
          troleyId: 3,
          roleId: 2,
        },  
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};