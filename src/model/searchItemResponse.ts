export type SearchItemResponse = {
  id: number;
  visible_id: string;
  name: string;
  connector: string[];
  is_rent: boolean;
  color: string;
};

export type SearchItemsResponse = {
  search_items: SearchItemResponse[];
};
