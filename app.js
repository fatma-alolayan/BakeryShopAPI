const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const itemRoutes = require("./routes/items");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/items", itemRoutes);

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
