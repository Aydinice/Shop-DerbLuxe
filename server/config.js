// config.js
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "2442",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "2442",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "2442",
    database: process.env.DB_NAME || "postgres",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  },
};
