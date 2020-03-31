"use strict";

const { encryptPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Book, { foreignKey: "id" });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Email is required"
          },
          notEmpty: {
            args: true,
            msg: "Email is required"
          },
          isEmail: {
            args: true,
            msg: "Invalid email format"
          }
        }
      },
      password: DataTypes.STRING
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user, options) {
          user.password = encryptPassword(user.password);
        }
      }
    }
  );
  return User;
};
