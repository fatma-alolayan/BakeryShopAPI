// Data
let items = require("../items");
//Slug
const slugify = require("slugify");
//db
const { Item, Bakery } = require("../db/models");

exports.fetchItem = async (itemId, next) => {
  try {
    const item = await Item.findByPk(itemId);
    return item;
  } catch (error) {
    next(error);
  }
};

exports.itemList = async (req, res, next) => {
  try {
    const items = await Item.findAll({
      attributes: { exclude: ["bakeryId", "createdAt", "updatedAt"] },
      include: {
        model: Bakery,
        as: "bakery",
        attributes: ["name"],
      },
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
};

exports.itemUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.item.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.itemDelete = async (req, res, next) => {
  try {
    await req.item.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
