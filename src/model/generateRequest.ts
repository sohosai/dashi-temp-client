export type Record = 'Qr' | 'Barcode' | 'Nothing';

export type GenerateRequest = {
  quantity: number;
  record: Record;
};
