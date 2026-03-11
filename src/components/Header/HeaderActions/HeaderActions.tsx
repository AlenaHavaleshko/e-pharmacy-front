import Link from 'next/link';
import css from './HeaderActions.module.css';

interface HeaderActionsProps {
  isAuthenticated: boolean;
}

export default function HeaderActions({ isAuthenticated }: HeaderActionsProps) {
  if (isAuthenticated) {
    return (
      <div className={css.actions}>
        <Link href="/cart" className={css.cart_btn} aria-label="Cart">
          <svg width={18} height={18} aria-hidden="true">
            <use href="/sprite.svg#icon-cart" />
          </svg>
          <span className={css.cart_badge}>0</span>
        </Link>

        <Link href="/profile" className={css.user_btn} aria-label="Profile">
          <svg width={18} height={18} aria-hidden="true">
            <use href="/sprite.svg#icon-user" />
          </svg>
        </Link>

        <span className={css.divider} aria-hidden="true" />

        <form action="/api/user/logout" method="POST">
          <button className={css.logout_btn} type="submit">
            Log out
          </button>
        </form>
      </div>
    );
  }

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
