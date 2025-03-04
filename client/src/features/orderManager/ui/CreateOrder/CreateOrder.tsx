import React, { useState } from "react";
import { useBasket } from "@/features/basketManager/lib/useBasket";
import { useOrder } from "../../lib/useOrder";
import "./CreateOrder.scss";
import { clearBasketApi } from "../../api/orderApi";

interface CreateOrderProps {
  onClose: () => void;
}

export const CreateOrder: React.FC<CreateOrderProps> = ({ onClose }) => {
  const { items } = useBasket();
  const { createOrder, isLoading, error } = useOrder();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleCreateOrder = async () => {
    if (!items.length || !shippingAddress) return;

    const orderItems = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const result = await createOrder({
      items: orderItems,
      shippingAddress,
      paymentMethod,
    });

    if (result.success) {
      // Очищаем корзину после успешного создания заказа
      await clearBasketApi();
      onClose();
    }
  };

  return (
    <div className="create-order">
      <div className="create-order-header">
        <h3>Оформление заказа</h3>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="create-order-form">
        <input
          type="text"
          placeholder="Адрес доставки"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Оплата картой</option>
          <option value="cash">Наличными при получении</option>
        </select>
        {error && <div className="error-message">{error}</div>}
        <button
          className="submit-order"
          onClick={handleCreateOrder}
          disabled={isLoading || !shippingAddress}
        >
          {isLoading ? "Оформление..." : "Оформить заказ"}
        </button>
      </div>
    </div>
  );
};
