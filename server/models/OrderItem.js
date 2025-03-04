// models/OrderItem.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

// Связь с товаром
OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Product, {
    foreignKey: "productId",
    as: "product",
  });
};

module.exports = OrderItem;
