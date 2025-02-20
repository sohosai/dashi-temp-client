import { FC } from 'react';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { ErrorResult, OkResult } from '..';

type Props = {
  result: OkResponse | ErrorResponse;
};

const DeleteItemResult: FC<Props> = (props) => {
  return <>{props.result == 'ok' ? <OkResult result={props.result} /> : <ErrorResult result={props.result} />}</>;
};

export default DeleteItemResult;
