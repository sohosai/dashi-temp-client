import { FC, useState } from 'react';
import { useFetchDepreiationCsv } from '../../hooks/useFetchDepreiationCsv';
import { DepreiationCsvResponse } from '../../model/depreiationCsvResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { useDownloadCsv } from '../../hooks/useDownloadCsv';
import { useDepreiationCsvConverter } from '../../hooks/useDepreiationCsvConverter';
import { DepreiationCsvList } from '../../model/depreiationCsv';
import { OkResponse } from '../../model/okResponse';
import { Pending } from '../../model/pending';
import { Loading } from '..';
import CsvResult from './CsvResult';
import ReactModal from 'react-modal';

const header = [
  { header: '物品名', key: 'name' },
  { header: '型番', key: 'product_number' },
  { header: '耐用年数', key: 'durability' },
  { header: '購入年度', key: 'purchase_year' },
  { header: '購入金額', key: 'purchase_price' },
];

const DepreiationCsvButton: FC = () => {
  // set result
  const [result, setResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
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
    const result: DepreiationCsvResponse | ErrorResponse = await useFetchDepreiationCsv();
    if ('code' in result && 'message' in result) {
      // Error
      setResult(result);
      return;
    } else {
      // Ok
      const body: DepreiationCsvList = useDepreiationCsvConverter(result);
      await useDownloadCsv('depreiation.csv', '減価償却', header, body);
      setResult('ok');
      return;
    }
  };
  return (
    <>
      <button onClick={(e) => handlerClick(e)}>減価償却のCSV</button>
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

export default DepreiationCsvButton;
