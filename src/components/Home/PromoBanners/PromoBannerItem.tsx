import Link from 'next/link';
import styles from './PromoBannerItem.module.css';

interface PromoBannerItemProps {
  index: number;
  title: string;
  value: string;
  buttonLabel: string;
  href: string;
}

export default function PromoBannerItem({
  index,
  title,
  value,
  buttonLabel,
  href,
}: PromoBannerItemProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.index}>{index}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.content}>
        <p className={styles.value}>{value}</p>
        <Link href={href} className={styles.button}>
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
