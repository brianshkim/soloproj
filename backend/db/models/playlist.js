module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     name: DataTypes.STRING,
    user_id: DataTypes.INTEGER

  }, {});

  Playlist.associate = function(models) {
    // define association here
    Playlist.belongsTo(models.User,{foreignKey:"user_id"})
    Playlist.hasMany(models.Song, {foreignKey:"playlist_id"})
  }
  return Playlist;
};
