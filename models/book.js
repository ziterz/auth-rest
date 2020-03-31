"use strict";

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }

  Book.init(
    {
      name: DataTypes.STRING,
      UserId: DataTypes.INTEGER
    },
    { sequelize }
  );
  return Book;
};
