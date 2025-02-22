import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DeleteItem, ErrorResult, IndividualItemResult, Loading, TransferItem } from '../../components';
import { IndividualItemResponse } from '../../model/individualItemResponse';
import { Pending } from '../../model/pending';
import { ErrorResponse } from '../../model/errorResponse';
import { useFetchIndividualItem } from '../../hooks/useFetchIndividualItem';

const IndividualItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  // get individual item result
  const result: IndividualItemResponse | ErrorResponse | Pending | null = useFetchIndividualItem(id);
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
              <TransferItem id={id} />
              {/*Delete*/}
              <DeleteItem id={id} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default IndividualItem;
