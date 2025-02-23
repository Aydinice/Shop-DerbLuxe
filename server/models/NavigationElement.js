const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const NavigationElement = sequelize.define(
  "navigation_element",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    target: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Включает автоматическое создание createdAt и updatedAt
  }
);

module.exports = NavigationElement;
