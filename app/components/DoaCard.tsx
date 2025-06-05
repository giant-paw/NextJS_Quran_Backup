import { FC } from "react";
import { Doa } from "@/models/doaModel";
import Link from "next/link";

interface DoaCardProps {
  doa: Doa;
}

const DoaCard: FC<DoaCardProps> = ({ doa }) => (
  <Link href={`/doa/${doa.id}`} className="block h-full">
    <div className="h-full flex items-center bg-[var(--birumuda)] p-5 pt-6 pb-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 group relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-12 -top-12 w-36 h-36 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>
      <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>

      {/* Left: Diamond with number */}
      <div className="relative z-10">
        <div className="w-12 h-12 bg-[var(--biruagaktua)] transform rotate-45 flex items-center justify-center shrink-0 mr-6 rounded-lg transition-all duration-300 group-hover:bg-[var(--birupolarius)] group-hover:scale-110">
          <span className="transform -rotate-45 text-lg font-medium text-[var(--birupolarius)] group-hover:text-[var(--biruagaktua)]">{doa.id}</span>
        </div>
      </div>

      {/* Right: Doa name */}
      <div className="flex-1 min-w-0 z-10">
        <h3 className="text-lg font-medium text-[var(--birupolarius)] mb-1 truncate group-hover:translate-x-1 transition-transform duration-300">{doa.doa}</h3>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-[var(--birupolarius)] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
    </div>
  </Link>
);

export default DoaCard;
