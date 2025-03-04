const { Sequelize } = require("sequelize");
const sequelize = require("../sequelize"); // Импортируем экземпляр Sequelize

// Импортируем модели
const User = require("./User");
const Basket = require("./Basket"); // Импортируем из одного файла
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Определяем связи
Order.hasMany(OrderItem, { as: "order_items" });
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product, { as: "product" });
Product.hasMany(OrderItem);

// Связи для корзины
Basket.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Экспортируем модели и sequelize
module.exports = {
  sequelize,
  User,
  Basket,
  Product,
  Order,
  OrderItem,
};
