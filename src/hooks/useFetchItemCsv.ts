import { ErrorResponse } from '../model/errorResponse';
import { ItemCsvResponse } from '../model/itemCsvResponse';

export const useFetchItemCsv = async (): Promise<ItemCsvResponse | ErrorResponse> => {
  const result: ItemCsvResponse | ErrorResponse = await fetch(`http://localhost:5000/api/csv/item`, {
    method: 'GET',
  })
    .then((res) => {
      if (res.status === 200) {
        // 200 OK
        return res.json();
      } else {
        // error
        try {
          return res.json();
        } catch (e) {
          console.error(e);
          return {
            code: 'depreiation-csv/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
      return {
        code: 'depreiation-csv/unknown-error',
        message: 'UnknownError: Something went wrong.',
      };
    });

  return result;
};
