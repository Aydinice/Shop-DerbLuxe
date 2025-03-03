const express = require("express");
const sequelize = require("./sequelize");
const NavigationElement = require("./models/NavigationElement");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const basketRoutes = require("./routes/basket");
const { Basket, Product, User } = require("./models");

sequelize.sync().then(() => {
  console.log("База данных синхронизирована");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api", basketRoutes); // Подключаем маршруты корзины

// Получить все продукты
app.get("/products", async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Добавить продукт
app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  try {
    const newProduct = await Product.create({ name, price }); // Не передавайте id
    res.json(newProduct);
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ error: "Ошибка при добавлении продукта" });
  }
});

// Удалить продукт
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.destroy({
      where: { id: id },
    });

    if (deleted) {
      res.status(200).json({ message: "Продукт успешно удален." });
    } else {
      res.status(404).json({ message: "Продукт не найден." });
    }
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error);
    res.status(500).json({ error: "Ошибка при удалении продукта." });
  }
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Продукт не найден." });
    }

    // Обновляем поля продукта
    product.name = name;
    product.price = price;

    await product.save();

    res.json(product);
  } catch (error) {
    console.error("Ошибка при обновлении продукта:", error);
    res.status(500).json({ error: "Ошибка при обновлении продукта." });
  }
});

// Получить все элементы навигации
app.get("/navigation_elements", async (req, res) => {
  try {
    const elements = await NavigationElement.findAll();
    res.json(elements);
  } catch (error) {
    console.error("Ошибка при получении элементов навигации:", error);
    res.status(500).json({ error: "Ошибка при получении элементов навигации" });
  }
});

// Добавить элемент навигации
app.post("/navigation_elements", async (req, res) => {
  const { name, slug, parent_id, order, is_active, icon, type, target, data } =
    req.body;
  try {
    const newElement = await NavigationElement.create({
      name,
      slug,
      parent_id,
      order,
      is_active,
      icon,
      type,
      target,
      data,
    });
    res.json(newElement);
  } catch (error) {
    console.error("Ошибка при добавлении элемента навигации:", error);
    res.status(500).json({ error: "Ошибка при добавлении элемента навигации" });
  }
});

// Обновить элемент навигации
app.put("/navigation_elements/:id", async (req, res) => {
  const { id } = req.params;
  const { name, slug, parent_id, order, is_active, icon, type, target, data } =
    req.body;

  try {
    const element = await NavigationElement.findByPk(id);

    if (!element) {
      return res.status(404).json({ message: "Элемент навигации не найден." });
    }

    element.name = name;
    element.slug = slug;
    element.parent_id = parent_id;
    element.order = order;
    element.is_active = is_active;
    element.icon = icon;
    element.type = type;
    element.target = target;
    element.data = data;

    await element.save();
    res.json(element);
  } catch (error) {
    console.error("Ошибка при обновлении элемента навигации:", error);
    res
      .status(500)
      .json({ error: "Ошибка при обновлении элемента навигации." });
  }
});

// Удалить элемент навигации
app.delete("/navigation_elements/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await NavigationElement.destroy({
      where: { id: id },
    });

    if (deleted) {
      res.status(200).json({ message: "Элемент навигации успешно удален." });
    } else {
      res.status(404).json({ message: "Элемент навигации не найден." });
    }
  } catch (error) {
    console.error("Ошибка при удалении элемента навигации:", error);
    res.status(500).json({ error: "Ошибка при удалении элемента навигации." });
  }
});

// Синхронизация с базой данных и запуск сервера
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Сервер запущен на http://localhost:3000");
  });
});
