import MedicineStore from '@/src/components/Medicine/MedicineStore/MedicineStore';

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export default async function MedicinePage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  return <MedicineStore searchParams={resolvedParams} />;
}
