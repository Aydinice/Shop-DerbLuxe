const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Регистрация (публичный маршрут)
const { User } = require("../models");

router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    // Создаем пользователя
    const user = await User.create({
      username,
      email,
      password, // Используйте hashedPassword, если хешируете пароль
      role,
    });

    // Создаем корзину для пользователя

    // Возвращаем ответ
    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    res.status(500).json({ error: "Ошибка при регистрации" });
  }
});

// Вход (публичный маршрут)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    console.log("Введенный пароль:", password);
    console.log("Хешированный пароль из БД:", user.password);

    // Проверяем пароль с использованием bcrypt
    // const isValidPassword = await bcrypt.compare(password, user.password);
    const isValidPassword = password === user.password; // Сравниваем пароли напрямую

    if (!isValidPassword) {
      return res.status(401).json({ error: "Неверный пароль" });
    }

    // Создаем JWT токен
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your-secret-key",
      {
        expiresIn: "1h", // Срок действия токена
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка при входе" });
  }
});

// Получить информацию о пользователе (защищенный маршрут)
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // Исключаем пароль из ответа
    });

    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json(user); // Возвращаем информацию о пользователе
  } catch (error) {
    console.error("Ошибка при получении информации о пользователе:", error);
    res
      .status(500)
      .json({ error: "Ошибка при получении информации о пользователе" });
  }
});

module.exports = router;
