import { Review } from '@/src/types/review';

export const getReviews = async (): Promise<Review[]> => {
  try {
    const res = await fetch('/api/customer-reviews');
    if (!res.ok) return [];

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
};