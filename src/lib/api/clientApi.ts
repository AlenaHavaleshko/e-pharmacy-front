import axios from 'axios';
import type { RegisterData, LoginData, AuthResponse } from '@/src/types/auth';
import type { Product } from '@/src/types/product';

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Attach Bearer token from persisted auth store on every request
client.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('auth-storage');
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { token?: string } };
      const token = parsed?.state?.token;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore
  }
  return config;
});

export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  const res = await client.post<AuthResponse>('/user/register', data);
  return res.data;
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const res = await client.post<AuthResponse>('/user/login', data);
  return res.data;
}

export async function logoutUser(): Promise<void> {
  await client.post('/user/logout');
}

export async function addToCart(productId: string, quantity = 1): Promise<void> {
  await client.post('/cart', { productId, quantity });
}

export async function fetchCart() {
  const res = await client.get('/cart');
  return res.data;
}

export async function updateCartItem(productId: string, quantity: number): Promise<void> {
  await client.patch('/cart/update', { productId, quantity });
}

export async function removeFromCart(productId: string): Promise<void> {
  await client.patch('/cart/update', { productId, quantity: 0 });
}

export async function placeOrder(payload: {
  name: string;
  address: string;
  photo: string;
  products: number;
  price: number;
  order_date: string;
}): Promise<void> {
  await client.post('/cart/checkout', payload);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await client.get<Product | { data: Product }>(`/products/${id}`);
    const raw = res.data as { data?: Product } & Product;
    if (raw?.data) return raw.data;
    return raw ?? null;
  } catch {
    return null;
  }
}
