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
   options.tableName = 'SpotImages';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: 'https://a0.muscache.com/im/pictures/d86ee7e1-bd06-4179-a8a3-4ded7001b97f.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/a42b3ce6-7ead-4067-8f6e-2fa1f19d0451.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 3,
      url: 'https://a0.muscache.com/im/pictures/5435cece-d5f8-44ff-a77f-1843ff6d451c.jpg?im_w=1200',
      preview: true
    },
    {
      spotId: 4,
      url: 'https://a0.muscache.com/im/pictures/d722b3c0-11fd-4d2c-9d76-bf12554164df.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 5,
      url: 'https://a0.muscache.com/im/pictures/5d7c999b-43cc-42a8-9cf4-b70e5303841d.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 6,
      url: 'https://a0.muscache.com/im/pictures/82f77325-46c3-4c2e-bb85-b6dca73e87ad.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 7,
      url: 'https://a0.muscache.com/im/pictures/159acce3-50e1-4a2b-9682-6c3384762691.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 8,
      url: 'https://a0.muscache.com/im/pictures/7ef42ebf-6fdc-472e-8762-5919ce7f71fa.jpg?im_w=720',
      preview: true
    },
    {
      spotId: 9,
      url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51923559/original/fcadc6e6-a621-47c8-ac2c-5f05dd18e4e1.jpeg?im_w=720',
      preview: true
    },
    {
      spotId: 10,
      url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-755137040389728919/original/419555f9-fa2b-4ef4-a7c8-e53d86568d55.jpeg?im_w=1200',
      preview: true
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
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, null, {})
  }
};
