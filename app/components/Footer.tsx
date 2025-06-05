import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'; // Using Feather icons
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export default function Footer() {
  const ayatInspiratif = [
    // ... (ayatInspiratif array remains the same)
    {
      text: "Sesungguhnya dengan mengingat Allah hati menjadi tenang.",
      source: "QS. Ar-Ra'd: 28"
    },
    {
      text: "Dan Tuhanmu menambahkan kepadamu ilmu.",
      source: "QS. Taha: 114"
    },
    {
      text: "Maka sesungguhnya bersama kesulitan ada kemudahan.",
      source: "QS. Al-Insyirah: 6"
    },
    {
      text: "Janganlah kamu berputus asa dari rahmat Allah.",
      source: "QS. Az-Zumar: 53"
    },
    {
      text: "Dan bersabarlah, sesungguhnya Allah beserta orang-orang yang sabar.",
      source: "QS. Al-Anfal: 46"
    },
  ];

  const randomAyat = useMemo(() => {
    return ayatInspiratif[Math.floor(Math.random() * ayatInspiratif.length)];
  }, []);

  const iconBoxStyle = "bg-[var(--biruagaktua)] p-2 rounded-lg flex items-center justify-center";
  // MODIFIED: Changed icon color to var(--birupolarius)
  const iconStyle = "text-[var(--birupolarius)] text-lg"; // text-lg or text-xl, adjust as needed

  return (
    <footer className="bg-[var(--birumuda)] text-white mt-16 z-50">
      <div className="container mx-auto px-6 py-12">
        {/* Main grid ... (rest of the grid remains the same) ... */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

          {/* Column 1: Logo + description */}
          <div>
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-2xl md:text-3xl font-medium text-[var(--birupolarius)] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-md">
                Qalby
              </h3>
            </div>
            <p className="text-sm text-white leading-relaxed text-justify">
              <strong>Qalby</strong> adalah platform global untuk membaca, mendengarkan,
              mencari, dan merenungkan Al‐Qur'an. Tersedia terjemahan, tafsir, bacaan, dan alat belajar
              dalam banyak bahasa, menjadikan Al‐Qur'an mudah diakses siapa saja.
            </p>
          </div>

          {/* Column 2: Navigasi */}
          <div className="pl-0 sm:pl-8 md:pl-16">
            <h4 className="text-lg font-bold text-[var(--birupolarius)] mb-4">Navigasi</h4>
            <ul className="text-sm text-white space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-300 relative group">
                  <span>Home</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--birupolarius)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/doa" className="hover:text-white transition-colors duration-300 relative group">
                  <span>Doa Sehari-hari</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--birupolarius)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/asmaul" className="hover:text-white transition-colors duration-300 relative group">
                  <span>Asmaul Husna</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--birupolarius)] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className="pl-0 sm:-ml-6 md:-ml-12">
            <h4 className="text-lg font-bold text-[var(--birupolarius)] mb-4">About Us</h4>
            <p className="text-sm text-white leading-relaxed text-justify">
              <strong className="text-[var(--birupolarius)] hover:text-white transition-colors duration-300 cursor-pointer">Polarius</strong> adalah startup digital yang menggabungkan kreativitas dan
              inovasi teknologi untuk menghadirkan solusi web dan mobile yang berdampak dan visioner.
            </p>
          </div>

          {/* Column 4: Ayat Inspiratif */}
          <div className="pl-0 sm:pl-4 md:pl-8">
            <h4 className="text-lg font-bold text-[var(--birupolarius)] mb-4">Ayat Inspiratif</h4>
            <p className="italic text-sm text-white leading-relaxed mb-6 break-words">
              "{randomAyat.text}"<br />
              <span className="text-[var(--birupolarius)] font-semibold hover:text-white transition-colors duration-300 cursor-pointer">
                {randomAyat.source}
              </span>
            </p>
          </div>
        </div>


        {/* Contact & Social Row */}
        <div className="mt-10 border-t border-[var(--birupolarius)] pt-6">
          <div className="flex flex-wrap items-center justify-between text-sm text-white gap-y-6 sm:gap-y-4">

            <div className="flex items-center gap-3 group hover:text-[var(--birupolarius)] transition-colors duration-300 cursor-pointer w-full sm:w-auto">
              <div className={`${iconBoxStyle} group-hover:scale-110 transition-transform duration-300`}>
                <FiMapPin className={iconStyle} /> {/* Uses updated iconStyle */}
              </div>
              <span>Gamping Kidul, Sleman, DIY</span>
            </div>

            <div className="flex items-center gap-3 group hover:text-[var(--birupolarius)] transition-colors duration-300 cursor-pointer w-full sm:w-auto">
              <div className={`${iconBoxStyle} group-hover:scale-110 transition-transform duration-300`}>
                <FiPhone className={iconStyle} /> {/* Uses updated iconStyle */}
              </div>
              <span>+62 817-7516-4133</span>
            </div>

            <div className="flex items-center gap-3 group hover:text-[var(--birupolarius)] transition-colors duration-300 cursor-pointer w-full sm:w-auto">
              <div className={`${iconBoxStyle} group-hover:scale-110 transition-transform duration-300`}>
                <FiMail className={iconStyle} /> {/* Uses updated iconStyle */}
              </div>
              <span>polarius.app@gmail.com</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/6281775164133"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transform hover:scale-125 transition-all duration-300"
              >
                <div className={iconBoxStyle}>
                  {/* MODIFIED: Default icon color changed */}
                  <FaWhatsapp className="text-xl text-[var(--birupolarius)] hover:text-green-400 transition-colors" />
                </div>
              </a>
              <a
                href="https://www.instagram.com/polarius.app?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transform hover:scale-125 transition-all duration-300"
              >
                <div className={iconBoxStyle}>
                  {/* MODIFIED: Default icon color changed */}
                  <FaInstagram className="text-xl text-[var(--birupolarius)] hover:text-pink-400 transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs py-4 text-[var(--birupolarius)] hover:text-white transition-colors duration-300">
        © 2025 Qalby Hak Cipta Terlindungi
      </div>
    </footer>
  );
}