'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Song.init({
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    artist: DataTypes.STRING,
    songPath: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};