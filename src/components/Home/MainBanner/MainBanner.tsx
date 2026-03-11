import Image from 'next/image';
import styles from './MainBanner.module.css';

export default function MainBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.promoContent}>
        <h1 className={styles.title}>Your medication delivered</h1>
        <p className={styles.subtitle}>
          Say goodbye to all your healthcare worries with us
        </p>
      </div>

      {/* Mobile image */}
      <div className={`${styles.imageWrapper} ${styles.imageMobile}`}>
        <Image
          src="/hero/hero-mb.png"
          alt="Medicine capsules"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>

      {/* Tablet image */}
      <div className={`${styles.imageWrapper} ${styles.imageTablet}`}>
        <Image
          src="/hero/hero-tb.png"
          alt="Medicine capsules"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>

      {/* Desktop image */}
      <div className={`${styles.imageWrapper} ${styles.imageDesktop}`}>
        <Image
          src="/hero/hero-dt.png"
          alt="Medicine capsules"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
      </div>
    </section>
  );
}
