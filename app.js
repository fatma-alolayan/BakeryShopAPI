const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const { Item } = require("./db/models");

const itemRoutes = require("./routes/items");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/items", itemRoutes);

const run = async () => {
  try {
    await db.sync();
    console.log("Connection to the database successful!");
    // const newItem = await Item.create({ name: "some item" });
    // console.log(newItem.toJSON());
    const items = await Item.findAll();
    items.forEach((item) => console.log(item.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
