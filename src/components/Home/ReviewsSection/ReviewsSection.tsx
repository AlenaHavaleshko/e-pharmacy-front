'use client';

import { useEffect, useState } from 'react';
import styles from './ReviewsSection.module.css';
import { ReviewCard } from './ReviewCard';
import { getReviews } from '@/src/lib/store/review';

import type { Review } from '@/src/types/review';

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
     const fetchReviews = async () => {
      const data = await getReviews();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Reviews</h2>
        <p className={styles.subtitle}>Search for Medicine, Filter by your location</p>
      </div>
      <ul className={styles.list}>
        {reviews.map((review, index) => (
          <ReviewCard
            key={review._id ?? index}
            name={review.name}
            testimonial={review.testimonial}
            avatar={review.avatar}
          />
        ))}
      </ul>
    </section>
  );
} 