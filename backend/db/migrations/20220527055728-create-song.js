'use strict';


module.exports = {
   up: (queryInterface, Sequelize) => {
   return queryInterface.createTable('Songs', {
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
        type: Sequelize.DATEONLY
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
        type: Sequelize.INTEGER,
        references: {model:'Users'}
      },
      albumName: {
        type: Sequelize.STRING(200)
      },
      album_id: {
        type: Sequelize.INTEGER,
        references: {model:'Albums'}
      },
      playlist_id: {
        type: Sequelize.INTEGER,
        references: {model:'Playlists'}
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};
