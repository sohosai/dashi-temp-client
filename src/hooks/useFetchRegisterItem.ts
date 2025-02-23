import { ErrorResponse } from '../model/errorResponse';
import { RegisterItemRequest } from '../model/registerItemRequest';
import { Color, Connector, RegisterItemSchemaType } from '../validation/registerItem';
import { OkResponse } from '../model/okResponse';

export const useFetchRegisterItem = async (data: RegisterItemSchemaType): Promise<OkResponse | ErrorResponse> => {
  // conver from zod schema to api schema
  const requestColor: string = data.color.map((color: { color: Color }) => color.color).join('^');
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
    connector: data.connector.map((connector: { connector: Connector }) => connector.connector),
    color: requestColor,
  };
  // send
  const result: OkResponse | ErrorResponse = await fetch('http://localhost:5000/api/item/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => {
      if (res.status === 201) {
        // 201 Created
        return 'ok';
      } else {
        // error
        try {
          return res.json();
        } catch (e) {
          console.error(e);
          return {
            code: 'register-item/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
      return {
        code: 'register-item/unknown-error',
        message: 'UnknownError: Something went wrong.',
      };
    });
  return result;
};
