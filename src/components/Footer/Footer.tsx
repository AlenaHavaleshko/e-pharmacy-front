import css from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={css.footer}>
      <div className="container">
        <div className={css.footer_container}>
          <div className={css.footer_wrapper}>
            <div className={css.logo_text}>
              <div className={css.logo}>
                <Link href="/">
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet="/logo/logo.white.mob.jpg"
                    />
                    <source
                      media="(max-width: 1440px)"
                      srcSet="/logo/logo.white.desk.jpg"
                    />
                    <img
                      className={css.image}
                      src="/logo/logo.white.desk.jpg"
                      alt="logo"
                    />
                  </picture>
                </Link>
                <Link className={css.link_text} href="/">
                  E-Pharmacy
                </Link>
              </div>
              <p className={css.text}>
                Get the medicine to help you feel better, get back to your
                active life, and enjoy every moment.
              </p>
            </div>
            <div className={css.footer_nav_link}>
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
              <ul className={css.link_list}>
                <li className={css.link_item}>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className={css.link_icon} width={28} height={28}>
                      <use href="/sprite.svg#icon-facebook" />
                    </svg>
                  </a>
                </li>
                <li className={css.link_item}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className={css.link_icon} width={28} height={28}>
                      <use href="/sprite.svg#icon-instagram" />
                    </svg>
                  </a>
                </li>
                <li className={css.link_item}>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className={css.link_icon} width={28} height={28}>
                      <use href="/sprite.svg#icon-youtube" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={css.footer_info}>
            <p className={css.text_policy}>
              © E-Pharmacy 2023. All Rights Reserved
              <span className={css.span_text}>|</span> Privacy Policy
              <span className={css.span_text}>|</span> Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
