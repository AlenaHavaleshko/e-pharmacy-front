import { nextServer } from './api';
import type { Store } from '@/src/types/store.ts';

export async function fetchStores(): Promise<Store[]> {
  try {
    const res = await nextServer.get<Store[]>('/stores');
    return res.data ?? [];
  } catch {
    return [];
  }
}
