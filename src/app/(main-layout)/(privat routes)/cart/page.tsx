import CartPage from '@/src/components/Cart/CartPage';

export const metadata = { title: 'Cart — E-Pharmacy' };

export default function Page() {
  return (
    <main>
      <div className="container">
        <CartPage />
      </div>
    </main>
  );
}
