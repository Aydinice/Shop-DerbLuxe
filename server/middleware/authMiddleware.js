const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Токен отсутствует" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded; // Добавляем данные пользователя в запрос
    next();
  } catch (error) {
    console.error("Ошибка при проверке токена:", error);
    res.status(401).json({ error: "Неверный токен" });
  }
};

module.exports = authMiddleware;
