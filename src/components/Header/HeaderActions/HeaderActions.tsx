'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/src/lib/store/authStore';
import { logoutUser } from '@/src/lib/api/clientApi';
import css from './HeaderActions.module.css';

export default function HeaderActions() {
  const { isAuthenticated, cartCount, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isHome = pathname === '/home' || pathname === '/';

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // ignore
    } finally {
      logout();
      router.push('/');
    }
  };

  // Avoid hydration mismatch — Zustand persist reads localStorage only on client
  if (!mounted) {
    return (
      <div className={css.actions}>
        <Link href="/register" className={css.register_btn}>
          Register
        </Link>
        <Link href="/login" className={css.login_btn}>
          Login
        </Link>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className={css.actions}>
        <Link
          href="/cart"
          className={`${css.cart_btn} ${isHome ? '' : css.cart_btn_light}`}
          aria-label="Cart"
        >
          <svg width={18} height={18} aria-hidden="true">
            <use href="/sprite.svg#icon-cart" />
          </svg>
          <span className={css.cart_badge}>{cartCount}</span>
        </Link>

        <Link
          href="/profile"
          className={`${css.user_btn} ${isHome ? '' : css.user_btn_light}`}
          aria-label="Profile"
        >
          <svg width={18} height={18} aria-hidden="true">
            <use href="/sprite.svg#icon-user" />
          </svg>
        </Link>

        <span
          className={`${css.divider} ${isHome ? '' : css.divider_light}`}
          aria-hidden="true"
        />

        <button
          className={`${css.logout_btn} ${isHome ? '' : css.logout_btn_light}`}
          type="button"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={css.actions}>
      <Link
        href="/register"
        className={`${css.register_btn} ${isHome ? '' : css.register_btn_light}`}
      >
        Register
      </Link>
      <Link
        href="/login"
        className={`${css.login_btn} ${isHome ? '' : css.login_btn_light}`}
      >
        Login
      </Link>
    </div>
  );
}
