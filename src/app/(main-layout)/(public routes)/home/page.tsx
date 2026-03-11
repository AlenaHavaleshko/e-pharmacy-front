import MainBanner from '@/src/components/Home/MainBanner/MainBanner';
import PromoBanners from '@/src/components/Home/PromoBanners/PromoBanners';
import { MedicineStores } from '@/src/components/Home/MedicineStores/MedicineStores';
export default function HomePage() {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      < MedicineStores />
    </>
  );
}
