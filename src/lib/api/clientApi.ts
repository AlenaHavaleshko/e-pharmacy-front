import axios from 'axios';
import type { RegisterData, LoginData, AuthResponse } from '@/src/types/auth';

const client = axios.create({
  baseURL: '/api',
  withCredentials: true,
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
