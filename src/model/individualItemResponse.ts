type Record = 'Qr' | 'Barcode' | 'Nothing';

export type IndividualItemResponse = {
  id: number;
  visible_id: string;
  parent_id: number;
  parent_visible_id: string;
  record: Record;
  name: string;
  product_number: string;
  description: string;
  purchase_year: number | null;
  purchase_price: number | null;
  durability: number | null;
  is_depreciation: boolean;
  connector: string[];
  is_rent: boolean;
  color: string;
  created_at: string;
  updated_at: string;
};
