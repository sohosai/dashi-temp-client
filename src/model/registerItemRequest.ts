export type RegisterItemRequest = {
  name: string;
  visible_id: string;
  parent_visible_id: string;
  product_number: string;
  description: string;
  purchase_year: number | null;
  purchase_price: number | null;
  durability: number | null;
  is_depreciation: boolean;
  connector: string[];
  color: string;
};
