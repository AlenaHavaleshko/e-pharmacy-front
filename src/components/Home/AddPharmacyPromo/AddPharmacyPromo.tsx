import Image from 'next/image';
import Link from 'next/link';
import styles from './AddPharmacyPromo.module.css';

const features = [
  'Take user orders form online',
  'Create your shop profile',
  'Manage your store',
  'Get more orders',
  'Storage shed',
];

export default function AddPharmacyPromo() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.content}>
          <h2 className={styles.title}>Add your local pharmacy online now</h2>
          <p className={styles.description}>
            Enjoy the convenience of having your prescriptions filled from home
            by connecting with your community pharmacy through our online
            platform.
          </p>
          <Link href="/medicine-store" className={styles.button}>
            Buy medicine
          </Link>
        </div>

        {/* Mobile image */}
        <div className={`${styles.imageWrapper} ${styles.imageMobile}`}>
          <Image
            src="/add-home/add_medecine-mb.jpg"
            alt="Add pharmacy online"
            width={343}
            height={281}
            className={styles.image}
          />
        </div>

        {/* Tablet image */}
        <div className={`${styles.imageWrapper} ${styles.imageTablet}`}>
          <Image
            src="/add-home/add_medecine-tb.jpg"
            alt="Add pharmacy online"
            width={320}
            height={380}
            className={styles.image}
          />
        </div>

        {/* Desktop image */}
        <div className={`${styles.imageWrapper} ${styles.imageDesktop}`}>
          <Image
            src="/add-home/add_medecine-dt.jpg"
            alt="Add pharmacy online"
            width={464}
            height={380}
            className={styles.image}
          />
        </div>
      </div>

      <ul className={styles.featuresList}>
        {features.map((feature) => (
          <li key={feature} className={styles.featureItem}>
            <svg
              className={styles.featureIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9.33333 1.33334L2 9.33334H8L6.66667 14.6667L14 6.66668H8L9.33333 1.33334Z"
                stroke="#59B17A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
