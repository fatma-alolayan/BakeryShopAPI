const express = require("express");
const router = express.Router();
// Data
let items = require("./items");
//Slug
const slugify = require("slugify");

const {
  itemCreate,
  itemList,
  itemUpdate,
  itemDelete,
} = require("../controllers/itemController");

router.get("/", itemList);

router.post("/", itemCreate);

router.put("/:itemId", itemUpdate);

router.delete("/:itemsId", itemDelete);

module.exports = router;
