"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "NodeJs",
      },
      {
        name: "Flutter",
      },
      {
        name: "VueJs",
      },
      {
        name: "ReactJs",
      },
      {
        name: "React Native",
      },
      {
        name: "Java Script",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", {}, null);
  },
};
