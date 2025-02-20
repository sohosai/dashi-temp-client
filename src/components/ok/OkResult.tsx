import { FC } from 'react';
import { Link } from 'react-router-dom';
import { OkResponse } from '../../model/okResponse';

type Props = {
  result: OkResponse;
};

const OkResult: FC<Props> = (props) => {
  return (
    <>
      <p>{props.result}</p>
      <Link to="/">Home</Link>
    </>
  );
};

export default OkResult;
