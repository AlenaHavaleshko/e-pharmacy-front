import Link from 'next/link';
import Image from 'next/image';
import HeaderActions from './HeaderActions/HeaderActions';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <div className={css.logo}>
            <Link href="/">
              <Image
                src="/logo/logo.white.mob.png"
                alt="E-Pharmacy logo"
                width={32}
                height={32}
                sizes="(min-width: 768px) 44px, 32px"
                className={css.image}
                priority
              />
            </Link>
            <Link className={css.link_text} href="/">
              E-Pharmacy
            </Link>
          </div>
          <nav className={css.nav}>
            <ul className={css.nav_list}>
              <li className={css.nav_item}>
                <Link href="/home">Home</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/medicine">Medicine</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/statistics">Statistics</Link>
              </li>
            </ul>
          </nav>
          <HeaderActions isAuthenticated={false} />

          <button className={css.burger} type="button" aria-label="Open menu">
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
