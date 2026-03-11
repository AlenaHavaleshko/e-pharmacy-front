import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: process.env.NODE_BACKEND_URL, // напр http://localhost:5000
  withCredentials: true,            // щоб cookie/токени передавались
});