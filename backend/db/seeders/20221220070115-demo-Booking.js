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
   options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 3,
      userId: 2,
      startDate: '2021-12-19',
      endDate: '2021-12-20'
    },
    {
      spotId: 2,
      userId: 1,
      startDate: '2021-12-21',
      endDate: '2021-12-22'
    },
    {
      spotId: 1,
      userId: 3,
      startDate: '2021-12-23',
      endDate: '2021-12-24'
    },
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, null, {})
  }
};
