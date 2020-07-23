const { Sequelize } = require("sequelize");

const db = new Sequelize({
  username: "postgres",
  password: "tema65116112",
  database: "bakeryshop_db",
  dialect: "postgres",
  host: "localhost",
});

module.exports = db;
