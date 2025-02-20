import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TransferItemModalButton: FC<Props> = (props) => {
  const handleClick = async (): Promise<void> => {
    props.setIsOpen(!props.modalIsOpen);
  };
  return <button onClick={handleClick}>Move</button>;
};

export default TransferItemModalButton;
