export interface AsmaulHusna {
  urutan: number;
  latin: string;
  arab: string;
  arti: string;
}

export interface AsmaulHusnaResponse {
  statusCode: number;
  total: number;
  data: AsmaulHusna[];
}

