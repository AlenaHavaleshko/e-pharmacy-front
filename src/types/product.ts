export interface ProductReview {
  _id: string;
  name: string;
  rating: number;
  date: string;
  testimonial: string;
  avatar?: string;
}

export interface Product {
  _id: string;
  id: string;
  name: string;
  photo: string;
  suppliers: string;
  stock: number;
  price: number;
  category: string;
  rating?: number;
  description?: string;
  reviews?: ProductReview[];
}
