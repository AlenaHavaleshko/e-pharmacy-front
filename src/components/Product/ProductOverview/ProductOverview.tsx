'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/src/lib/store/authStore';
import { addToCart } from '@/src/lib/api/clientApi';
import AuthModal from '@/src/components/Medicine/AuthModal/AuthModal';
import type { Product } from '@/src/types/product';
import styles from './ProductOverview.module.css';

interface ProductOverviewProps {
  product: Product;
}

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(Math.max(0, Math.min(5, rating)));
  return (
    <div className={styles.stars} aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < stars ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function ProductOverview({ product }: ProductOverviewProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    try {
      await addToCart(product._id ?? product.id, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {
      // silently fail — could toast here
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={product.photo}
            alt={product.name}
            fill
            sizes="(max-width: 767px) 100vw, 320px"
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h1 className={styles.name}>{product.name}</h1>
            <span className={styles.price}>&#2547;{product.price}</span>
          </div>

          <p className={styles.brand}>
            <span className={styles.brandLabel}>Brand:</span>{' '}
            {product.suppliers}
          </p>

          {product.rating != null && <StarRating rating={product.rating} />}

          <div className={styles.actions}>
            <div className={styles.quantityRow}>
              <button
                className={styles.qtyBtn}
                onClick={decrement}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button
                className={styles.qtyBtn}
                onClick={increment}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              className={styles.cartButton}
              type="button"
              disabled={loading || added}
              onClick={handleAddToCart}
            >
              {added ? 'Added!' : loading ? 'Adding…' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}
