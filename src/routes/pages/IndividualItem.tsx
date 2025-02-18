import { FC, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DeleteItemButton, DeleteItemResult, IndividualItemResult, Loading } from '../../components';
import { IndividualItemResponse } from '../../model/individualItemResponse';
import { Pending } from '../../model/pending';
import { ErrorResponse } from '../../model/errorResponse';
import { useFetchIndividualData } from '../../hooks/useFetchIndividualData';
import { OkResponse } from '../../model/okResponse';

const IndividualItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  // get individual item result
  const result: IndividualItemResponse | ErrorResponse | Pending | null = useFetchIndividualData(id);
  // set delete result
  const [deleteResult, setDeleteResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
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
              <DeleteItemButton id={id} setResult={setDeleteResult} />
              {/*Deleteの処理*/}
              {deleteResult === null ? (
                // 初期表示
                <></>
              ) : deleteResult === 'pending' ? (
                // 処理中
                // modal表示する
                <Loading />
              ) : (
                // fetch結果
                // modal表示する
                <DeleteItemResult result={deleteResult} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default IndividualItem;
