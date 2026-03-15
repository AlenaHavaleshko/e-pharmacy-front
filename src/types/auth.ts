export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  avatarURL?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  cartCount: number;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setCartCount: (count: number) => void;
};

export interface AuthResponse {
  token: string;
  user: User;
}
