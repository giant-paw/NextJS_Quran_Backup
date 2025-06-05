
import { FC } from 'react';
import { AsmaulHusna } from "@/models/AsmaulModel";

interface AsmaulCardProps {
  asmaul: AsmaulHusna;
}

const AsmaulCard: FC<AsmaulCardProps> = ({ asmaul }) => (
  <div className="bg-[var(--birumuda)] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:translate-y-1 group relative overflow-hidden w-full">
    {/* Background decoration */}
    <div className="absolute -right-12 -top-12 w-36 h-36 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>
    <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-[var(--biruagaktua)] opacity-20 rounded-full"></div>
    
    {/* Content layout */}
    <div className="flex justify-between items-center mb-2 z-10 relative">
      <h3 className="text-lg font-semibold text-[var(--birupolarius)]">{asmaul.latin}</h3>
      <p className="text-2xl font-arab font-semibold text-[var(--birupolarius)]">{asmaul.arab}</p>
    </div>
    
    <p className="text-sm text-white z-10 relative">{asmaul.arti}</p>
  </div>
);

export default AsmaulCard;