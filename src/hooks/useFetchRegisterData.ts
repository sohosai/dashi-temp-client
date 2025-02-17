import { ErrorResponse } from '../model/error';
import { RegisterItemRequest } from '../model/registerItemRequest';
import { RegisterItemSchemaType } from '../validation/registerItem';
import { OkResponse } from '../model/ok';

export const useFetchRegisterData = async (
  data: RegisterItemSchemaType,
  endpoint: string
): Promise<ErrorResponse | 'ok'> => {
  // conver from zod schema to api schema
  const requestColor: string = data.color.map((color) => color.color).join('^');
  const requestPurchaseYear: number | null = Number.isNaN(data.purchase_year) ? null : data.purchase_year;
  const requestPurchasePrice: number | null = Number.isNaN(data.purchase_price) ? null : data.purchase_price;
  const requestDurability: number | null = Number.isNaN(data.durability) ? null : data.durability;
  const requestData: RegisterItemRequest = {
    name: data.name,
    visible_id: data.visible_id,
    parent_visible_id: data.parent_visible_id,
    product_number: data.product_number,
    description: data.description,
    purchase_year: requestPurchaseYear,
    purchase_price: requestPurchasePrice,
    durability: requestDurability,
    is_depreciation: data.is_depreciation,
    connector: data.connector.map((connector) => connector.connector),
    color: requestColor,
  };
  // send
  const result: ErrorResponse | OkResponse = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => {
      if (res.status === 201) {
        return 'ok';
      } else {
        return res.json();
      }
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};
