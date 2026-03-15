import { Suspense } from 'react';
import Title from '../Title/Title';
import { Filter } from '../Filter/Filter';
import { MedicineCard } from '../MedicineCard/MedicineCard';
import Pagination from '../Pagination/Pagination';
import { fetchCategories, fetchProducts } from '@/src/lib/api/serverApi';
import styles from './MedicineStore.module.css';

const PAGE_SIZE = 12;

interface MedicineStoreProps {
  searchParams: { category?: string; search?: string; page?: string };
}

export default async function MedicineStore({
  searchParams,
}: MedicineStoreProps) {
  const page = Math.max(1, Number(searchParams.page) || 1);

  const [categories, allProducts] = await Promise.all([
    fetchCategories(),
    fetchProducts({
      category: searchParams.category,
      search: searchParams.search,
    }),
  ]);

  const totalPages = Math.ceil(allProducts.length / PAGE_SIZE);
  const products = allProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className={styles.section}>
      <Title text="Medicine" />
      <Suspense fallback={null}>
        <Filter categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <p className={styles.empty}>Nothing was found for your request</p>
      ) : (
        <ul className={styles.grid}>
          {products.map((product) => (
            <MedicineCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              suppliers={product.suppliers}
              photo={product.photo}
            />
          ))}
        </ul>
      )}

      <Suspense fallback={null}>
        <Pagination currentPage={page} totalPages={totalPages} />
      </Suspense>
    </section>
  );
}
