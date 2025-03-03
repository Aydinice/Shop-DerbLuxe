const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize"); // Импортируем экземпляр Sequelize

const Product = sequelize.define(
  "product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    size: {
      type: DataTypes.STRING(10), // Ограничиваем длину строки до 10 символов
      allowNull: true, // Разрешаем NULL значения
    },
    color: {
      type: DataTypes.STRING(50), // Ограничиваем длину строки до 50 символов
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING(100), // Ограничиваем длину строки до 100 символов
      allowNull: true,
    },
    material: {
      type: DataTypes.STRING(50), // Ограничиваем длину строки до 50 символов
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2), // Точность 3, масштаб 2 (например, 4.50)
      allowNull: true,
    },
    is_new: {
      type: DataTypes.BOOLEAN, // Или DataTypes.TINYINT(1) если хотите 0 или 1
      allowNull: true,
    },
  },
  {
    timestamps: true, // Включает автоматическое создание createdAt и updatedAt
    tableName: "products", // Указываем имя таблицы, если оно отличается от имени модели
    schema: "public", // Указываем схему, если она не является схемой по умолчанию
  }
);

module.exports = Product;
