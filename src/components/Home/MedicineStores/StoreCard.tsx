import Image from 'next/image';
import styles from './StoreCard.module.css';

interface StoreCardProps {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  status: 'OPEN' | 'CLOSE';
  storeId: string;
  variant?: 'home' | 'stores';
}

export const StoreCard = ({
  name,
  address,
  city,
  phone,
  rating,
  status,
  variant = 'home',
}: StoreCardProps) => {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {variant === 'stores' && (
        <div className={styles.decor} aria-hidden>
          <Image
            src="/home-nearest/Rectangle 42212.png"
            alt=""
            fill
            className={styles.decor_img}
          />
          <Image
            src="/home-nearest/Rectangle 42213.png"
            alt=""
            fill
            className={styles.decor_img}
          />
          <Image
            src="/home-nearest/Rectangle 42214.png"
            alt=""
            fill
            className={styles.decor_img}
          />
        </div>
      )}
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>

        {/* // for home page */}
        {variant === 'home' && (
          <div className={styles.meta}>
            <span className={styles.rating}>
              <svg
                className={styles.star}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              {rating}
            </span>
            {status && (
              <div
                className={`${styles.badge} ${status === 'OPEN' ? styles.open : styles.closed}`}
              >
                {status}
              </div>
            )}
          </div>
        )}
      </div>

      <ul className={styles.info}>
        <li className={styles.infoItem}>
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <use href="/sprite.svg#icon-map"></use>
          </svg>
          <span>
            {address}
            <br />
            {city}
          </span>
        </li>
        <li className={styles.infoItem}>
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <use href="/sprite.svg#icon-phone"></use>
          </svg>
          <span>{phone}</span>
        </li>
      </ul>
      {/* // for medicine store page */}
      {variant === 'stores' && (
        <div className={styles.footer}>
          <button className={styles.visitButton}>Visit Store</button>

          <div className={styles.meta}>
            <span className={styles.rating}>
              <svg
                className={styles.star}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <use href="/sprite.svg#icon-star"></use>
              </svg>
              {rating}
            </span>

            <span
              className={`${styles.badge} ${
                status === 'OPEN' ? styles.open : styles.closed
              }`}
            >
              {status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
