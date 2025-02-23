const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Убедитесь, что путь правильный

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Токен отсутствует" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    // const user = await User.findByPk(decoded.id); // Дополнительная проверка пользователя в БД (опционально)
    // if (!user) {
    //   return res.status(404).json({ error: "Пользователь не найден" });
    // }
    req.user = decoded; // Добавляем информацию о пользователе в запрос
    next();
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    res.status(401).json({ error: "Неверный токен" });
  }
};

module.exports = authMiddleware;
