// app/doa/[id]/page.tsx
import { getDoaById } from '@/controllers/doaController';
import { notFound } from 'next/navigation';
import DoaClient from './DoaClient';

interface Props {
  params: { id: string };
}

export default async function DoaPage({ params }: Props) {
  const { id } = await params;

  if (!id) return <div>Loading...</div>;

  const doa = await getDoaById(Number(id)).catch(() => null);

  if (!doa) return notFound();

  return (
    <div className="container mx-auto">
      {/* Pass doa data to Client Component */}
      <DoaClient doa={doa} />
    </div>
  );
}
