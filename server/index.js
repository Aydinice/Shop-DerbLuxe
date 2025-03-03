const { Sequelize } = require("sequelize");
const sequelize = require("../sequelize");

// Импортируем модели
const User = require("./User");
const { Basket, BasketItem } = require("./Basket");
const Product = require("./Product");

// Настройка связей
User.hasOne(Basket, { foreignKey: "userId" });
Basket.belongsTo(User, { foreignKey: "userId" });

Basket.hasMany(BasketItem, { foreignKey: "basketId" });
BasketItem.belongsTo(Basket, { foreignKey: "basketId" });

BasketItem.belongsTo(Product, { foreignKey: "productId" });
Product.hasMany(BasketItem, { foreignKey: "productId" });

// Экспортируем модели и sequelize
module.exports = {
  sequelize,
  User,
  Basket,
  BasketItem,
  Product,
};
