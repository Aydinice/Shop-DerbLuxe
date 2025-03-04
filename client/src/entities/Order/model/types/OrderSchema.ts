// entities/Order/model/types/OrderSchema.ts
export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
}

export interface OrderSchema {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}
