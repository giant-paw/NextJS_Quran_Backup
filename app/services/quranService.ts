// services/quranService.ts
import { SurahSummary, SurahDetail } from '../models/surahModel';

const BASE_URL = 'https://equran.id/api/v2';

export const fetchAllSurahs = async (): Promise<SurahSummary[]> => {
  const res = await fetch(`${BASE_URL}/surat`);
  const json = await res.json();
  return json.data as SurahSummary[];
}

export const fetchSurahById = async (id: number): Promise<SurahDetail> => {
  const res = await fetch(`${BASE_URL}/surat/${id}`);
  const json = await res.json();
  return json.data as SurahDetail;
}

export const searchSurah = async (nama: string | number): Promise<SurahDetail> => {
  const res = await fetch(`${BASE_URL}/surat/${nama}`);
  const json = await res.json();
  return json.data as SurahDetail;
}

export const QORI_MAP: Record<string, string> = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman As-Sudais",
  "04": "Ibrahim Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
};
