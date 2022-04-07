'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER
  }, {});
  Picture.associate = function(models) {
    // associations can be defined here
  };
  return Picture;
};