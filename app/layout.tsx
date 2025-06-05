// app/layout.tsx
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Scheherazade_New } from 'next/font/google';
import Sidebar from "@/components/SidebarSurah";

const scheherazadeNew = Scheherazade_New({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
});



export const metadata = {
  title: 'Qalby',
  description: 'Baca dan pelajari Al-Quran',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={scheherazadeNew.className}>
      <body className="bg-[var(--birutua)] text-gray-900 w-full">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}