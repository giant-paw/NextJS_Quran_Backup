"use client";

import { getTafsirByNomor } from "@/controllers/tafsirController";
import { Tafsir } from "@/models/tafsirModel";
import { useRef, useState, useEffect } from "react";
import { SurahDetail, Ayat, SurahSummary } from "@/models/surahModel";
import { fetchAllSurahs, fetchSurahById } from "@/services/quranService";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaBook,
  FaBackward,
  FaForward,
  FaInfoCircle,
  FaUserCircle,
} from "react-icons/fa";
import { QORI_MAP } from "@/services/quranService";
import { FaMicrophone } from "react-icons/fa";
import Sidebar from "@/components/SidebarSurah";

interface SurahClientProps {
  surah: SurahDetail;
}

const SurahClient = ({ surah }: SurahClientProps) => {
  const [currentAyat, setCurrentAyat] = useState<number | null>(null);
  const [isTafsirOpen, setIsTafsirOpen] = useState(false);
  const [selectedAyat, setSelectedAyat] = useState<Ayat | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [isPausedAll, setIsPausedAll] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPausedSingle, setIsPausedSingle] = useState<boolean>(false);

  // Qori
  const [qoriList, setQoriList] = useState<{ kode: string; nama: string }[]>(
    []
  );
  const [selectedQori, setSelectedQori] = useState<string>("01");

  // Deskripsi Surah
  const [isDeskripsiOpen, setIsDeskripsiOpen] = useState(false);
  const toogleDeskripsi = () => setIsDeskripsiOpen(!isDeskripsiOpen);

  // Tafsir
  const [tafsirList, setTafsirList] = useState<Tafsir[]>([]);

  // SideBar
  const [allSurah, setAllSurah] = useState<SurahSummary[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const audioPlayer = useRef<HTMLAudioElement | null>(null);
  const ayatQueue = useRef<Ayat[]>([]);
  const currentAllIndex = useRef<number>(0);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const audio = audioPlayer.current;
      if (audio) {
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration || 0);
        setProgress((audio.currentTime / (audio.duration || 1)) * 100);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadTafsir = async () => {
      try {
        const result = await getTafsirByNomor(surah.nomor);
        setTafsirList(result);
      } catch (error) {
        console.error("Gagal memuat tafsir:", error);
      }
    };

    loadTafsir();
  }, [surah.nomor]);

  // Scroll ke ayat yang sedang diputar
  useEffect(() => {
    if (currentAyat !== null) {
      const element = document.getElementById(`ayat-${currentAyat}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentAyat]);

  // Qori
  useEffect(() => {
    // Setiap ganti Qori, hentikan audio supaya gak tabrakan
    stopAyatAudio();
    stopAllAudio();
    currentAllIndex.current = 0;
  }, [selectedQori]);

  useEffect(() => {
    if (surah.ayat && surah.ayat.length > 0) {
      const audioMap = surah.ayat[0].audio;
      const qoriListTemp = Object.keys(audioMap).map((kode) => ({
        kode,
        nama: QORI_MAP[kode] || `Qori ${kode}`,
      }));
      setQoriList(qoriListTemp);
      setSelectedQori(qoriListTemp[0]?.kode ?? "01");
    }
  }, [surah]);

  const getAudioUrl = (ayat: Ayat): string => {
    return typeof ayat.audio?.[selectedQori] === "string"
      ? ayat.audio[selectedQori]
      : ayat.audio?.[selectedQori] != null
      ? String(ayat.audio[selectedQori])
      : "";
  };

  // SideBar
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const surahList = await fetchAllSurahs();
        setAllSurah(surahList);
        const firstSurah = await fetchSurahById(surahList[0].nomor);
        setSelectedSurah(firstSurah);
      } catch (error) {
        console.error("Gagal memuat data surah:", error);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const scrollToAyat = (nomor: number) => {
    const element = document.getElementById(`ayat-${nomor}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Handler saat surah dipilih dari Sidebar
  const handleSurahSelect = async (nomor: number) => {
    try {
      setLoading(true);
      const surahDetail = await fetchSurahById(nomor);
      setSelectedSurah(surahDetail);
    } catch (error) {
      console.error("Gagal memuat surah:", error);
    } finally {
      setLoading(false);
    }
  };

  const playAllAudio = () => {
    stopAyatAudio();
    setIsPlayingAll(true);
    setIsPausedAll(false);
    ayatQueue.current = surah.ayat.slice(currentAllIndex.current);

    const playNext = () => {
      if (ayatQueue.current.length === 0) {
        stopAllAudio();
        return;
      }
      const nextAyat = ayatQueue.current.shift();
      if (!nextAyat) return;

      const audioUrl = getAudioUrl(nextAyat);
      if (!audioUrl) {
        console.warn(
          "Audio URL tidak ditemukan untuk ayat",
          nextAyat.nomorAyat
        );
        playNext(); // skip ayat ini
        return;
      }

      const audio = new Audio(audioUrl);
      audioPlayer.current = audio;
      setCurrentAyat(nextAyat.nomorAyat);
      audio.play();

      audio.onended = () => {
        currentAllIndex.current++;
        playNext();
      };
    };

    playNext();
  };

  const pauseAllAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      setIsPausedAll(true);
      setIsPlayingAll(false);
    }
  };

  const resumeAllAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.play();
      setIsPausedAll(false);
      setIsPlayingAll(true);
    } else {
      playAllAudio();
    }
  };

  const stopAllAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
      audioPlayer.current = null;
    }
    ayatQueue.current = [];
    setIsPlayingAll(false);
    setIsPausedAll(false);
    setCurrentAyat(null);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    currentAllIndex.current = 0;
  };

  const playAyatAudio = (ayat: Ayat) => {
    const audioUrl = getAudioUrl(ayat);
    if (!audioUrl) {
      console.warn(
        "Audio URL tidak ditemukan untuk ayat",
        ayat.nomorAyat,
        "dan qori",
        selectedQori
      );
      return;
    }
    // Jika ayat sedang diputar dan dijeda → resume
    if (
      currentAyat === ayat.nomorAyat &&
      isPausedSingle &&
      audioPlayer.current
    ) {
      audioPlayer.current.play();
      setIsPausedSingle(false);
      return;
    }

    // Jika ayat sedang diputar dan tidak dijeda → pause
    if (
      currentAyat === ayat.nomorAyat &&
      !isPausedSingle &&
      audioPlayer.current
    ) {
      audioPlayer.current.pause();
      setIsPausedSingle(true);
      return;
    }

    // Jika ayat baru → mainkan dari awal
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audioPlayer.current = audio;

    setCurrentAyat(ayat.nomorAyat);
    setIsPausedSingle(false);
    audio.play();

    audio.onended = () => {
      const currentIndex = surah?.ayat.findIndex(
        (a) => a.nomorAyat === ayat.nomorAyat
      );
      if (currentIndex !== undefined && currentIndex !== -1 && surah) {
        const nextAyat = surah.ayat[currentIndex + 1];
        if (nextAyat) {
          playAyatAudio(nextAyat);
        } else {
          setCurrentAyat(null);
          setIsPausedSingle(false);
        }
      }
    };
  };

  const stopAyatAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.pause();
      audioPlayer.current.currentTime = 0;
      audioPlayer.current = null;
    }
    setCurrentAyat(null);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
  };

  const toggleTafsir = (ayat: Ayat) => {
    setSelectedAyat(ayat);
    setIsTafsirOpen(!isTafsirOpen);
  };

  const goToPreviousAyat = () => {
    const index = surah.ayat.findIndex((a) => a.nomorAyat === currentAyat);
    if (index > 0) {
      playAyatAudio(surah.ayat[index - 1]);
    }
  };

  const goToNextAyat = () => {
    const index = surah.ayat.findIndex((a) => a.nomorAyat === currentAyat);
    if (index < surah.ayat.length - 1) {
      playAyatAudio(surah.ayat[index + 1]);
    }
  };

  function cleanDeskripsi(raw: string): string {
    return raw
      .replace(/<i>/g, "")
      .replace(/<\/i>/g, "")
      .replace(/\.\s*/g, ".\n\n");
  }

  return (
    <div className="flex min-h-screen bg-[var(--birutua)] mt-40">
      {/* Sidebar Surah */}
      <Sidebar 
        allSurah={allSurah} 
        selectedSurahNomor={surah.nomor} 
        jumlahAyat={surah.jumlahAyat}
        onClickAyat={scrollToAyat}  
      />
      
      {/* Header without padding */}

      <div className="max-w-4xl mx-auto relative -mt-5 overflow-y-auto scrollbar-hide z-10">

        <div className="px-4">
          {/* Card Awal: Lebar sama dengan card ayat */}
          <div className="rounded-lg p-2 mb-8 flex flex-col md:flex-row items-center relative overflow-hidden">
  {/* Belah Ketupat/Nomor Surah */}
  <div className="w-12 h-12 bg-[var(--birumuda)] transform rotate-45 flex items-center justify-center shrink-0 md:mr-6 mb-4 md:mb-0 rounded-lg transition-all duration-300">
    <span className="transform -rotate-45 text-lg font-bold text-[var(--birupolarius)]">
      {surah.nomor}
    </span>
  </div>
  
  {/* Info Surah */}
  <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-4 min-w-0 w-full items-center">
    {/* Kiri: Latin & arti */}
    <div className="min-w-0 text-center md:text-left w-full">
      <h3 className="text-lg font-medium text-[var(--birupolarius)] truncate mb-1">
        {surah.namaLatin}
      </h3>
      <p className="font-medium text-sm text-white truncate">
        {surah.arti}
      </p>
    </div>
    
    {/* Kanan: Arab & jumlah ayat */}
    <div className="min-w-0 text-center md:text-right w-full">
      <p className="text-2xl font-medium text-[var(--birupolarius)] truncate font-arab md:mr-0.5">
        {surah.nama}
      </p>
      <span className="inline-flex items-center justify-center bg-[var(--birumuda)] px-2 py-1 rounded-lg font-medium text-xs text-white">
        {surah.jumlahAyat} Ayat
      </span>
    </div>
  </div>
</div>

          {/* Modal Deskripsi Surah*/}
          {isDeskripsiOpen && (
            <div className="fixed inset-0 z-50 bg-[var(--birutua)]/90 flex items-center justify-center p-4">
              <div className="bg-[var(--birutua)] border border-[var(--birupolarius)] rounded-lg p-6 max-w-xl w-full text-white relative">
                <button
                  onClick={toogleDeskripsi}
                  className="absolute top-3 right-3 text-[var(--birupolarius)] hover:text-white text-lg"
                >
                  ✕
                </button>
                <h2 className="text-xl font-bold text-[var(--birupolarius)] mb-4">
                  Deskripsi Surah {surah.namaLatin}
                </h2>
                <p className="text-justify text-sm leading-relaxed">
                  {cleanDeskripsi(surah.deskripsi)}
                </p>
              </div>
            </div>
          )}

          {/* Bismillah di atas card ayat */}
          <p className="text-4xl font-arab text-[var(--putih)] text-center mb-16">
            بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
        </div>

        <div className="px-4">
          <div className="rounded-lg mb-8">
            <div className="flex flex-col">
              {/* Baris Atas: Tempat Turun */}
              <div
                onClick={toogleDeskripsi}
                className=" cursor-pointer flex items-center justify-start bg-[var(--birumuda)] px-3 py-1 rounded-lg mb-3 w-max"
              >
                <FaInfoCircle className="text-[var(--birupolarius)] mr-2" />
                <span className="text-[var(--putih)] text-md">
                  {surah.tempatTurun} · {surah.jumlahAyat} Ayat
                </span>
              </div>

              {/* Baris Bawah: Qori kiri dan Tombol Audio kanan */}
              <div className="flex justify-between items-center">
                {/* Kiri: Pilih Qori */}
                <div className="bg-[var(--birumuda)] rounded-lg px-3 py-1 flex items-center">
                  {/* Ganti label dengan icon */}
                  <FaUserCircle
                    className="text-[var(--birupolarius)] mr-1 cursor-pointer"
                    title="Pilih Qori"
                  />

                  <select
                    id="qori"
                    className="bg-[var(--birumuda)] text-[var(--putih)] border-none outline-none cursor-pointer"
                    value={selectedQori}
                    onChange={(e) => setSelectedQori(e.target.value)}
                  >
                    {qoriList.map((q) => (
                      <option
                        key={q.kode}
                        value={q.kode}
                        className="text-[var(--putih)]"
                      >
                        {q.nama}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Kanan: Tombol Putar Semua Audio dan Stop */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={
                      isPlayingAll
                        ? pauseAllAudio
                        : isPausedAll
                        ? resumeAllAudio
                        : playAllAudio
                    }
                    className="group bg-[var(--birumuda)] hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)] px-3 py-1 rounded-lg flex items-center transition-all duration-300"
                  >
                    {isPlayingAll ? (
                      <FaPause className="mr-2 text-[var(--birupolarius)] group-hover:text-[var(--birutua)]" />
                    ) : (
                      <FaPlay className="mr-2 text-[var(--birupolarius)] group-hover:text-[var(--birutua)]" />
                    )}
                    <span className="text-white group-hover:text-[var(--birutua)]">
                      {isPlayingAll ? "Sedang Diputar" : "Putar Semua Audio"}
                    </span>
                  </button>

                  {(isPlayingAll || isPausedAll) && (
                    <button
                      onClick={stopAllAudio}
                      className="bg-[var(--birumuda)] text-white px-3 py-1 rounded-lg flex items-center hover:bg-red-500 hover:text-white transition-all duration-300"
                    >
                      <FaStop className="mr-2" />
                      <span>Stop</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Ayat list */}
          {surah.ayat.map((ayat) => (
            <div
              key={ayat.nomorAyat}
              id={`ayat-${ayat.nomorAyat}`} 
              className={`bg-[var(--birumuda)] rounded-lg  shadow-lg p-6 mb-6 transition-all duration-300 ${
                currentAyat === ayat.nomorAyat
                  ? "border border-[var(--birupolarius)] shadow-[0_0_15px_rgba(158,251,255,0.15)]"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                {/* Left side - Ayat number */}
                <div className="flex items-center">
                  <div className="w-9 h-9 bg-[var(--biruagaktua)] rounded-lg flex items-center justify-center text-[var(--birupolarius)] font-bold">
                    {ayat.nomorAyat}
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-3">
                  <div className="text-xs text-[var(--putih)] mr-4">
                    {ayat.nomorAyat}/{surah.jumlahAyat}
                  </div>
                  {/* Tafsir button - icon only */}
                  <button
                    onClick={() => toggleTafsir(ayat)}
                    className="w-9 h-9 bg-[var(--biruagaktua)] hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)] text-[var(--birupolarius)] rounded-lg flex items-center justify-center transition-all duration-300"
                    aria-label="Tafsir"
                  >
                    <FaBook size={16} />
                  </button>

                  {/* Play button - triangle with text */}
                  <button
                    onClick={() => playAyatAudio(ayat)}
                    disabled={currentAyat === ayat.nomorAyat && !isPausedSingle}
                    className={`group flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                      currentAyat === ayat.nomorAyat
                        ? "bg-[var(--birupolarius)] text-black hover:text-black"
                        : "bg-[var(--biruagaktua)] text-white hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)]"
                    } ${currentAyat === ayat.nomorAyat && !isPausedSingle ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <>
                      <FaPlay
                        className={`mr-2 transition-colors ${
                          currentAyat === ayat.nomorAyat
                            ? "text-black group-hover:text-black"
                            : "text-[var(--birupolarius)] group-hover:text-[var(--birutua)]"
                        }`}
                        size={15}
                      />
                      <span
                        className={`text-sm transition-colors ${
                          currentAyat === ayat.nomorAyat
                            ? "text-black group-hover:text-black"
                            : "text-white group-hover:text-[var(--birutua)]"
                        }`}
                      >
                        {currentAyat === ayat.nomorAyat && isPausedSingle
                          ? "Lanjutkan"
                          : "Putar Audio"}
                      </span>
                    </>
                  </button>

                  {/* <button
                    onClick={() => playAyatAudio(ayat)}
                    className={`group flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${ 
                      currentAyat === ayat.nomorAyat
                          ? "bg-[var(--birupolarius)] text-[var(--birutua)] hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)]"
                          : "bg-[var(--biruagaktua)] text-white hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)]"}
                    `} >
                      <>
                        <FaPlay
                          className={`mr-2 group-hover:text-[var(--birutua)] ${
                            currentAyat === ayat.nomorAyat && isPausedSingle
                              ? "text-[var(--birutua)]"
                              : "text-[var(--birupolarius)]"
                          }`}
                          size={15}
                        />
                        <span
                          className={`text-sm group-hover:text-[var(--birutua)] ${
                            currentAyat === ayat.nomorAyat && isPausedSingle
                              ? "text-[var(--birutua)]"
                              : "text-white"
                          }`}
                        >
                          {currentAyat === ayat.nomorAyat && isPausedSingle
                            ? "Lanjutkan"
                            : "Putar Audio"}
                        </span>
                      </>
                  </button> */}
                </div>
              </div>

              {/* Arabic text - right aligned */}

              {/* Swapped order: Translation first (on left), then Latin (on right) */}
              <div className="flex flex-col">
                <p className="text-4xl  text-right font-arab font-normal leading-loose mb-4 text-[var(--putih)] items-end">
                  {ayat.teksArab}
                </p>

                <p className="text-[var(--birupolarius)] text-justify mb-1 text-lg font-satoshi font-medium">
                  {ayat.teksLatin}
                </p>

                <p className="text-[var(--putih)] text-justify text-left text-lg font-satoshi font-medium">
                  {ayat.teksIndonesia}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tafsir Modal */}
      {isTafsirOpen && selectedAyat && (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-80 flex items-center justify-center overflow-y-auto p-4">
          <div className="relative bg-[var(--biruagaktua)] text-[var(--putih)] rounded-lg shadow-lg max-w-xl w-full p-6 border border-[var(--birupolarius)]">
            <button
              onClick={() => setIsTafsirOpen(false)}
              className="absolute top-3 right-3 text-[var(--birupolarius)] hover:text-[var(--putih)] text-lg font-bold h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--birutua)] hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)] transition-all duration-300"
              aria-label="Close"
            >
              ✕
            </button>
            <h4 className="text-xl font-semibold mb-3 text-[var(--birupolarius)]">
              Tafsir Ayat {selectedAyat.nomorAyat}
            </h4>

            <div className="fixed inset-0 z-50 bg-[var(--birutua)]/90 flex items-center justify-center overflow-y-auto p-4">
              <div className="relative bg-[var(--birumuda)] text-[var(--putih)] rounded-lg shadow-lg max-w-7xl w-full p-6 border border-[var(--birupolarius)]">
                <button
                  onClick={() => setIsTafsirOpen(false)}
                  className="absolute top-3 right-3 text-[var(--birupolarius)] hover:text-[var(--putih)] text-lg font-bold h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--birutua)] hover:bg-[var(--birupolarius)] hover:text-[var(--birutua)] transition-all duration-300"
                  aria-label="Close"
                >
                  ✕
                </button>
                <h4 className="text-xl font-semibold mb-4 text-[var(--birupolarius)]">
                  Tafsir Ayat {selectedAyat?.nomorAyat}
                </h4>
                <div className="bg-[var(--biruagaktua)] p-5 rounded-lg h-[70vh] overflow-y-auto text-justify leading-relaxed whitespace-pre-line">
                  {Array.isArray(tafsirList)
                    ? tafsirList.find((t) => t.ayat === selectedAyat?.nomorAyat)
                        ?.teks
                    : "Tafsir sedang dimuat atau tidak tersedia."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio player fixed at bottom */}
      {(isPlayingAll || currentAyat !== null || isPausedAll) && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--biruagaktua)] border-t border-[var(--birupolarius)]/20 text-[var(--putih)] py-3 px-4 z-40">
          <div className="max-w-6xl mx-auto">
            {/* Progress bar */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-xs text-[var(--birupolarius)] w-12">
                {formatTime(currentTime)}
              </div>

              <div className="flex-1 relative h-2">
                <div className="absolute inset-0 bg-[var(--birutua)] rounded-lg"></div>
                <div
                  className="absolute inset-y-0 left-0 bg-[var(--birupolarius)] rounded-lg"
                  style={{ width: `${progress}%` }}
                ></div>
                <input
                  type="range"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  min={0}
                  max={100}
                  value={progress}
                  onChange={(e) => {
                    const audio = audioPlayer.current;
                    if (audio) {
                      const seekTime =
                        (audio.duration * Number(e.target.value)) / 100;
                      audio.currentTime = seekTime;
                    }
                  }}
                />
              </div>

              <div className="text-xs text-[var(--birupolarius)] w-12 text-right">
                {formatTime(duration)}
              </div>
            </div>

            {/* Controls and info */}
            <div className="flex justify-between items-center">
              {/* Left - Current Ayat */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[var(--birutua)] rounded-lg flex items-center justify-center text-[var(--birupolarius)] text-xs font-medium">
                  {currentAyat ?? 0}
                </div>
                <span className="text-xs text-[var(--putih)]">
                  / {surah.jumlahAyat}
                </span>
              </div>

              {/* Center - Controls */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={goToPreviousAyat}
                  className="text-[var(--birupolarius)] hover:scale-110 transition-transform focus:outline-none"
                >
                  <FaBackward size={16} />
                </button>

                {isPausedAll ? (
                  <button
                    onClick={resumeAllAudio}
                    className="bg-[var(--birupolarius)] text-[var(--birutua)] rounded-lg p-3 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <FaPlay size={18} />
                  </button>
                ) : isPlayingAll ? (
                  <button
                    onClick={pauseAllAudio}
                    className="bg-[var(--birupolarius)] text-[var(--birutua)] rounded-lg p-3 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <FaPause size={18} />
                  </button>
                ) : currentAyat !== null ? (
                  // Audio per ayat sedang dimainkan / paused
                  isPausedSingle ? (
                    <button
                      onClick={() => {
                        audioPlayer.current?.play();
                        setIsPausedSingle(false);
                      }}
                      className="bg-[var(--birupolarius)] text-[var(--birutua)] rounded-lg p-3 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <FaPlay size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        audioPlayer.current?.pause();
                        setIsPausedSingle(true);
                      }}
                      className="bg-[var(--birupolarius)] text-[var(--birutua)] rounded-lg p-3 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <FaPause size={18} />
                    </button>
                  )
                ) : (
                  <button
                    onClick={playAllAudio}
                    className="bg-[var(--birupolarius)] text-[var(--birutua)] rounded-lg p-3 hover:scale-110 transition-transform focus:outline-none"
                  >
                    <FaPlay size={18} />
                  </button>
                )}

                <button
                  onClick={goToNextAyat}
                  className="text-[var(--birupolarius)] hover:scale-110 transition-transform focus:outline-none"
                >
                  <FaForward size={16} />
                </button>
              </div>

              {/* Right - Surah info */}
              <div className="flex flex-col items-end">
                <span className="font-arab text-md text-[var(--putih)]">
                  {surah.nama}
                </span>
                <span className="text-xs text-[var(--putih)]">
                  {surah.namaLatin}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding at the bottom if player is visible */}
      {(isPlayingAll || currentAyat !== null || isPausedAll) && (
        <div className="h-24"></div>
      )}
    </div>
  );
};

export default SurahClient;
