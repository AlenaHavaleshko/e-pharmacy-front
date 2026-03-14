'use client';

import Image from 'next/image';
import styles from './ReviewCard.module.css';

console.log(styles);

export interface ReviewCardProps {
  name: string;
  testimonial: string;
  avatar?: string;
}

export const ReviewCard = ({
  name,
  testimonial,
  avatar = '/default-avatar.png',
}: ReviewCardProps) => {
  return (
    <li className={styles.card}>
      <div className={styles.avatarWrapper}>
        <Image
          src={avatar}
          alt={name}
          width={60}
          height={60}
          className={styles.avatar}
        />
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.testimonial}>{testimonial}</p>
    </li>
  );
};
