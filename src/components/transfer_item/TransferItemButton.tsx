import { Dispatch, FC, SetStateAction } from 'react';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { useFetchTransferData } from '../../hooks/useFetchTransferData';

type Props = {
  id: string;
  parent_id: number;
  setResult: Dispatch<SetStateAction<OkResponse | ErrorResponse | Pending | null>>;
};

const DeleteItemButton: FC<Props> = (props) => {
  const handleClick = async () => {
    props.setResult('pending');
    const result = await useFetchTransferData(parseInt(props.id), props.parent_id);
    props.setResult(result);
  };
  return <button onClick={handleClick}>Move</button>;
};

export default DeleteItemButton;
