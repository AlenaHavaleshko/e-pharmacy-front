'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import HeaderActions from './HeaderActions/HeaderActions';
import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();
  const isHome = pathname === '/home' || pathname === '/';

  return (
    <header className={`${css.header} ${isHome ? '' : css.header_light}`}>
      <div className="container">
        <div className={css.header_container}>
          <div className={css.logo}>
            <Link href="/">
              <Image
                src={isHome ? '/logo/logo.white.mob.png' : '/logo/logo.mob.png'}
                alt="E-Pharmacy logo"
                width={32}
                height={32}
                sizes="(min-width: 768px) 44px, 32px"
                className={css.image}
                priority
              />
            </Link>
            <Link
              className={`${css.link_text} ${isHome ? '' : css.link_text_dark}`}
              href="/"
            >
              E-Pharmacy
            </Link>
          </div>
          <nav className={css.nav}>
            <ul className={css.nav_list}>
              <li className={css.nav_item}>
                <Link href="/home">Home</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/medicine-store">Medicine store</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/medicine">Medicine</Link>
              </li>
            </ul>
          </nav>
          <HeaderActions />

          <button
            className={`${css.burger} ${isHome ? '' : css.burger_dark}`}
            type="button"
            aria-label="Open menu"
          >
            <svg className={css.burger_icon} width={32} height={26}>
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
