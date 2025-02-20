import { Dispatch, FC, SetStateAction } from 'react';
import { SearchItemsResponse } from '../../model/searchItemResponse';
import { ErrorResult, Loading } from '..';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { OkResponse } from '../../model/okResponse';
import TransferItemButton from './TransferItemButton';

type Props = {
  keywords: string;
  result: SearchItemsResponse | ErrorResponse | Pending | null;
  id: string;
  setTransferResult: Dispatch<SetStateAction<OkResponse | ErrorResponse | Pending | null>>;
};

const TransferSearchItemResult: FC<Props> = (props) => {
  return (
    <>
      {props.keywords === '' ? (
        // 検索欄が空 (SearchItemについて)
        <></>
      ) : props.result === null || props.result === 'pending' ? (
        // 処理中 (SearchItemについて)
        <Loading />
      ) : 'code' in props.result && 'message' in props.result ? (
        // fetchに失敗 (SearchItemについて)
        <ErrorResult result={props.result} />
      ) : (
        // fetch成功 (SearchItemについて)
        <>
          {props.result.search_items.map((item, index) =>
            item.id === 1 ? (
              // 筑波大学のレンタルを拒否
              <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.id}</p>
                <p>{item.visible_id}</p>
                <p>{item.connector.join(',')}</p>
                <p>{item.color}</p>
                <p>レンタル不可</p>
                <TransferItemButton id={props.id} parent_id={item.id} setResult={props.setTransferResult} />
              </div>
            ) : (
              // それ以外
              <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.id}</p>
                <p>{item.visible_id}</p>
                <p>{item.connector.join(',')}</p>
                <p>{item.color}</p>
                <p>{item.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
                <TransferItemButton id={props.id} parent_id={item.id} setResult={props.setTransferResult} />
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default TransferSearchItemResult;
