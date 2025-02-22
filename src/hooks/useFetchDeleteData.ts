import { ErrorResponse } from '../model/errorResponse';
import { OkResponse } from '../model/okResponse';

export const useFetchDeleteData = async (id: number): Promise<OkResponse | ErrorResponse> => {
  // send
  const result: OkResponse | ErrorResponse = await fetch(`http://localhost:5000/api/item/delete/${id}`, {
    method: 'DELETE',
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
            code: 'delete-item/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
      return {
        code: 'delete-item/unknown-error',
        message: 'UnknownError: Something went wrong.',
      };
    });

  return result;
};
