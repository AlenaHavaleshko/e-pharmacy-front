'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product, ProductReview } from '@/src/types/product';
import styles from './TabsContainer.module.css';

interface TabsContainerProps {
  product: Product;
}

const REVIEWS_PER_PAGE = 4;

const TWO_DAYS_AGO = new Date(
  Date.now() - 2 * 24 * 60 * 60 * 1000,
).toISOString();

const FALLBACK_REVIEWS: ProductReview[] = [
  {
    _id: 'mock-1',
    name: 'Leroy Jenkins',
    rating: 4,
    date: TWO_DAYS_AGO,
    testimonial:
      "I've been using Moringa powder in my smoothies for a few weeks now. My energy levels are up, and I feel great. I followed the recommended dosage, and it seems to be a perfect addition to my daily routine. Highly recommend!",
    avatar: 'https://i.pravatar.cc/96?img=12',
  },
  {
    _id: 'mock-2',
    name: 'Leroy Jenkins',
    rating: 4,
    date: TWO_DAYS_AGO,
    testimonial:
      "I tried Moringa capsules as part of my wellness regimen, and I've been pleasantly surprised by the results. My skin looks healthier, and I've noticed an improvement in my digestion. A natural and effective supplement!",
    avatar: 'https://i.pravatar.cc/96?img=5',
  },
  {
    _id: 'mock-3',
    name: 'Leroy Jenkins',
    rating: 4,
    date: TWO_DAYS_AGO,
    testimonial:
      "I added Moringa oil to my skincare routine, and the results are amazing. My skin feels smoother and more nourished. I was skeptical at first, but now I'm a firm believer in its benefits.",
    avatar: 'https://i.pravatar.cc/96?img=47',
  },
];

const FALLBACK_DESCRIPTION = `Although it's typically considered safe, excessive consumption can lead to side effects. Therefore, it's recommended to consult a healthcare professional before using moringa, especially if you're pregnant, nursing, or taking other medications. This balanced approach allows for the benefits of moringa while recognizing the importance of proper usage and caution.\n\nMedicinal Uses:\nAntioxidant Properties: Moringa is packed with antioxidants that help fight oxidative stress and inflammation in the body.\nAnti-Diabetic Effects: Some studies have shown that moringa leaves might lower blood sugar levels, making it a valuable supplement for managing diabetes.\nHeart Health: The plant has been linked to reduced cholesterol levels, which is vital for heart health.\nAnti-Cancer Properties: Certain compounds in moringa, such as niazimicin, have been found to suppress the growth of cancer cells in laboratory studies.\nImmune Support: With its high vitamin C content, moringa can boost the immune system.\nDigestive Aid: Moringa can help in treating digestive disorders due to its anti-inflammatory properties.`;

/** Renders a single line, bolding everything before the first ":" */
function DescriptionLine({ text }: { text: string }) {
  const colonIdx = text.indexOf(':');
  if (colonIdx === -1 || colonIdx === text.length - 1) {
    return <p className={styles.descriptionText}>{text}</p>;
  }
  const label = text.slice(0, colonIdx + 1);
  const rest = text.slice(colonIdx + 1);
  return (
    <p className={styles.descriptionText}>
      <strong>{label}</strong>
      {rest}
    </p>
  );
}

function DescriptionContent({ text }: { text: string }) {
  const blocks = text.split('\n').filter(Boolean);
  return (
    <div className={styles.descriptionContent}>
      {blocks.map((line, i) => (
        <DescriptionLine key={i} text={line} />
      ))}
    </div>
  );
}

function relativeDate(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days = Math.floor(diff / 86_400_000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } catch {
    return dateStr;
  }
}

function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(Math.max(0, Math.min(5, rating)));
  return (
    <div className={styles.starsRow} aria-label={`Rating: ${rating} out of 5`}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < filled ? styles.starFilled : styles.starEmpty}
          >
            ★
          </span>
        ))}
      </div>
      <span className={styles.ratingNum}>{rating}</span>
    </div>
  );
}

function ReviewCard({ review }: { review: ProductReview }) {
  const dateLabel = review.date ? relativeDate(review.date) : null;
  const initials = review.name
    ? review.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
    : '?';

  return (
    <li className={styles.reviewCard}>
      <div className={styles.reviewTop}>
        {/* Avatar */}
        <div className={styles.avatar}>
          {review.avatar ? (
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              sizes="48px"
              className={styles.avatarImg}
            />
          ) : (
            <span className={styles.avatarInitials}>{initials}</span>
          )}
        </div>

        {/* Name + date */}
        <div className={styles.reviewMeta}>
          <span className={styles.reviewName}>{review.name}</span>
          {dateLabel && <time className={styles.reviewDate}>{dateLabel}</time>}
        </div>

        {/* Stars + number */}
        <StarRating rating={review.rating} />
      </div>

      <p className={styles.reviewText}>{review.testimonial}</p>
    </li>
  );
}

export default function TabsContainer({ product }: TabsContainerProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>(
    'description',
  );
  const [reviewPage, setReviewPage] = useState(1);

  const reviews: ProductReview[] =
    product.reviews && product.reviews.length > 0
      ? product.reviews
      : FALLBACK_REVIEWS;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviews.slice(
    (reviewPage - 1) * REVIEWS_PER_PAGE,
    reviewPage * REVIEWS_PER_PAGE,
  );

  return (
    <div className={styles.container}>
      {/* Tab buttons */}
      <div className={styles.tabList} role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'description'}
          className={`${styles.tab} ${activeTab === 'description' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
          onClick={() => {
            setActiveTab('reviews');
            setReviewPage(1);
          }}
        >
          Reviews
        </button>
      </div>

      {/* Tab content */}
      <div className={styles.tabPanel} role="tabpanel">
        {activeTab === 'description' && (
          <DescriptionContent
            text={product.description ?? FALLBACK_DESCRIPTION}
          />
        )}

        {activeTab === 'reviews' && (
          <div className={styles.reviewsContent}>
            {reviews.length === 0 ? (
              <p className={styles.empty}>No reviews yet.</p>
            ) : (
              <>
                <ul className={styles.reviewList}>
                  {paginatedReviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </ul>

                {totalPages > 1 && (
                  <nav
                    className={styles.pagination}
                    aria-label="Reviews pagination"
                  >
                    <button
                      className={styles.pageBtn}
                      onClick={() => setReviewPage((p) => Math.max(1, p - 1))}
                      disabled={reviewPage === 1}
                      aria-label="Previous page"
                    >
                      &#8249;
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          className={`${styles.pageBtn} ${page === reviewPage ? styles.pageBtnActive : ''}`}
                          onClick={() => setReviewPage(page)}
                          aria-current={
                            page === reviewPage ? 'page' : undefined
                          }
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      className={styles.pageBtn}
                      onClick={() =>
                        setReviewPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={reviewPage === totalPages}
                      aria-label="Next page"
                    >
                      &#8250;
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
