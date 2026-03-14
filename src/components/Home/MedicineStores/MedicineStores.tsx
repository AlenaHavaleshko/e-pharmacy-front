import styles from './MedicineStores.module.css';
import { StoreCard } from './StoreCard';
import { fetchStoresNearest } from '@/src/lib/api/serverApi';
import type { Store } from '@/src/types/store';

export const MedicineStores = async () => {
 const stores: Store[] = await fetchStoresNearest();

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your Nearest Medicine Store</h2>
        <p className={styles.subtitle}>
          Search for Medicine, Filter by your location
        </p>
      </div>
      <ul className={styles.grid}>
        {stores.slice(0, 6).map((store) => (
          <li key={store._id}>
            <StoreCard
              name={store.name}
              address={store.address}
              city={store.city}
              phone={store.phone}
              rating={store.rating}
              status={store.status}
              storeId={store._id}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
