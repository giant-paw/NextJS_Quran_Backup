// app/surah/[id]/page.tsx (Server Component)
import { getSurahById } from '@/controllers/quranController'; 
import SurahClient from './SurahClient';

interface Props {
  params: { id: string };
}

export default async function SurahPage({ params }: Props) {
  const { id } = await params;
  
  if (!id) return <div>Loading...</div>;

  // Fetching Surah data using the 'id'
  const surah = await getSurahById(Number(id));

  return (
    <div className="container mx-auto">
      {/* Pass surah data to Client Component */}
      <SurahClient surah={surah} />
    </div>
  );
}
