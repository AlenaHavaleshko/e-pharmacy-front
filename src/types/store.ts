export interface Store {
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  status: 'OPEN' | 'CLOSE';
}