import { AsmaulHusna } from "@/models/AsmaulModel";
import { fetchAllAsmaulHusna } from "@/services/asmaulService";

export async function getAllAsmaulHusna(): Promise<AsmaulHusna[]> {
  return await fetchAllAsmaulHusna();
}