'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/src/lib/store/authStore';
import { useCartStore } from '@/src/lib/store/cartStore';
import { logoutUser } from '@/src/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import css from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      /* ignore */
    }
    logout();
    onClose();
    router.push('/');
  };

  if (!isOpen) return null;

  const navItems = [
    { label: 'Home', href: '/home' },
    { label: 'Medicine store', href: '/medicine-store' },
    { label: 'Medicine', href: '/medicine' },
  ];

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.panel} onClick={(e) => e.stopPropagation()}>
        {/* Header row */}
        <div className={css.top}>
          <div className={css.logo}>
            <Image
              src="/logo/logo.white.mob.png"
              alt="E-Pharmacy logo"
              width={32}
              height={32}
            />
            <span className={css.logo_text}>E-Pharmacy</span>
          </div>
          <button
            className={css.close_btn}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              width={24}
              height={24}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1={4} y1={4} x2={20} y2={20} />
              <line x1={20} y1={4} x2={4} y2={20} />
            </svg>
          </button>
        </div>

        {/* Nav */}
        <nav className={css.nav}>
          <ul className={css.nav_list}>
            {navItems.map(({ label, href }) => {
              const isActive =
                href === '/home'
                  ? pathname === '/home' || pathname === '/'
                  : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${css.nav_item} ${isActive ? css.nav_item_active : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Auth / cart actions */}
        <div className={css.actions}>
          {isAuthenticated ? (
            <>
              <Link href="/cart" className={css.cart_link} onClick={onClose}>
                <svg
                  width={22}
                  height={22}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1={3} y1={6} x2={21} y2={6} />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className={css.cart_badge}>{cartCount}</span>
                )}
              </Link>
              <button className={css.logout_btn} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/register"
                className={css.register_btn}
                onClick={onClose}
              >
                Register
              </Link>
              <Link href="/login" className={css.login_btn} onClick={onClose}>
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
