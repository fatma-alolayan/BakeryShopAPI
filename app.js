const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const { Item } = require("./db/models");
const path = require("path");
// Routes
const itemRoutes = require("./routes/items");
const bakeryRoutes = require("./routes/bakeries");
const userRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(bodyParser.json());
// Routes
app.use("/items", itemRoutes);
app.use("/bakeries", bakeryRoutes);
app.use(userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || "Internal Server Error");
});

const run = async () => {
  try {
    await db.sync();
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
