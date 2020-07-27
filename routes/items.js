const express = require("express");
const multer = require("multer");

// Data
let items = require("./items");
//Slug
const slugify = require("slugify");
//controllers
const {
  fetchItem,
  itemList,
  itemUpdate,
  itemDelete,
} = require("../controllers/itemController");

const upload = require("../middleware/multer");

const router = express.Router();

router.param("itemId", async (req, res, next, itemId) => {
  const item = await fetchItem(itemId, next);
  if (item) {
    req.item = item;
    next();
  } else {
    const err = new Error("Item Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", itemList);

router.put("/:itemId", upload.single("image"), itemUpdate);

router.delete("/:itemId", itemDelete);

module.exports = router;
