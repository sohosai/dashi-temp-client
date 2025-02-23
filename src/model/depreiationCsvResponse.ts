export type DepreiationCsvItems = {
  name: string;
  product_number: string;
  durability: number | null;
  purchase_price: number | null;
  purchase_year: number | null;
};

export type DepreiationCsvResponse = {
  depreciation_items: DepreiationCsvItems[];
};
