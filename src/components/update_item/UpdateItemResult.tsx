import { FC } from 'react';
import { OkResponse } from '../../model/ok';
import { Link } from 'react-router-dom';
import { ErrorResponse } from '../../model/error';

type Props = {
  result: OkResponse | ErrorResponse;
};

const UpdateItemResult: FC<Props> = (props) => {
  return (
    <>
      {props.result == 'ok' ? (
        <>
          <p>{props.result}</p>
          <Link to="/">Home</Link>
        </>
      ) : (
        <>
          <p>{props.result.code}</p>
          <p>{props.result.message}</p>
          <Link to="/">Home</Link>
        </>
      )}
    </>
  );
};

export default UpdateItemResult;
