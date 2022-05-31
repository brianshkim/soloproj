

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {



    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    artist: DataTypes.STRING,
    songPath: DataTypes.STRING,
    imagePath: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    albumName: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER
  }, {});



  Song.associate = function(models) {
    // define association here
    Song.belongsTo(models.User, { foreignKey: "user_id" })
    Song.belongsTo(models.Playlist, { foreignKey: "playlist_id" })
    Song.belongsTo(models.Album, { foreignKey: "album_id" })



  }
  return Song;
};
