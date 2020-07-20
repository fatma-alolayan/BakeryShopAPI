const express = require("express");
let items = require("./items");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.delete("/items/:itemsId", async (req, res) => {
  const { itemsId } = req.params;
  const foundItem = items.find((item) => item.id === +itemsId);
  if (foundItem) {
    items = items.filter((_items) => _items.id !== +itemsId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "item not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
