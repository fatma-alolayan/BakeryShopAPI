const { DataTypes, Model } = require("sequelize");
const SequelizeSlugify = require("sequelize-slugify");

const db = require("../db");

class Item extends Model {}

Item.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
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
      // allowNull: false,
    },
  },
  {
    sequelize: db,
  }
);

SequelizeSlugify.slugifyModel(Item, {
  source: ["name"],
});
module.exports = Item;
