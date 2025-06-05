import { AsmaulHusna } from '@/models/AsmaulModel';
import { Doa } from '@/models/doaModel';

const ASMAUL_URL = 'https://asmaul-husna-api.vercel.app';

export const fetchAllAsmaulHusna = async (): Promise<AsmaulHusna[]> => {
  try {
    const res = await fetch(`${ASMAUL_URL}/api/all`);
    const json = await res.json();

    return json.data as AsmaulHusna[];
  } catch (error) {
    console.error("Gagal fetch Asmaul Husna:", error);
    return [];
  }
};
