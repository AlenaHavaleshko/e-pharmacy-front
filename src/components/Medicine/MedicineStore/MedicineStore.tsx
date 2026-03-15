import { Suspense } from 'react';
import Title from '../Title/Title';
import { Filter } from '../Filter/Filter';
import styles from './MedicineStore.module.css';

export default function MedicineStore() {
  return (
    <section className={styles.section}>
      <Title text="Medicine" />
      <Suspense fallback={null}>
        <Filter />
      </Suspense>
    </section>
  );
}
