import React, { useState } from "react";
import "./BasketList.scss";
import { useBasket } from "../../lib/useBasket";
import { CreateOrder } from "@/features/orderManager/ui/CreateOrder/CreateOrder";

export default function BasketList() {
  const { items, removeFromBasket } = useBasket();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="basket-container">
      <h1>Корзина</h1>
      {items.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <>
          <ul className="basket-items">
            {items.map((item) => (
              <li key={item.id} className="basket-item">
                <span>{item.product.name}</span>
                <span>
                  {item.product.price} ₽ x {item.quantity}
                </span>
                <button onClick={() => removeFromBasket(item.id)}>
                  Удалить
                </button>
              </li>
            ))}
          </ul>
          <div className="basket-footer">
            <p>Итого: {totalAmount} ₽</p>
            <button
              className="order-button"
              onClick={() => setShowOrderForm(true)}
            >
              Оформить заказ
            </button>
          </div>
          {showOrderForm && (
            <CreateOrder onClose={() => setShowOrderForm(false)} />
          )}
        </>
      )}
    </div>
  );
}
