const Bakery = require("./Bakery");
const Item = require("./Item");
const User = require("./User");

// one to many relationship
Bakery.hasMany(Item, {
  as: "items",
  foreignKey: "bakeryId",
  allowNull: false,
});

Item.belongsTo(Bakery, { as: "bakery" });

module.exports = { Bakery, Item, User };
