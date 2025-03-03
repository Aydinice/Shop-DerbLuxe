// models/Basket.js
const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Basket = sequelize.define(
  "basket",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
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
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Связь с моделью Product
Basket.associate = (models) => {
  Basket.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
};

module.exports = Basket;
