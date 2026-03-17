export interface CartProduct {
  _id: string;
  name: string;
  photo: string;
  price: number;
  suppliers?: string;
}

export interface CartItem {
  _id: string;
  product: CartProduct | string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  items: CartItem[];
  total?: number;
}

export interface CartItemNormalized {
  itemId: string;
  productId: string;
  name: string;
  photo: string;
  price: number;
  suppliers?: string;
  quantity: number;
}

export interface CheckoutPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: 'cash' | 'bank';
}
