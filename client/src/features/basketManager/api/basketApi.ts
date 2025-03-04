import axios from "axios";

export const fetchBasketApi = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токет отсутствует");
  }

  const response = await axios.get(`http://localhost:3000/api/basket`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addToBasketApi = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.post(
    `http://localhost:3000/api/basket/add`,
    {
      productId,
      quantity,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const removeFromBasketApi = async (prodId: number) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Токен отсутствует");
  }

  const response = await axios.delete(
    `http://localhost:3000/api/basket/${prodId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
