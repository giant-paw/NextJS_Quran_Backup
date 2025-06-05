// controllers/quranController.ts
import { fetchAllSurahs, fetchSurahById } from '../services/quranService';
import { SurahSummary, SurahDetail } from '../models/surahModel';

export async function getAllSurahs(): Promise<SurahSummary[]> {
  return await fetchAllSurahs();
}

export async function getSurahById(id: number): Promise<SurahDetail> {
  return await fetchSurahById(id);
}
