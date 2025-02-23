import { FC } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import { useDownloadCsv } from '../../hooks/useDownloadCsv';
import { ItemCsvResponse } from '../../model/itemCsvResponse';
import { useFetchItemCsv } from '../../hooks/useFetchItemCsv';
import { useItemCsvConverter } from '../../hooks/useItemCsvConverter';
import { ItemCsvList } from '../../model/itemCsv';

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
  const handlerClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const result: ItemCsvResponse | ErrorResponse = await useFetchItemCsv();
    if ('code' in result && 'message' in result) {
      // Error
    } else {
      // Ok
      const body: ItemCsvList = useItemCsvConverter(result);
      await useDownloadCsv('item_list.csv', '物品リスト', header, body);
    }
  };
  return <button onClick={(e) => handlerClick(e)}>物品リストのCSV</button>;
};

export default ItemCsvButton;
