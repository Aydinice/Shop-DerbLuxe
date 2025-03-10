import React, { useState } from "react";
import { useProducts } from "@/features/productManager/lib/useProducts";
import { useBasket } from "@/features/basketManager/lib/useBasket";

export default function ProductsList() {
  const [quantity, setQuantity] = useState(1);
  const {
    products,
    delProduct,
    name,
    price,
    onChangeNewProductName,
    onChangeNewProductPrice,
    addNewProduct,
    sortedProducts,
    searchQuery,
    onChangeSearchQuery,
    filteredSearchQuery,
  } = useProducts();

  const { addToBasketProduct } = useBasket();

  return (
    <>
      <div>
        <input
          onChange={onChangeSearchQuery}
          value={searchQuery}
          type="text"
          placeholder="Поиск..."
        />
        <button onClick={() => sortedProducts("name")}>
          Сортировка по названию
        </button>
        <button onClick={() => sortedProducts("price")}>
          Сортировка по цене
        </button>
      </div>
      <ul className="ProductList">
        {filteredSearchQuery.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
            <button
              style={{ marginLeft: "15px" }}
              onClick={() => delProduct(item.id)}
            >
              Удалить
            </button>
            <button
              onClick={() => addToBasketProduct(item.id, quantity)}
              style={{ marginLeft: "15px" }}
            >
              Добавить в корзину
            </button>
          </li>
        ))}
      </ul>
      <div>
        <input
          onChange={onChangeNewProductName}
          value={name}
          type="text"
          placeholder="Название товара"
        />
        <input
          onChange={onChangeNewProductPrice}
          value={price}
          type="text"
          placeholder="Цена товара"
        />
        <button onClick={addNewProduct}>Добавить</button>
      </div>
    </>
  );
}
