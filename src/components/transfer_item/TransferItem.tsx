import { FC, useState } from 'react';
import { Loading, TransferItemModalButton, TransferItemResult, TransferSearchItemForm } from '..';
import ReactModal from 'react-modal';
import { OkResponse } from '../../model/okResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';

type Props = {
  id: string;
};

ReactModal.setAppElement('#root');

const TransferItemModal: FC<Props> = (props) => {
  // set modal state
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // set tranfer result
  const [transferResult, setTransferResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  return (
    <>
      <TransferItemModalButton modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
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
            <button onClick={() => setIsOpen(!modalIsOpen)}>Close</button>
            <TransferSearchItemForm id={props.id} />
          </>
        ) : transferResult === 'pending' ? (
          // 処理中
          <Loading />
        ) : (
          // fetch結果
          <TransferItemResult result={transferResult} />
        )}
      </ReactModal>
    </>
  );
};

export default TransferItemModal;
