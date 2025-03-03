import axios from "axios";

export const addProductToBasketApi = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const token = localStorage.getItem("token"); // Получаем токен из localStorage

  console.log("API Request - Product ID:", productId); // Логируем ID товара
  console.log("API Request - Quantity:", quantity); // Логируем количество
  console.log("API Request - Token:", token); // Логируем токен

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.post(
    `http://localhost:3000/basket/add`,
    {
      productId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Передаем токен в заголовке
      },
    }
  );

  return response.data; // Возвращаем данные
};
