'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function getPageWindow(current: number, total: number): (number | '...')[] {
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);

  // 3-page sliding window clamped to valid range
  let start = Math.max(1, current - 1);
  let end = start + 2;
  if (end > total) {
    end = total;
    start = Math.max(1, end - 2);
  }

  const pages: (number | '...')[] = [];
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total) pages.push('...');

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageWindow = getPageWindow(currentPage, totalPages);

  return (
    <nav className={styles.nav} aria-label="Pagination">
      {/* First */}
      <button
        className={styles.btn}
        onClick={() => goTo(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        &#171;
      </button>

      {/* Prev */}
      <button
        className={styles.btn}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        &#8249;
      </button>

      {/* Page numbers + ellipsis */}
      {pageWindow.map((item, idx) =>
        item === '...' ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            className={`${styles.btn} ${item === currentPage ? styles.active : ''}`}
            onClick={() => goTo(item)}
            aria-current={item === currentPage ? 'page' : undefined}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        className={styles.btn}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        &#8250;
      </button>

      {/* Last */}
      <button
        className={styles.btn}
        onClick={() => goTo(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        &#187;
      </button>
    </nav>
  );
}
