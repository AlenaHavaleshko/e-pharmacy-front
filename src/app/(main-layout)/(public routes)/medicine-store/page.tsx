import { StoreCard } from "@/src/components/Home/MedicineStores/StoreCard";
import { fetchStores } from "@/src/lib/api/serverApi";
import type { Store } from "@/src/types/store";
import styles from './medicine-store.module.css';


export default async function MedicineStorePage() {

  const stores: Store[] = await fetchStores();
  console.log(stores);
  return (
    <section>
      <h2>Medicine store</h2>
      <ul className={styles.grid}>
        {stores.slice(0, 6).map((store) => (
          <li key={store._id}>
            <StoreCard
              variant="stores"
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
}
