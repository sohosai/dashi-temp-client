import { ErrorResponse } from '../model/errorResponse';
import { OkResponse } from '../model/okResponse';
import { TransferItemRequest } from '../model/transferItemRequest';

export const useFetchTransferItem = async (id: number, parent_id: number): Promise<OkResponse | ErrorResponse> => {
  const requestData: TransferItemRequest = {
    id: id,
    new_parent_id: parent_id,
  };
  // send
  const result: OkResponse | ErrorResponse = await fetch(`http://localhost:5000/api/item/transfer`, {
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
            code: 'transfer-item/unknown-error',
            message: 'UnknownError: Something went wrong.',
          };
        }
      }
    })
    .catch((e) => {
      console.error(e);
      return {
        code: 'transfer-item/unknown-error',
        message: 'UnknownError: Something went wrong.',
      };
    });

  return result;
};
