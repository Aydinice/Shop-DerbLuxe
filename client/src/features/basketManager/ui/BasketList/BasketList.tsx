// features/basketManager/ui/BasketItems/BasketItems.tsx
import React from "react";
import { useBasket } from "../../lib/useBasket";
import "./BasketList.scss";

export const BasketList = () => {
  const { items, removeFromBasket } = useBasket();

  return (
    <div>
      <h2>Корзина</h2>
      {items.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product ? (
                <>
                  {item.product.name} - {item.product.price} - {item.quantity}{" "}
                  шт.
                  <button onClick={() => removeFromBasket(item.id)}>
                    Удалить
                  </button>
                </>
              ) : (
                <p>Товар не найден</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
