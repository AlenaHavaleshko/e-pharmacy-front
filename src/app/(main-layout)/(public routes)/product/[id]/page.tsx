import { notFound } from 'next/navigation';
import { fetchProductById } from '@/src/lib/api/serverApi';
import ProductOverview from '@/src/components/Product/ProductOverview/ProductOverview';
import TabsContainer from '@/src/components/Product/TabsContainer/TabsContainer';
import styles from './product.module.css';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <section className={styles.page}>
      <ProductOverview product={product} />
      <TabsContainer product={product} />
    </section>
  );
}
