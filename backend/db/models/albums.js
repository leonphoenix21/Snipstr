'use strict';
module.exports = (sequelize, DataTypes) => {
  const Albums = sequelize.define('Albums', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Albums.associate = function (models) {
    // associations can be defined here
    Albums.belongsTo(models.User, { foreignKey: 'user_id' })
    Albums.hasMany(models.Picture, { foreignKey: 'album_id', onDelete: 'cascade', hooks: true })
  };
  return Albums;
};