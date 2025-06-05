'use client';

import { useState, useEffect } from 'react';
import SurahCard from '@/components/SurahCard';
import { getAllSurahs } from '@/controllers/quranController';
import { SurahSummary } from './models/surahModel';

export default function HomePage() {
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllSurahs().then(setSurahs);
  }, []);

  return (
    <main className="w-full mt-15">
      {/* Hero Section */}
      <div
        className="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-[var(--birutua)] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/q3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <h1 className="text-3xl md:text-6xl font-medium text-[var(--birupolarius)] drop-shadow-md mb-4">
            Qalby
          </h1>
          
          {/* Search */}
          <div className="w-full max-w-xl">
            <div className="flex items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl px-6 py-2">
              <svg
                className="h-5 w-5 text-white/80 mr-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Cari Surah..."
                className="flex-grow outline-none text-sm text-white placeholder-white/70 bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Daftar Surah Section */}
      <div className="container mx-auto px-8 mt-10">
        <div className="flex justify-between items-center mb-2">
          <p className="text-l font-medium text-[var(--birupolarius)]">Surah</p>
      
        </div>

        <div className="border-t border-b border-gray-300 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {surahs
              .filter((surah) => {
                const q = searchTerm.toLowerCase();
                return (
                  surah.nama.toLowerCase().includes(q) ||
                  surah.namaLatin.toLowerCase().includes(q) ||
                  surah.nomor.toString().includes(q)
                );
              })
              .map((surah) => (
                <SurahCard key={surah.nomor} surah={surah} />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}