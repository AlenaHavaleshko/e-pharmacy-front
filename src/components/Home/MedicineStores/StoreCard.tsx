import Link from 'next/link';
import styles from './StoreCard.module.css';

interface StoreCardProps {
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  status: 'OPEN' | 'CLOSED';
  storeId: string;
}

export const StoreCard = ({
  name,
  address,
  city,
  phone,
  rating,
  status,
  storeId,
}: StoreCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{name}</h3>

      <ul className={styles.info}>
        <li className={styles.infoItem}>
          <svg
            className={styles.icon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
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
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.21 2.2z"
              fill="currentColor"
            />
          </svg>
          <span>{phone}</span>
        </li>
      </ul>

      <div className={styles.footer}>
        <Link href={`/store/${storeId}`} className={styles.visitBtn}>
          Visit Store
        </Link>
        <div className={styles.meta}>
          <span className={styles.rating}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating}
          </span>
          <span
            className={`${styles.badge} ${status === 'OPEN' ? styles.open : styles.closed}`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
