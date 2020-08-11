const express = require("express");
const multer = require("multer");

//Passport
const passport = require("passport");

// Data
let items = require("./items");
//Slug
const slugify = require("slugify");
//controllers
const {
  fetchBakery,
  bakeryCreate,
  bakeryList,
  bakeryUpdate,
  bakeryDelete,
  itemCreate,
} = require("../controllers/bakeryController");

const upload = require("../middleware/multer");

const router = express.Router();

router.param("bakeryId", async (req, res, next, bakeryId) => {
  const bakery = await fetchBakery(bakeryId, next);
  if (bakery) {
    req.bakery = bakery;
    next();
  } else {
    const err = new Error("Bakery Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", bakeryList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bakeryCreate
);

router.put("/:bakeryId", upload.single("image"), bakeryUpdate);

router.delete("/:bakeryId", bakeryDelete);

router.post("/:bakeryId/items", upload.single("image"), itemCreate);

module.exports = router;
