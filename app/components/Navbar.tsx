"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { getAllSurahs } from "@/controllers/quranController";
import { SurahSummary } from "@/models/surahModel";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [surahs, setSurahs] = useState<SurahSummary[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<SurahSummary[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await getAllSurahs();
        setSurahs(data);
      } catch (error) {
        console.error("Gagal memuat surah:", error);
      }
    };
    loadSurahs();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Real-time filtering
  useEffect(() => {
    const query = searchTerm.toLowerCase();
    if (!query) {
      setFilteredSurahs([]);
      return;
    }

    const results = surahs.filter((surah) => {
      const name = surah.nama.toLowerCase();
      const latin = surah.namaLatin.toLowerCase();
      const number = surah.nomor.toString();
      return name.includes(query) || latin.includes(query) || number === query;
    });

    setFilteredSurahs(results);
  }, [searchTerm, surahs]);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setSearchTerm("");
    setFilteredSurahs([]);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearchTerm("");
    setFilteredSurahs([]);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled ? "bg-[var(--birumuda)] shadow-md" : "bg-[var(--birumuda)]"
      }`}
    >
      {/* Container utama dengan padding responsive */}
      <div className="mx-auto px-4 py-1 sm:px-6 h-auto lg:px-20 xl:px-20">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-16 relative">
          
          {/* Hamburger menu - kiri */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl sm:text-2xl p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute left-0 top-full mt-2 w-48 bg-white text-gray-800 rounded-xl shadow-xl z-40 transition-all duration-200 ${
                menuOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 invisible"
              }`}
            >
              <Link 
                href="/" 
                className="block px-5 py-3 hover:bg-gray-100 rounded-t-xl" 
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/doa" 
                className="block px-5 py-3 hover:bg-gray-100" 
                onClick={() => setMenuOpen(false)}
              >
                Doa
              </Link>
              <Link 
                href="/asmaul" 
                className="block px-5 py-3 hover:bg-gray-100 rounded-b-xl" 
                onClick={() => setMenuOpen(false)}
              >
                Asmaul Husna
              </Link>
            </div>
          </div>

          {/* Logo - tengah */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <Image 
                src="/assets/logo.png" 
                alt="Logo" 
                width={24} 
                height={24} 
                className="sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px]"
                priority 
              />
              <h2 className="text-lg sm:text-xl font-medium text-white">Qalby</h2>
            </Link>
          </div>

          {/* Search - kanan */}
          <div className="relative flex-shrink-0">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              <div className={`flex items-center transition-all duration-300 ${
                searchOpen ? "w-64 lg:w-80" : "w-8 justify-end"
              }`}>
                {searchOpen && (
                  <input
                    type="text"
                    placeholder="Cari Surah (nama/nomor)"
                    className="w-full p-2 pr-12 rounded-full bg-transparent text-sm text-white placeholder-white/80 border border-white/60 focus:outline-none focus:border-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                )}

                <button
                  onClick={toggleSearch}
                  className={`text-white text-xl focus:outline-none hover:bg-white/10 p-2 rounded-full transition-all ${
                    searchOpen ? "absolute right-1" : "ml-0"
                  }`}
                  aria-label="Toggle search"
                >
                  {searchOpen ? <FaTimes /> : <FaSearch />}
                </button>
              </div>

              {/* Desktop Search Results */}
              {searchOpen && searchTerm && filteredSurahs.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-64 lg:w-80 bg-white rounded-lg shadow-lg max-h-80 overflow-y-auto z-50 text-gray-900">
                  {filteredSurahs.map((surah) => (
                    <Link
                      key={surah.nomor}
                      href={`/surah/${surah.nomor}`}
                      className="block p-4 hover:bg-gray-100 border-b last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                      onClick={closeAllMenus}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{surah.namaLatin}</h3>
                          <p className="text-sm text-gray-600 truncate">
                            {surah.arti} • {surah.jumlahAyat} ayat
                          </p>
                        </div>
                        <span className="text-sm font-mono bg-gray-200 px-2 py-1 rounded ml-2 flex-shrink-0">
                          {surah.nomor}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={toggleSearch}
              className="md:hidden text-white text-xl p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden pb-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Cari Surah (nama/nomor)"
                className="flex-1 p-3 rounded-full bg-white/10 text-white placeholder-white/80 border border-white/30 focus:outline-none focus:border-white text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button
                onClick={toggleSearch}
                className="text-white text-xl p-2 rounded-full hover:bg-white/10 transition-all flex-shrink-0"
                aria-label="Close search"
              >
                <FaTimes />
              </button>
            </div>

            {/* Mobile Search Results */}
            {searchTerm && filteredSurahs.length > 0 && (
              <div className="mt-3 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto text-gray-900">
                {filteredSurahs.map((surah) => (
                  <Link
                    key={surah.nomor}
                    href={`/surah/${surah.nomor}`}
                    className="block p-4 hover:bg-gray-100 border-b last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                    onClick={closeAllMenus}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">{surah.namaLatin}</h3>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {surah.arti} • {surah.jumlahAyat} ayat
                        </p>
                      </div>
                      <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded flex-shrink-0">
                        {surah.nomor}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>


    </nav>
  );
};

export default Navbar;