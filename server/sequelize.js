// sequelize.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASS || "2442",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
  }
);

// Проверка подключения
sequelize
  .authenticate()
  .then(() => {
    console.log("Подключение к базе данных успешно установлено.");
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных:", err);
  });

module.exports = sequelize;
