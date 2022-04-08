'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER
  }, {});
  Picture.associate = function (models) {
    // associations can be defined here
    Picture.belongsTo(models.User, { foreignKey: 'user_id' })
    Picture.belongsTo(models.Albums, { foreignKey: 'album_id' })
  };
  return Picture;
};