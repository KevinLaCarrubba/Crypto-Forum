const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Watchlist extends Model {}

Watchlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    coinName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coinImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Watchlist",
  }
);
//SET RELATIONSHIP IN INDEX.JS
module.exports = Watchlist;
