'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Users.hasMany(models.Posts, {
        foreignKey: {
          name: 'user_id'
        },
      });
      models.Users.hasMany(models.Comments, {
        foreignKey: {
          name: 'user_id'
        },
      })
    }
  };
  Users.init({
    lastName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    permission: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};