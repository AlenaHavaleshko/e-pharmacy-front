import { nextServer } from './api';
import type { Store } from '@/src/types/store';
import type { Product } from '@/src/types/product';

export async function fetchStores(): Promise<Store[]> {
  try {
    const res = await nextServer.get('/stores', {
      params: { limit: 6, page: 1 },
    });
    const data = res.data;
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.stores)) return data.stores;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch {
    return [];
  }
}

export async function fetchStoresNearest(): Promise<Store[]> {
  try {
    const res = await nextServer.get('/stores/nearest', {
      params: { limit: 6, page: 1 },
    });
    const data = res.data;
    // backend shape: { data: { stores: [...] } }
    if (Array.isArray(data?.data?.stores)) return data.data.stores;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  } catch {
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const res = await nextServer.get('/products', {
      params: { limit: 1000, page: 1 },
    });
    // backend returns { status: 200, data: [...] }
    const raw = res.data;
    const products: { category?: string }[] = Array.isArray(raw)
      ? raw
      : Array.isArray(raw?.data)
        ? raw.data
        : [];
    const unique = Array.from(
      new Set(products.map((p) => p.category).filter(Boolean) as string[])
    ).sort();
    return unique;
  } catch {
    return [];
  }
}

export async function fetchProducts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  try {
    const res = await nextServer.get('/products', {
      params: { limit: 12, page: 1, ...params },
    });
    const raw = res.data;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data;
    return [];
  } catch {
    return [];
  }
}
