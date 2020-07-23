const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);
module.exports = Item;
