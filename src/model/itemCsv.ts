export type ItemCsv = {
  name: string;
  product_number: string;
  description: string;
  //TODO: 保管場所の変更を忘れない
  place: string;
  //////////////////////////////////////////
  quantity: number;
  usage: string;
  duration: string;
  required_quantity: number;
};

export type ItemCsvList = {
  items: ItemCsv[];
};
