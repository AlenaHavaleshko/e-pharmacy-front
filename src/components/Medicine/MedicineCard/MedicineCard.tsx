'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/src/lib/store/authStore';
import { addToCart } from '@/src/lib/api/clientApi';
import AuthModal from '../AuthModal/AuthModal';
import styles from './MedicineCard.module.css';

export interface MedicineCardProps {
  id: string;
  name: string;
  price: number;
  suppliers: string;
  photo: string;
}

export const MedicineCard = ({
  id,
  name,
  price,
  suppliers,
  photo,
}: MedicineCardProps) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setLoading(true);
    try {
      await addToCart(id, 1);
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
      <li className={styles.card}>
        <div className={styles.imageWrapper}>
          <Image
            src={photo}
            alt={name}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <span className={styles.price}>&#2547;{price}</span>
          </div>
          <p className={styles.suppliers}>{suppliers}</p>

          <div className={styles.actions}>
            <button
              className={styles.cartButton}
              type="button"
              disabled={loading || added}
              onClick={handleAddToCart}
            >
              {added ? 'Added!' : loading ? 'Adding…' : 'Add to cart'}
            </button>
            <Link href={`/product/${id}`} className={styles.detailsLink}>
              Details
            </Link>
          </div>
        </div>
      </li>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};
