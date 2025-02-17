import { FC } from 'react';
import { OkResponse } from '../model/ok';
import { Link } from 'react-router-dom';

type Props = {
  result: OkResponse;
};

const UpdateItemResult: FC<Props> = (props) => {
  return (
    <>
      <p>{props.result}</p>
      <Link to="/">Home</Link>
    </>
  );
};

export default UpdateItemResult;
