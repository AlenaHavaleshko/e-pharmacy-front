'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import styles from './Filter.module.css';

const CATEGORIES = [
  'Antibiotics',
  'Antiseptics',
  'Cardiovascular',
  'Dermatology',
  'Gastrointestinal',
  'Head',
  'Heart',
  'Hand',
  'Leg',
  'Vitamins & Supplements',
];

export const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') ?? '');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (search.trim()) params.set('search', search.trim());
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFilter();
  };

  return (
    <div className={styles.wrapper}>
      {/* Category select */}
      <div className={styles.selectWrapper}>
        <select
          className={styles.select}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Product category"
        >
          <option value="">Product category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <svg
          className={styles.chevron}
          width="16"
          height="16"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-arrow-down" />
        </svg>
      </div>

      {/* Search input */}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search medicine"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search medicine"
        />
        <svg
          className={styles.searchIcon}
          width="16"
          height="16"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-search" />
        </svg>
      </div>

      {/* Filter button */}
      <button className={styles.button} onClick={handleFilter} type="button">
        <svg
          className={styles.filterIcon}
          width="16"
          height="16"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <use href="/sprite.svg#icon-filter" />
        </svg>
        Filter
      </button>
    </div>
  );
};
