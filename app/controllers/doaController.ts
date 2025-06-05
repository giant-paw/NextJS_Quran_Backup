import { fetchAllDoa, fetchDoaById } from "@/services/doaService";
import { Doa } from "@/models/doaModel";

export async function getAllDoa(): Promise<Doa[]> {
  return await fetchAllDoa();
}

export async function getDoaById(id: number): Promise<Doa> {
  return await fetchDoaById(id);
}
