// Data
let items = require("../items");
//Slug
const slugify = require("slugify");

exports.itemCreate = (req, res) => {
  const id = items[items.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newItem = { id, slug, ...req.body };
  items.push(newItem);
  res.status(201).json(newItem);
};

exports.itemList = (req, res) => {
  res.json(items);
};

exports.itemUpdate = (req, res) => {
  const { itemId } = req.params;
  const foundItem = items.find((item) => item.id === +itemId);
  if (foundItem) {
    for (const key in req.body) foundItem[key] = req.body[key];
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

exports.itemDelete = (req, res) => {
  const { itemsId } = req.params;
  const foundItem = items.find((item) => item.id === +itemsId);
  if (foundItem) {
    items = items.filter((_items) => _items.id !== +itemsId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "item not found" });
  }
};
