import { useEffect, useState } from 'react';
import { ErrorResponse } from '../model/error';
import { Pending } from '../model/pending';
import { IndividualItemResponse } from '../model/individualItemResponse';

export const useFetchIndividualData = (
  id: string | undefined
): IndividualItemResponse | ErrorResponse | Pending | null => {
  const [result, setResult] = useState<IndividualItemResponse | ErrorResponse | Pending | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined && parseInt(id) >= 1) {
        const data = await fetch(`http://localhost:5000/api/item/${id}`, { method: 'GET' })
          .then((res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              return res.json();
            }
          })
          .catch((err) => console.error(err));
        setResult(data);
      } else {
        setResult({
          code: 'individual-item/invalid-id',
          message: 'IdNotFoundInItemTableError: Invalid id.',
        });
      }
    };
    fetchData();
  }, [id]);
  return result;
};
