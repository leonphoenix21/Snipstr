'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    user_id: DataTypes.INTEGER,
    picture_id: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  Comments.associate = function (models) {
    // associations can be defined here
    Comments.belongsTo(models.User, { foreignKey: 'user_id' })
    Comments.belongsTo(models.Picture, { foreignKey: 'picture_id' })
  };
  return Comments;
};