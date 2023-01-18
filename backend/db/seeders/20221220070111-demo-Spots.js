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
      {
        ownerId: 1,
        address: '1 Pineapple St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 65.1234567,
        lng: -65.1234567,
        name: 'The Pineapple',
        description: 'A nice place to stay with you and the family',
        price: 200
      },
      {
        ownerId: 2,
        address: '2 Blueberry St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 42.1234567,
        lng: -42.1234567,
        name: 'Blueberry House',
        description: 'The best place to stay when visiting the bay',
        price: 350
      },
      {
        ownerId: 3,
        address: '3 Raspberry St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 88.1234567,
        lng: -88.1234567,
        name: 'Raspberry House',
        description: 'Best place to throw a party',
        price: 300
      },
      {
        ownerId: 1,
        address: '1 Blackberry St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 44.1234567,
        lng: -44.1234567,
        name: 'Blackberry House',
        description: 'Super fast wifi available',
        price: 150
      },
      {
        ownerId: 2,
        address: '2 Watermelon St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 55.1234567,
        lng: -55.1234567,
        name: 'Watermelon Road',
        description: 'Best place to stay in San Francisco',
        price: 200
      },
      {
        ownerId: 3,
        address: '3 Tomato St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 57.1234567,
        lng: -57.1234567,
        name: 'Tomato House',
        description: 'This place is very welcoming',
        price: 250
      },
      {
        ownerId: 1,
        address: '1 Pickle St.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 66.1234567,
        lng: -66.1234567,
        name: 'Pickle',
        description: 'Best home in the neighborhood',
        price: 275
      }
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
