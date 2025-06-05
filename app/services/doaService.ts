import { Doa } from '@/models/doaModel';

const DOA_URL = 'https://doa-doa-api-ahmadramadhan.fly.dev';

export const fetchAllDoa = async (): Promise<Doa[]> => {
  try {
    const res = await fetch(`${DOA_URL}/api`);
    const json = await res.json();

    // // DEBUG
    // console.log("Response Doa API:", json);

    return json as Doa[];
  } catch (error) {
    console.error("Gagal fetch doa:", error);
    return []; // selalu return array aman
  }
};

export const fetchDoaById = async (id: number): Promise<Doa> => {
  const res = await fetch(`${DOA_URL}/api/${id}`);
  const json = await res.json();
  return json as Doa;
};


