'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.belongsTo(models.Users, {
        foreignKey: {
          name: 'user_id'
        },
        onDelete: 'cascade',
      });
      models.Posts.hasMany(models.Comments, {
        foreignKey: {
          name: 'post_id'
        }
      });
    }
  };
  Posts.init({
    user_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachments: DataTypes.STRING,
    comments: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};