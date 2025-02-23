// sequelize.js
const { Sequelize } = require("sequelize");
require("dotenv").config(); // Убедитесь, что dotenv настроен, если используете env переменные

const sequelizeConfig = {
  development: {
    database: process.env.DB_NAME || "postgres", // Замените 'postgres' на имя вашей БД или используйте переменную окружения
    username: process.env.DB_USER || "postgres", // Замените 'postgres' на имя пользователя БД или используйте переменную окружения
    password: process.env.DB_PASS || "2442", // Замените '2442' на пароль или используйте переменную окружения
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    dialectOptions: {
      // Add this to fix the issue with Sequelize CLI
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  },
  test: {
    database: process.env.TEST_DB_NAME || "testdb",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "2442",
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  },
  production: {
    database: process.env.PROD_DB_NAME || "productiondb",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS, // В production пароль должен быть в переменной окружения
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    dialectOptions: {
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  },
};

const env = process.env.NODE_ENV || "development";
const config = sequelizeConfig[env];

// Create the Sequelize instance here, after selecting the correct configuration.
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions, // Add dialectOptions here as well
  }
);

// Export the Sequelize instance, not just the configuration.
module.exports = sequelize;
