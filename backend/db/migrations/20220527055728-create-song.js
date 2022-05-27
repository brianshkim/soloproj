'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(200)
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      artist: {
        allowNull: false,
        type: Sequelize.STRING(200),
        unique: true
      },
      songPath: {
        type: Sequelize.STRING
      },
      imagePath: {
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      albumName: {
        type: Sequelize.STRING(200)
      },
      album_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      playlist_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs');
  }
};
