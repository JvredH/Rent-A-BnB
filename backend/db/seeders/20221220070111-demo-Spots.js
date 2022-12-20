'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Apple St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 80.0000000,
        lng: -81.0000000,
        name: 'Blue House',
        description: 'Very blue house',
        price: 100
      },
      {
        ownerId: 2,
        address: '222 Banana St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 70.1234567,
        lng: -70.1234567,
        name: 'Red House',
        description: 'A very red house',
        price: 120
      },
      {
        ownerId: 3,
        address: '333 Pear St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 60.1234567,
        lng: -60.1234567,
        name: 'Peachy House',
        description: 'A very peachy house',
        price: 130
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Spots'
    await queryInterface.bulkDelete(options, null, {})
  }
};
