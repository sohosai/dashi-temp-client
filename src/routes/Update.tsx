import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IndividualItemResponse } from '../model/individualItemResponse';
import { ErrorResponse } from '../model/error';
import { Pending } from '../model/pending';
import { useFetchIndividualData } from '../hooks/useFetchIndividualData';
import { Loading, UpdateItemForm } from '..';
import { OkResponse } from '../model/ok';
import UpdateItemResult from '../components/UpdateItemResult';

const UpdateItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  // get individual item result
  const individualItem: IndividualItemResponse | ErrorResponse | Pending | null = useFetchIndividualData(id);
  return (
    <>
      {typeof id === 'undefined' ? (
        // 発生しないはず
        <></>
      ) : (
        <>
          {individualItem === null || individualItem === 'pending' ? (
            // 処理中
            <Loading />
          ) : 'code' in individualItem && 'message' in individualItem ? (
            // fetchに失敗
            <>
              <p>{individualItem.code}</p>
              <p>{individualItem.message}</p>
              <Link to={`/`}>Home</Link>
            </>
          ) : (
            // fetch成功 (formを表示)
            <>
              {result === null ? (
                // 処理中
                <UpdateItemForm individualItem={individualItem} setResult={setResult} />
              ) : result === 'pending' ? (
                // 処理中
                <Loading />
              ) : result === 'ok' ? (
                // fetch成功
                <UpdateItemResult result={result} />
              ) : (
                // fetchに失敗
                <>
                  <p>{result.code}</p>
                  <p>{result.message}</p>
                  <Link to="/">Home</Link>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default UpdateItem;
