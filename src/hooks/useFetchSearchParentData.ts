import { ErrorResponse } from '../model/errorResponse';
import { Pending } from '../model/pending';
import { SearchItemsResponse } from '../model/searchItemResponse';

export const useFetchSearchParentData = async (
  keywords: string
): Promise<SearchItemsResponse | ErrorResponse | 'pending' | null> => {
  let result: SearchItemsResponse | ErrorResponse | Pending | null = null;

  if (keywords !== undefined && keywords !== '') {
    result = await fetch(`http://localhost:5000/api/item/search?keywords=${keywords}`, { method: 'GET' })
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
              code: 'search-item/unknown-error',
              message: 'UnknownError: Something went wrong.',
            };
          }
        }
      })
      .catch((e) => {
        console.error(e);
        return {
          code: 'search-item/unknown-error',
          message: 'UnknownError: Something went wrong.',
        };
      });
  }

  return result;
};
