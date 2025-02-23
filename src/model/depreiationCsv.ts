export type DepreiationCsv = {
  name: string;
  product_number: string;
  durability: number | null;
  purchase_year: number | null;
  purchase_price: number | null;
};

export type DepreiationCsvList = {
  items: DepreiationCsv[];
};
