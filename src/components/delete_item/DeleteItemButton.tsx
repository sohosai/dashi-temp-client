import { Dispatch, FC, SetStateAction } from 'react';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { useFetchDeleteData } from '../../hooks/useFetchDeleteData';

type Props = {
  id: string;
  setResult: Dispatch<SetStateAction<OkResponse | ErrorResponse | Pending | null>>;
};

const DeleteItemButton: FC<Props> = (props) => {
  const handleClick = async () => {
    props.setResult('pending');
    const result = await useFetchDeleteData(parseInt(props.id));
    props.setResult(result);
  };
  return <button onClick={handleClick}>Delete</button>;
};

export default DeleteItemButton;
