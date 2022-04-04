'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Album.associate = function (models) {
    // associations can be defined here
    Album.belongsTo(models.User, { foreignKey: 'user_id' })
    Album.hasMany(models.Picture, { foreignKey: 'album_id', onDelete: 'cascade', hooks: true })
  };
  return Album;
};