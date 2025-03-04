// routes/order.js
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { Order, OrderItem, Product } = require("../models");
const router = express.Router();

// Создание заказа
router.post("/orders", authMiddleware, async (req, res) => {
  const { items, shippingAddress, paymentMethod } = req.body;
  const userId = req.user.id;

  try {
    // Получаем актуальные цены товаров из базы
    const products = await Product.findAll({
      where: {
        id: items.map((item) => item.productId),
      },
    });

    // Проверяем, что все товары найдены
    if (products.length !== items.length) {
      return res.status(400).json({ error: "Некоторые товары не найдены" });
    }

    // Создаем заказ
    const order = await Order.create({
      userId,
      totalAmount: items.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + product.price * item.quantity;
      }, 0),
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    // Создаем записи для товаров в заказе
    await Promise.all(
      items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return OrderItem.create({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // Используем актуальную цену из БД
        });
      })
    );

    // Возвращаем созданный заказ с товарами
    const createdOrder = await Order.findOne({
      where: { id: order.id },
      include: [
        {
          model: OrderItem,
          include: [Product],
        },
      ],
    });

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    res.status(500).json({ error: "Ошибка при создании заказа" });
  }
});

// Получение всех заказов пользователя
router.get("/orders", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: OrderItem,
          as: "order_items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["name", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = orders.map((order) => {
      const orderData = order.get({ plain: true });
      return {
        id: orderData.id,
        userId: orderData.userId,
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        createdAt: orderData.createdAt,
        updatedAt: orderData.updatedAt,
        items: orderData.order_items
          ? orderData.order_items.map((item) => ({
              id: item.id,
              productName: item.product.name,
              quantity: item.quantity,
              price: item.price,
            }))
          : [],
      };
    });

    res.json(formattedOrders);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({ error: "Ошибка при получении заказов" });
  }
});

// Отмена заказа
router.patch("/orders/:id/cancel", authMiddleware, async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({ error: "Заказ уже отменен" });
    }

    if (["shipped", "delivered"].includes(order.status)) {
      return res
        .status(400)
        .json({ error: "Нельзя отменить отправленный или доставленный заказ" });
    }

    await order.update({ status: "cancelled" });

    res.json({ message: "Заказ успешно отменен" });
  } catch (error) {
    console.error("Ошибка при отмене заказа:", error);
    res.status(500).json({ error: "Ошибка при отмене заказа" });
  }
});

// Удаление заказа (только для отмененных заказов)
router.delete("/orders/:id", authMiddleware, async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({
      where: { id: orderId, userId },
    });

    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (order.status !== "cancelled") {
      return res
        .status(400)
        .json({ error: "Можно удалять только отмененные заказы" });
    }

    // Удаляем связанные элементы заказа
    await OrderItem.destroy({
      where: { orderId },
    });

    // Удаляем сам заказ
    await order.destroy();

    res.json({ message: "Заказ успешно удален" });
  } catch (error) {
    console.error("Ошибка при удалении заказа:", error);
    res.status(500).json({ error: "Ошибка при удалении заказа" });
  }
});

module.exports = router;
