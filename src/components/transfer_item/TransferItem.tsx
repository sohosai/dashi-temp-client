import { FC, useState } from 'react';
import { Loading } from '..';
import ReactModal from 'react-modal';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import TransferItemModalButton from './TransferItemModalButton';
import TransferSearchItemForm from './TransferSearchItemForm';
import TransferItemResult from './TransferItemResult';

type Props = {
  id: string;
};

ReactModal.setAppElement('#root');

const TransferItemModal: FC<Props> = (props) => {
  // set modal state
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // set tranfer result
  const [transferResult, setTransferResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  // handle modal open/close
  const handleOpen = (): void => {
    setIsOpen(true);
  };
  const handleClose = (): void => {
    setIsOpen(false);
    setTransferResult(null);
  };
  return (
    <>
      <TransferItemModalButton modalIsOpen={modalIsOpen} setIsOpen={handleOpen} />
      <ReactModal
        isOpen={modalIsOpen}
        contentLabel="Modal2"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            minWidth: '320px',
            maxWidth: '900px',
            overflowY: 'scroll',
          },
        }}
      >
        {transferResult === null ? (
          // 初期表示
          <>
            <button onClick={handleClose}>Close</button>
            <TransferSearchItemForm id={props.id} setTransferResult={setTransferResult} />
          </>
        ) : transferResult === 'pending' ? (
          // 処理中
          <Loading />
        ) : (
          // fetch結果
          <>
            <button onClick={handleClose}>Close</button>
            <TransferItemResult result={transferResult} />
          </>
        )}
      </ReactModal>
    </>
  );
};

export default TransferItemModal;
