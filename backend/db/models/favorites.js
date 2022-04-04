'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    user_id: DataTypes.INTEGER,
    picture_id: DataTypes.INTEGER
  }, {});
  Favorites.associate = function(models) {
    // associations can be defined here
  };
  return Favorites;
};