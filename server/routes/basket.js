const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
// routes/basket.js
const { Basket, Product } = require("../models");
const router = express.Router();

router.post("/basket/add", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Товар не найден" });
    }

    const [basketItem, created] = await Basket.findOrCreate({
      where: { userId, productId },
      defaults: { quantity },
    });

    if (!created) {
      basketItem.quantity += quantity; // Увеличиваем количество, если товар уже в корзине
      await basketItem.save();
    }

    // Возвращаем обновленные данные о корзине
    const updatedBasketItem = await Basket.findByPk(basketItem.id, {
      include: [{ model: Product, as: "product" }],
    });

    res.json(updatedBasketItem);
  } catch (error) {
    console.error("Ошибка при добавлении товара в корзину:", error);
    res.status(500).json({ error: "Ошибка при добавлении товара в корзину" });
  }
});

// Получить корзину пользователя
router.get("/basket", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const basketItems = await Basket.findAll({
      where: { userId },
      include: [{ model: Product, as: "product" }], // Включаем данные о товаре
    });

    res.json(basketItems);
  } catch (error) {
    console.error("Ошибка при получении корзины:", error);
    res.status(500).json({ error: "Ошибка при получении корзины" });
  }
});

// Удалить товар из корзины
router.delete("/basket/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await Basket.destroy({
      where: { id, userId },
    });

    if (deleted) {
      res.status(200).json({ message: "Товар успешно удален из корзины." });
    } else {
      res.status(404).json({ message: "Товар не найден в корзине." });
    }
  } catch (error) {
    console.error("Ошибка при удалении товара из корзины:", error);
    res.status(500).json({ error: "Ошибка при удалении товара из корзины." });
  }
});

module.exports = router;
