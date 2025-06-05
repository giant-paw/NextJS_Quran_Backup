'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import AsmaulCard from '@/components/AsmaulCard';
import { getAllAsmaulHusna } from '@/controllers/asmaulController';
import { AsmaulHusna } from '@/models/AsmaulModel';

export default function AsmaulHusnaPage() {
  const [asmaulList, setAsmaulList] = useState<AsmaulHusna[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAsmaulHusna();
      setAsmaulList(data);
    };
    fetchData();
  }, []);

  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return asmaulList.filter(
      (item) =>
        item.latin.toLowerCase().includes(query) ||
        item.arab.toLowerCase().includes(query) ||
        item.arti.toLowerCase().includes(query)
    );
  }, [searchTerm, asmaulList]);

  return (
    <main className="w-full mt-15">
      {/* Hero Section */}
      <div
        className="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-[var(--birutua)] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/a2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <h1 className="text-3xl md:text-6xl font-medium text-[var(--birupolarius)] drop-shadow-md">
            Asmaul Husna
          </h1>
        </div>
      </div>

      {/* Daftar Asmaul Husna Section */}
      <div className="container mx-auto px-8 mt-10">
        <div className="flex justify-between items-center mb-2">
          <p className="text-l font-medium text-[var(--birupolarius)]">Asmaul Husna</p>
       
        </div>

        <div className="border-t border-b border-gray-300 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {filtered.length > 0 ? (
              filtered.map((asmaul) => (
                <AsmaulCard key={asmaul.urutan} asmaul={asmaul} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">Tidak ditemukan.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}