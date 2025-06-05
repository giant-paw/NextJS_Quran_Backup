'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Doa } from '@/models/doaModel';

interface DoaClientProps {
  doa: Doa | Doa[];
}

const DoaClient: React.FC<DoaClientProps> = ({ doa }) => {
  const doaArray = Array.isArray(doa) ? doa : [doa];
  const selected = doaArray[0]; // hanya tampilkan 1 doa

  // Cari index saat ini & doa berikutnya
  const currentIndex = doaArray.findIndex((d) => d.id === selected.id);
  const nextDoa = doaArray[currentIndex + 1];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--birutua)] px-4">
      <div className="max-w-4xl w-full">

        {/* Header navigasi atas */}
        <div className="flex justify-between items-center mb-6">
          {/* Tombol Kembali */}
          <Link
            href="/doa"
            className="flex items-center text-[var(--birupolarius)] hover:text-white transition"
          >
            <FaArrowLeft className="mr-2" />
            <span className="text-lg font-regular">Doa</span>
          </Link>

          {/* Tombol Selanjutnya */}
          {nextDoa && (
            <Link
              href={`/doa/${nextDoa.id}`}
              className="flex items-center text-[var(--birupolarius)] hover:text-white transition"
            >
              <span className="text-lg font-regular mr-2">Selanjutnya: {nextDoa.doa}</span>
              <FaArrowRight />
            </Link>
          )}
        </div>

        {/* Card Doa */}
        <div
          key={selected.id}
          className="rounded-lg p-6 bg-[var(--birumuda)] shadow-lg relative overflow-hidden"
        >
          {/* Header: Nomor dan Nama Doa */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-[var(--biruagaktua)] transform rotate-45 flex items-center justify-center shrink-0 mr-6 rounded-lg transition-all duration-300">
              <span className="transform -rotate-45 text-lg font-regular text-[var(--birupolarius)]">
                {selected.id}
              </span>
            </div>
            <h1 className="text-3xl font-regular text-[var(--birupolarius)] truncate">
              {selected.doa}
            </h1>
          </div>

          {/* Arabic Text */}
          <div className="p-6 rounded-lg mb-6 text-right font-arab text-3xl leading-relaxed text-[var(--putih)] select-text">
            {selected.ayat}
          </div>

          {/* Latin Transliteration */}
          <div className="italic text-[var(--birupolarius)] text-lg mb-4 select-text">
            {selected.latin}
          </div>

          {/* Arti / Terjemahan */}
          <p className="text-white text-base leading-relaxed select-text">
            {selected.artinya}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoaClient;
