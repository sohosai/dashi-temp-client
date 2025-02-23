import { FC } from 'react';
import { useFetchDepreiationCsv } from '../../hooks/useFetchDepreiationCsv';
import { DepreiationCsvResponse } from '../../model/depreiationCsvResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { useDownloadCsv } from '../../hooks/useDownloadCsv';
import { useDepreiationCsvConverter } from '../../hooks/useDepreiationCsvConverter';
import { DepreiationCsvList } from '../../model/depreiationCsv';

const header = [
  { header: '物品名', key: 'name' },
  { header: '型番', key: 'product_number' },
  { header: '耐用年数', key: 'durability' },
  { header: '購入年度', key: 'purchase_year' },
  { header: '購入金額', key: 'purchase_price' },
];

const DepreiationCsvButton: FC = () => {
  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const result: DepreiationCsvResponse | ErrorResponse = await useFetchDepreiationCsv();
    if ('code' in result && 'message' in result) {
      // Error
    } else {
      // Ok
      const body: DepreiationCsvList = useDepreiationCsvConverter(result);
      await useDownloadCsv('depreiation.csv', '減価償却', header, body);
    }
  };
  return <button onClick={(e) => handlerClick(e)}>減価償却のCSV</button>;
};

export default DepreiationCsvButton;
