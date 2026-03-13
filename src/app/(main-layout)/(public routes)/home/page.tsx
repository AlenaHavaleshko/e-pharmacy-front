import MainBanner from '@/src/components/Home/MainBanner/MainBanner';
import PromoBanners from '@/src/components/Home/PromoBanners/PromoBanners';
import { MedicineStores } from '@/src/components/Home/MedicineStores/MedicineStores';
import AddPharmacyPromo from '@/src/components/Home/AddPharmacyPromo/AddPharmacyPromo';
import { ReviewsSection } from '@/src/components/Home/ReviewsSection/ReviewsSection';

export default function HomePage() {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      <MedicineStores />
      <AddPharmacyPromo />
      <ReviewsSection />
    </>
  );
}
