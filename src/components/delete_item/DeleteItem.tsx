import { FC, useState } from 'react';
import { Pending } from '../../model/pending';
import { ErrorResponse } from '../../model/errorResponse';
import { OkResponse } from '../../model/okResponse';
import { Loading } from '..';
import ReactModal from 'react-modal';
import DeleteItemButton from './DeleteItemButton';
import DeleteItemResult from './DeleteItemResult';

type Props = {
  id: string;
};

ReactModal.setAppElement('#root');

const DeleteItemModal: FC<Props> = (props) => {
  // set modal state
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  // set delete result
  const [result, setResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  return (
    <>
      <DeleteItemButton id={props.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setResult={setResult} />
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
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            minWidth: '320px',
            maxWidth: '900px',
          },
        }}
      >
        {result === null ? (
          // 初期表示
          <></>
        ) : result === 'pending' ? (
          // 処理中
          <Loading />
        ) : (
          // fetch結果
          <DeleteItemResult result={result} />
        )}
      </ReactModal>
    </>
  );
};

export default DeleteItemModal;
