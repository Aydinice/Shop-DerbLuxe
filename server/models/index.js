const { Sequelize } = require("sequelize");
const sequelize = require("../sequelize"); // Импортируем экземпляр Sequelize

// Импортируем модели
const User = require("./User");
const Basket = require("./Basket"); // Импортируем из одного файла
const Product = require("./Product");

// Связи
User.hasMany(Basket, { foreignKey: "userId" });
Basket.belongsTo(User, { foreignKey: "userId" });

Product.hasMany(Basket, { foreignKey: "productId" });
Basket.belongsTo(Product, { foreignKey: "productId" });

// Экспортируем модели и sequelize
module.exports = {
  sequelize,
  User,
  Basket,
  Product,
};
