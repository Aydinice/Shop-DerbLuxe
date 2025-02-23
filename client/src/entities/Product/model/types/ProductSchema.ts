export interface ProductSchema {
  id: number;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  size?: string;
  color?: string;
  brand?: string;
  material?: string;
  rating?: number;
  is_new?: boolean;
}
