"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SurahSummary } from "@/models/surahModel";

interface SidebarProps {
  allSurah: SurahSummary[];
  selectedSurahNomor: number;
  jumlahAyat?: number;
  onClickAyat?: (nomor: number) => void;
}

const Sidebar = ({
  allSurah,
  selectedSurahNomor,
  jumlahAyat,
  onClickAyat,
}: SidebarProps) => {
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [activeAyatNomor, setActiveAyatNomor] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchAyatQuery, setSearchAyatQuery] = useState("");

  const topOffsetValueRem = "70px";
  const sidebarContentWidthPx = "250px";

  useEffect(() => {
    const handleScroll = () => {
      const offsetFromBottom = 200; // Ubah dari 50 ke 200px
      const isNearBottomNow =
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - offsetFromBottom;
      setIsNearBottom(isNearBottomNow);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAyatClick = (nomor: number) => {
    setActiveAyatNomor(nomor);
    if (onClickAyat) {
      onClickAyat(nomor);
    }
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const filteredSurahs = allSurah.filter((surah) =>
    surah.namaLatin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  let filteredAyatNumbers: number[] = [];
  if (jumlahAyat) {
    const allAyatNumbers = Array.from({ length: jumlahAyat }, (_, i) => i + 1);
    if (searchAyatQuery === "") {
      filteredAyatNumbers = allAyatNumbers;
    } else {
      filteredAyatNumbers = allAyatNumbers.filter((nomor) =>
        String(nomor).includes(searchAyatQuery)
      );
    }
  }

  // Tidak perlu lagi variabel sidebarHeight karena sudah dipindah ke parent container

  return (
    <>
      <div
        className={`fixed z-40 flex items-start transition-all duration-500 ease-in-out`}
        style={{
          top: topOffsetValueRem,
          left: "0",
          height: isNearBottom ? "825px" : `calc(100vh - ${topOffsetValueRem})`,
        }}
      >
        <aside
          className={`bg-[var(--birutua)] text-white flex flex-col transition-all duration-500 ease-in-out overflow-hidden relative`}
          style={{
            width: isOpen ? sidebarContentWidthPx : "0px",
            paddingLeft: isOpen ? "1rem" : "0",
            height: "100%", // Gunakan tinggi penuh dari parent container
            borderRight: "1px solid rgba(0, 150, 255, 0.2)",
          }}
        >
          {/* Animated tech pattern background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(0, 150, 255, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(0, 200, 255, 0.2) 0%, transparent 50%),
                  linear-gradient(45deg, transparent 48%, rgba(0, 150, 255, 0.1) 49%, rgba(0, 150, 255, 0.1) 51%, transparent 52%),
                  linear-gradient(-45deg, transparent 48%, rgba(0, 200, 255, 0.05) 49%, rgba(0, 200, 255, 0.05) 51%, transparent 52%)
                `,
                backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px'
              }}
            />
          </div>

          {/* Circuit-like decorative elements */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
        
          </div>

          <div
            className={`flex flex-row flex-grow overflow-hidden h-full ${
              isOpen ? "opacity-100" : "opacity-0"
            } transition-all duration-500 ease-in-out relative z-10`}
            style={{
              transitionDelay: isOpen ? "100ms" : "0ms",
              visibility: isOpen ? "visible" : "hidden",
            }}
          >
            <div className={`w-[140px] p-4 flex flex-col text-lg`}>
              <h2 className="ml-2 text-xl font-medium mb-2 text-[var(--birupolarius)] sticky top-0  py-2 z-10 relative">
                <span className="relative">
                  Surah
                  <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                </span>
              </h2>
              <div className="mb-2 px-1 sticky top-[calc(2.5rem+1rem)] py-1 z-10">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Surah"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-2 pl-8 rounded-lg bg-[var(--biruagaktua)] text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-opacity-80 transition-all duration-200 border border-transparent hover:border-cyan-400/30"
                    style={{
                      backdropFilter: "blur(5px)",
                      boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)"
                    }}
                  />
                  <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <ul className="space-y-1 font-medium flex-grow overflow-y-auto scrollbar-hide">
                {filteredSurahs.length > 0 ? (
                  filteredSurahs.map((surah, index) => (
                    <li key={surah.nomor} style={{ animationDelay: `${index * 20}ms` }} className="animate-fadeInUp">
                      <Link href={`/surah/${surah.nomor}`} passHref>
                        <span
                          className={`block px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm relative group ${
                            selectedSurahNomor === surah.nomor
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-400/30 shadow-lg shadow-cyan-500/10"
                              : "hover:text-[var(--putih)] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-400/20 hover:shadow-md hover:shadow-cyan-500/5"
                          }`}
                        >
                          <span className="relative z-10 flex items-center">
                            <span className="text-cyan-400 opacity-70 mr-2 text-xs font-mono">{String(surah.nomor).padStart(3, '0')}</span>
                            <span className="truncate">{surah.namaLatin}</span>
                          </span>
                          {selectedSurahNomor === surah.nomor && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="px-3 py-2 text-sm text-gray-400 italic">
                    Surah tidak ditemukan.
                  </li>
                )}
              </ul>
            </div>

            <div className="w-px my-4 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent"></div>
            </div>

            {jumlahAyat && onClickAyat && (
              <div className={`w-[85px] p-4 flex flex-col text-lg`}>
                <h2 className="ml-2 text-xl font-medium mb-2 text-[var(--birupolarius)] sticky top-0  py-2 z-10 relative">
                  <span className="relative">
                    Ayat
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
                  </span>
                </h2>
                <div className="mb-2 px-1 sticky top-[calc(2.5rem+1rem)]  py-1 z-10">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder=""
                      value={searchAyatQuery}
                      onChange={(e) => setSearchAyatQuery(e.target.value)}
                      className="w-full p-2 pl-7 rounded-lg bg-[var(--biruagaktua)] text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-opacity-80 transition-all duration-200 border border-transparent hover:border-cyan-400/30"
                      style={{
                        backdropFilter: "blur(5px)",
                        boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)"
                      }}
                    />
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-60">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <ul className="space-y-1 mt-0 font-medium flex-grow overflow-y-auto scrollbar-hide">
                  {filteredAyatNumbers.length > 0 ? (
                    filteredAyatNumbers.map((nomor, index) => {
                      const isActive = activeAyatNomor === nomor;
                      return (
                        <li
                          key={nomor}
                          onClick={() => handleAyatClick(nomor)}
                          style={{ animationDelay: `${index * 10}ms` }}
                          className={`cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 text-sm relative group animate-fadeInUp ${
                            isActive
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border border-cyan-400/30 shadow-lg shadow-cyan-500/10"
                              : "hover:text-[var(--putih)] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:border hover:border-cyan-400/20 hover:shadow-md hover:shadow-cyan-500/5"
                          }`}
                        >
                          <span className="relative z-10 font-mono text-center block">{nomor}</span>
                          {isActive && (
                            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li className="px-3 py-2 text-sm text-gray-400 italic text-center">
                      Tidak ditemukan.
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </aside>

        <div className="h-full  flex items-start transition-all duration-500 ease-in-out">
          <button
            onClick={toggleSidebar}
            className={`mt-4 ml-4 h-12 w-12 p-3 bg-[var(--biruagaktua)] text-[var(--putih)] font-medium hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-blue-500/20 hover:text-cyan-200 transition-all duration-500 rounded-lg flex items-center justify-center focus:outline-none group relative overflow-hidden border border-transparent hover:border-cyan-400/30`}
            aria-label={isOpen ? "Tutup sidebar" : "Buka sidebar"}
            style={{
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
            <Image
              src="/assets/logo.png"
              alt="Logo Quran"
              width={30}
              height={30}
              className={`transition-all duration-300 group-hover:scale-110 relative z-10 filter group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.3)]`}
            />
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Sidebar;