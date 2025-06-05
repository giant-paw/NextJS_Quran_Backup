import { fetchTafsirByNomor } from '@/services/tafsirService';
import { Tafsir } from '@/models/tafsirModel';

export const getTafsirByNomor = async (nomor: number): Promise<Tafsir[]> => {
    return await fetchTafsirByNomor(nomor);
}
