// app/doa/page.tsx
import DoaCard from "@/components/DoaCard";
import { getAllDoa } from "@/controllers/doaController";

export default async function DoaPage() {
  const doas = await getAllDoa();

  return (
    <main className="w-full mt-15">
      {/* Hero Section */}
      <div
        className=" w-full h-[300px] md:h-[400px] relative overflow-hidden bg-[var(--birutua)] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/d1.jpg')" }} 
      >
        <div className="absolute inset-0 bg-black/30 z-0" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <h1 className="text-3xl md:text-6xl font-medium text-[var(--birupolarius)] drop-shadow-md">
            Kumpulan Doa
          </h1>
        </div>
      </div>

      {/* Daftar Doa Section */}
      <div className="container mx-auto px-8 mt-10">
        <div className="flex justify-between items-center mb-2">
          <p className="text-l font-medium text-[var(--birupolarius)]">Doa</p>
          
        </div>

        <div className="border-t border-b border-gray-300 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
            {doas.map((doa) => (
              <DoaCard key={doa.id} doa={doa} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
