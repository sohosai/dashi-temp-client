import { ErrorResponse } from '../model/error';
import { OkResponse } from '../model/ok';
import { UpdateItemRequest } from '../model/updateItemRequest';
import { UpdateItemSchemaType } from '../validation/updateItem';

export const useFetchUpdateData = async (
  data: UpdateItemSchemaType,
  endpoint: string
): Promise<ErrorResponse | 'ok'> => {
  // conver from zod schema to api schema
  const requestPurchaseYear: number | null = Number.isNaN(data.purchase_year) ? null : data.purchase_year;
  const requestPurchasePrice: number | null = Number.isNaN(data.purchase_price) ? null : data.purchase_price;
  const requestDurability: number | null = Number.isNaN(data.durability) ? null : data.durability;
  const requestConnector: string[] = data.connector.map((connector) => connector.connector);
  const requestColor: string = data.color.map((color) => color.color).join('^');
  const requestData: UpdateItemRequest = {
    name: data.name,
    visible_id: data.visible_id,
    product_number: data.product_number,
    description: data.description,
    purchase_year: requestPurchaseYear,
    purchase_price: requestPurchasePrice,
    durability: requestDurability,
    is_depreciation: data.is_depreciation,
    connector: requestConnector,
    color: requestColor,
  };
  // send
  const result: ErrorResponse | OkResponse = await fetch(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => {
      if (res.status === 200) {
        // 200 OK
        return 'ok';
      } else {
        // error
        try {
          return res.json();
        } catch (e) {
          console.error(e);
          return {
            code: 'update-item/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
    });
  return result;
};
