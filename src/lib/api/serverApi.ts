import { nextServer } from './api';
import type { Store } from '@/src/types/store';
import type { Product } from '@/src/types/product';

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await nextServer.get(`/products/${id}`);
    const raw = res.data;
    if (raw?.data) return raw.data;
    return raw ?? null;
  } catch (err) {
    console.error('[serverApi] fetchProductById failed:', err);
    return null;
  }
}

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
  } catch (err) {
    console.error('[serverApi] fetchStores failed:', err);
    return [];
  }
}

export async function fetchStoresNearest(): Promise<Store[]> {
  try {

    console.log("Full request URL:", nextServer.defaults.baseURL + '/stores/nearest');  // Логируем полный URL
    const res = await nextServer.get('/stores/nearest', {
      params: { limit: 6, page: 1 },
    });
    const data = res.data;
    // backend shape: { data: { stores: [...] } }
    if (Array.isArray(data?.data?.stores)) return data.data.stores;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  } catch (err) {
    console.error('[serverApi] fetchStoresNearest failed:', err);
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
  } catch (err) {
    console.error('[serverApi] fetchCategories failed:', err);
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
      params: { limit: 500, page: 1 },
    });
    const raw = res.data;
    let all: Product[] = [];
    if (Array.isArray(raw)) all = raw;
    else if (Array.isArray(raw?.data)) all = raw.data;

    const { category, search } = params ?? {};

    if (category) {
      all = all.filter((p) =>
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search?.trim()) {
      const q = search.trim().toLowerCase();
      all = all.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.suppliers?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    return all;
  } catch (err) {
    console.error('[serverApi] fetchProducts failed:', err);
    return [];
  }
}
