import { FC } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import { Link } from 'react-router-dom';

type Props = {
  result: ErrorResponse;
};

const ErrorResult: FC<Props> = (props) => {
  return (
    <>
      <p>{props.result.code}</p>
      <p>{props.result.message}</p>
      <Link to="/">Home</Link>
    </>
  );
};

export default ErrorResult;
