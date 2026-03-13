import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/src/types/auth';
import type { AuthStore } from '@/src/types/auth';


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      cartCount: 0,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false, cartCount: 0 }),
      setCartCount: (count) => set({ cartCount: count }),
    }),
    { name: 'auth-storage' }
  )
);
