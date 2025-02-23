import { FC } from 'react';
import { ErrorResponse } from '../../model/errorResponse';
import { ErrorResult } from '..';
import { DepreiationCsvItems, DepreiationCsvResponse } from '../../model/depreiationCsvResponse';
import { ItemCsvItems, ItemCsvResponse } from '../../model/itemCsvResponse';

type Props = {
  result: DepreiationCsvResponse | ItemCsvResponse | ErrorResponse;
};

const CsvResult: FC<Props> = (props) => {
  return (
    <>
      {'code' in props.result && 'message' in props.result ? (
        <ErrorResult result={props.result} />
      ) : 'items' in props.result ? (
        <div>
          {props.result.items.map((item: ItemCsvItems, index: number) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.product_number}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {props.result.depreciation_items.map((item: DepreiationCsvItems, index: number) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.durability}</p>
              <p>{item.product_number}</p>
              <p>{item.purchase_price}</p>
              <p>{item.purchase_year}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CsvResult;
