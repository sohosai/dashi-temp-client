import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DeleteItem, ErrorResult, IndividualItemResult, Loading, TransferItem } from '../../components';
import { IndividualItemResponse } from '../../model/individualItemResponse';
import { Pending } from '../../model/pending';
import { ErrorResponse } from '../../model/errorResponse';
import { useFetchIndividualData } from '../../hooks/useFetchIndividualData';

const IndividualItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  // get individual item result
  const result: IndividualItemResponse | ErrorResponse | Pending | null = useFetchIndividualData(id);
  return (
    <>
      {typeof id === 'undefined' ? (
        // 発生しないはず
        <h2>Unexpected Error</h2>
      ) : (
        <>
          {result === null || result === 'pending' ? (
            // 処理中
            <Loading />
          ) : 'code' in result && 'message' in result ? (
            // fetchに失敗
            <ErrorResult result={result} />
          ) : (
            // fetch成功
            <>
              <Link to={`/item/${id}/update`}>更新リンク</Link>
              <IndividualItemResult result={result} />
              {/*Transfer*/}
              <h1>Transfer</h1>
              <TransferItem id={id} />
              {/*Delete*/}
              <h1>Delete</h1>
              <DeleteItem id={id} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default IndividualItem;
