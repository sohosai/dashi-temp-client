import { FC } from 'react';
import { SearchItemResponse, SearchItemsResponse } from '../../model/searchItemResponse';
import { Link } from 'react-router-dom';
import { ErrorResult } from '..';
import { ErrorResponse } from '../../model/errorResponse';

type Props = {
  result: SearchItemsResponse | ErrorResponse;
};

const SearchItemResult: FC<Props> = (props) => {
  return (
    <>
      {'code' in props.result && 'message' in props.result ? (
        <ErrorResult result={props.result} />
      ) : (
        <>
          {props.result.search_items.map((item: SearchItemResponse, index: number) =>
            item.id === 1 ? (
              // 筑波大学のレンタルを拒否
              <div key={index}>
                <h2>{item.name}</h2>
                <p>{item.id}</p>
                <p>{item.visible_id}</p>
                <p>{item.connector.join(',')}</p>
                <p>{item.color}</p>
                <p>レンタル不可</p>
                <Link to={`/item/${item.id}`}>詳細</Link>
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
                <Link to={`/item/${item.id}`}>詳細</Link>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

export default SearchItemResult;
