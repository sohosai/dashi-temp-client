import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IndividualItemResult, Loading } from '../../components';
import { IndividualItemResponse } from '../../model/individualItemResponse';
import { Pending } from '../../model/pending';
import { ErrorResponse } from '../../model/error';
import { useFetchIndividualData } from '../../hooks/useFetchIndividualData';

const IndividualItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  // get individual item result
  const result: IndividualItemResponse | ErrorResponse | Pending | null = useFetchIndividualData(id);
  return (
    <>
      {typeof id === 'undefined' ? (
        // 発生しないはず
        <></>
      ) : (
        <>
          {result === null || result === 'pending' ? (
            // 処理中
            <Loading />
          ) : 'code' in result && 'message' in result ? (
            // fetchに失敗
            <>
              <p>{result.code}</p>
              <p>{result.message}</p>
              <Link to={`/`}>Home</Link>
            </>
          ) : (
            // fetch成功
            <>
              <Link to={`/item/${id}/update`}>更新リンク</Link>
              <IndividualItemResult result={result} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default IndividualItem;
