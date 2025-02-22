import { ErrorResponse } from '../model/errorResponse';
import { GenerateRequest, Record } from '../model/generateRequest';
import { GenerateResponse } from '../model/generateResponse';

export const useFetchGenerate = async (quantity: number, record: Record): Promise<GenerateResponse | ErrorResponse> => {
  const requestData: GenerateRequest = {
    quantity: quantity,
    record: record,
  };
  // send
  const result: GenerateResponse | ErrorResponse = await fetch(`http://localhost:5000/api/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((res) => {
      if (res.status === 201) {
        // 201 Created
        return res.json();
      } else {
        // error
        try {
          return res.json();
        } catch (e) {
          console.error(e);
          return {
            code: 'generate/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
      return {
        code: 'generate/unknown-error',
        message: 'UnknownError: Something went wrong.',
      };
    });

  return result;
};
