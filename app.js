const express = require("express");
const items = require("./items");
const cors = require("cors");

const app = express();
app.use(cors());

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});

app.get("/", (req, res) => {
  console.log("HELLO");
  res.json({ message: "Hello World" });
});

app.get("/items", (req, res) => {
  res.json(items);
});
