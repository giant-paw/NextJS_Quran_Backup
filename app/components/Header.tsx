// /app/components/Header.tsx
import Link from 'next/link';

const Header = () => {
  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold">Quran App</h1>
      </Link>
    </header>
  );
};

export default Header;