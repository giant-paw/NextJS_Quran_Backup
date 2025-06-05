import { FC } from 'react';
import { SurahSummary } from '../models/surahModel';
import Link from 'next/link';

interface SurahCardProps {
  surah: SurahSummary;
}

const SurahCard: FC<SurahCardProps> = ({ surah }) => (
  <Link
    href={`/surah/${surah.nomor}`}
    className="block h-full"
  >
    <div className="h-full flex items-center bg-[var(--birumuda)] p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 group relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>
      
      {/* Left: Diamond with number */}
      <div className="relative z-10">
        <div className="w-12 h-12 bg-[var(--biruagaktua)] transform rotate-45 flex items-center justify-center shrink-0 mr-6 rounded-lg transition-all duration-300 group-hover:bg-[var(--birupolarius)] group-hover:scale-110">
          <span className="transform -rotate-45 text-lg font-medium text-[var(--birupolarius)] group-hover:text-[var(--biruagaktua)]">{surah.nomor}</span>
        </div>
      </div>
      
      {/* Right: Two columns */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-w-0 z-10">
        {/* Column 1: Latin name & meaning */}
        <div className="min-w-0">
          <h3 className="text-lg font-medium text-[var(--birupolarius)] mb-1 truncate group-hover:translate-x-1 transition-transform duration-300">{surah.namaLatin}</h3>
          <p className="font-medium text-sm text-white truncate group-hover:translate-x-1 transition-all duration-300 group-hover:text-white">{surah.arti}</p>
        </div>
        
        {/* Column 2: Arabic name & verse count */}
        <div className="text-right min-w-0">
          <p className="text-2xl font-arab font-medium text-[var(--birupolarius)] mr-0.5 truncate font-arab group-hover:-translate-x-1 transition-transform duration-300">{surah.nama}</p>
          <div className="flex items-center justify-end space-x-1">
            <span className="inline-flex items-center justify-center bg-[var(--biruagaktua)] px-2 py-1 rounded-lg text-xs text-white font-medium group-hover:bg-[var(--birupolarius)] group-hover:text-[var(--biruagaktua)] group-hover:-translate-x-1 transition-all duration-300">
              {surah.jumlahAyat} Ayat
            </span>
          </div>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-[var(--birupolarius)] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
    </div>
  </Link>
);

export default SurahCard;