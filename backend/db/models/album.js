module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album',{
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    user_id: DataTypes.INTEGER,
    imagePath: DataTypes.STRING

  }, {})


  Album.associate = function(models) {
    // define association here
    Album.belongsTo(models.User,{foreignKey:"user_id"})
    Album.hasMany(models.Song, {foreignKey:"album_id"})
  }
  return Album;
};
