import { FC } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import ErrorResult from '../error/ErrorResult';
import { GenerateResponse } from '../../model/generateResponse';

type Props = {
  result: GenerateResponse | ErrorResponse;
};

const GenerateResult: FC<Props> = (props) => {
  return (
    <>
      {'code' in props.result && 'message' in props.result ? (
        <>
          <ErrorResult result={props.result} />
        </>
      ) : (
        <>
          {props.result.visible_ids.map((id, index) => (
            <div key={index}>
              <p>id: {id}</p>
              <p>index: {index}</p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default GenerateResult;
