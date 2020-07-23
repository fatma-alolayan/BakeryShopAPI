// Data
let items = require("../items");
//Slug
const slugify = require("slugify");
//db
const { Item } = require("../db/models");

exports.itemCreate = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.itemList = async (req, res) => {
  try {
    const items = await Item.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.itemUpdate = async (req, res) => {
  const { itemId } = req.params;
  try {
    const foundItem = await Item.findByPk(itemId);
    if (foundItem) {
      await foundItem.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.itemDelete = async (req, res) => {
  const { itemId } = req.params;
  try {
    const foundItem = await Item.findByPk(itemId);
    if (foundItem) {
      await foundItem.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
};
