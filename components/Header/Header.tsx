import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <div className={css.header}>
      <div className="container">
        <div className={css.header_container}>
          <div className={css.logo}>
            <Link href="/">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/logo/logo.mob.jpg"
                />
                <source
                  media="(max-width: 1440px)"
                  srcSet="/logo/logo.desk.jpg"
                />
                <img
                  className={css.image}
                  src="/logo/logo.desk.jpg"
                  alt="logo"
                />
              </picture>
            </Link>
            <Link className={css.link_text} href="/">
              E-Pharmacy
            </Link>
          </div>
          <nav className={css.nav}>
            <ul className={css.nav_list}>
              <li className={css.nav_item}>
                <Link href="/shop">Shop</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/medicine">Medicine</Link>
              </li>
              <li className={css.nav_item}>
                <Link href="/statistics">Statistics</Link>
              </li>
            </ul>
          </nav>
          <button className={css.log_btn} type="button">
            Log out
          </button>
          <button className={css.burger} type="button">
            <svg className={css.burger_icon} width={32} height={26}>
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
