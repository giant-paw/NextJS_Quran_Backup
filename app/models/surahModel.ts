// models/surahModel.ts

export interface Audio {
  [kode: string]: String;
}

export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Audio;
}

export interface SurahSummary {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

export interface SurahDetail extends SurahSummary {
  deskripsi: string;
  ayat: Ayat[];
  suratSelanjutnya: Omit<SurahSummary, 'tempatTurun' | 'arti'>;
  suratSebelumnya: Omit<SurahSummary, 'tempatTurun' | 'arti'>;
}

export interface QuranResponse {
  code: number;
  message: string;
  data: SurahDetail[];
}
