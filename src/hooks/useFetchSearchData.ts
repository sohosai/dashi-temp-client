import { useEffect, useState } from 'react';
import { ErrorResponse } from '../model/error';
import { Pending } from '../model/pending';
import { SearchItemsResponse } from '../model/searchItemResponse';

export const useFetchSearchData = (keywords: string): SearchItemsResponse | ErrorResponse | Pending | null => {
  const [result, setResult] = useState<SearchItemsResponse | ErrorResponse | Pending | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (keywords !== undefined && keywords !== '') {
        const data = await fetch(`http://localhost:5000/api/item/search?keywords=${keywords}`, { method: 'GET' })
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
          .catch((e) => console.error(e));
        setResult(data);
      }
    };
    fetchData();
  }, [keywords]);
  return result;
};
