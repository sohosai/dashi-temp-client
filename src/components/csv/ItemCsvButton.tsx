import { FC, useState } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import { useDownloadCsv } from '../../hooks/useDownloadCsv';
import { ItemCsvResponse } from '../../model/itemCsvResponse';
import { useFetchItemCsv } from '../../hooks/useFetchItemCsv';
import { useItemCsvConverter } from '../../hooks/useItemCsvConverter';
import { ItemCsvList } from '../../model/itemCsv';
import { Pending } from '../../model/pending';
import { Loading } from '..';
import CsvResult from './CsvResult';
import ReactModal from 'react-modal';

const header = [
  { header: '物品名', key: 'name' },
  { header: '型番', key: 'product_number' },
  { header: '物品詳細', key: 'description' },
  //TODO: 保管場所の変更を忘れない
  { header: '保管場所', key: 'place' },
  //////////////////////////////////////////
  { header: '個数', key: 'quantity' },
  { header: '使用用途', key: 'usage' },
  { header: '使用時期', key: 'duration' },
  { header: '年間必要数', key: 'required_quantity' },
];

const ItemCsvButton: FC = () => {
  // set result
  const [result, setResult] = useState<ItemCsvResponse | ErrorResponse | Pending | null>(null);
  // set modal state
  const [modalIsOpen, setIsOpen] = useState<boolean>(true);
  // handle modal close
  const handleClose = (): void => {
    setIsOpen(false);
  };
  // generate and donload csv
  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(true);
    setResult('pending');
    const result: ItemCsvResponse | ErrorResponse = await useFetchItemCsv();
    if ('code' in result && 'message' in result) {
      // Error
      setResult(result);
    } else {
      // Ok
      const body: ItemCsvList = useItemCsvConverter(result);
      await useDownloadCsv('item_list.csv', '物品リスト', header, body);
      setResult(result);
    }
  };
  return (
    <>
      <button onClick={(e) => handlerClick(e)}>物品リストのCSV</button>
      {result === null ? (
        //初期表示
        <></>
      ) : (
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
          {result === 'pending' ? (
            // 処理中
            <Loading />
          ) : (
            // fetch結果
            <>
              <button onClick={handleClose}>Close</button>
              <CsvResult result={result} />
            </>
          )}
        </ReactModal>
      )}
    </>
  );
};

export default ItemCsvButton;
