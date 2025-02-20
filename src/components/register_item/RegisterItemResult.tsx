import { FC } from 'react';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import ErrorResult from '../error/ErrorResult';
import OkResult from '../ok/OkResult';

type Props = {
  result: OkResponse | ErrorResponse;
};

const RegisterItemResult: FC<Props> = (props) => {
  return <>{props.result == 'ok' ? <OkResult result={props.result} /> : <ErrorResult result={props.result} />}</>;
};

export default RegisterItemResult;
