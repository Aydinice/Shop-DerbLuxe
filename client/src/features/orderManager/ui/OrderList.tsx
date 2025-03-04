import React from "react";
import { useOrder } from "../lib/useOrder";
import "./OrderList.scss";
import { cancelOrderApi, deleteOrderApi } from "../api/orderApi";
import { useDispatch } from "react-redux";
import { fetchOrdersThunk } from "../model/thunks";

export const OrderList = () => {
  const { orders, isLoading, error } = useOrder();
  const dispatch = useDispatch();

  if (isLoading)
    return <div className="order-loading">Загрузка заказов...</div>;
  if (error) return <div className="order-error">{error}</div>;

  const handleCancelOrder = async (orderId: number) => {
    try {
      await cancelOrderApi(orderId);
      // Обновляем список заказов
      await dispatch(fetchOrdersThunk());
    } catch (error) {
      console.error("Ошибка при отмене заказа:", error);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await deleteOrderApi(orderId);
      // Обновляем список заказов
      await dispatch(fetchOrdersThunk());
    } catch (error) {
      console.error("Ошибка при удалении заказа:", error);
    }
  };

  return (
    <div className="orders-container">
      <h2>Мои заказы</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <div className="order-header">
            <h3>Заказ #{order.id}</h3>
            <span className={`order-status status-${order.status}`}>
              {order.status}
            </span>
          </div>
          <div className="order-details">
            <p>Сумма заказа: {order.totalAmount} ₽</p>
            <p>Адрес доставки: {order.shippingAddress}</p>
            <p>Способ оплаты: {order.paymentMethod}</p>
          </div>
          <div className="order-items">
            {order.items?.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.productName}</span>
                <span>{item.quantity} шт.</span>
                <span>{item.price} ₽</span>
              </div>
            ))}
          </div>
          <div className="order-actions">
            {order.status !== "cancelled" && (
              <button onClick={() => handleCancelOrder(order.id)}>
                Отменить заказ
              </button>
            )}
            {order.status === "cancelled" && (
              <button onClick={() => handleDeleteOrder(order.id)}>
                Удалить заказ
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
