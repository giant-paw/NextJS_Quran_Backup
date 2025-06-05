import axios from "axios";
import { Tafsir } from '@/models/tafsirModel';

const TAFSIR_URL = "https://equran.id/api/v2";

export const fetchTafsirByNomor = async (nomor: number): Promise<Tafsir[]> => {
  const res = await axios.get(`${TAFSIR_URL}/tafsir/${nomor}`);
  return res.data.data.tafsir as Tafsir[]; 
};
