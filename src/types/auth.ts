export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  avatarURL?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
