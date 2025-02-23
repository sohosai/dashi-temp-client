import { FC } from 'react';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { ErrorResult, OkResult } from '..';

type Props = {
  result: OkResponse | ErrorResponse;
};

const CsvResult: FC<Props> = (props) => {
  return <>{props.result == 'ok' ? <div>{props.result}</div> : <ErrorResult result={props.result} />}</>;
};

export default CsvResult;
