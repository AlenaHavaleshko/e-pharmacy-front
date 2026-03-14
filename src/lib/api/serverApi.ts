import { nextServer } from './api';
import type { Store } from '@/src/types/store';

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
