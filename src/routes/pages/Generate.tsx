import { FC, useState } from 'react';
import { GenerateResponse } from '../../model/generateResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { GenerateForm, GenerateResult, Loading } from '../../components';

const Generate: FC = () => {
  // get generate result
  const [result, setResult] = useState<GenerateResponse | ErrorResponse | Pending | null>(null);
  return (
    <>
      <h1>Generate</h1>
      <GenerateForm setResult={setResult} />
      {result === null ? (
        //初期表示
        <></>
      ) : result === 'pending' ? (
        // 処理中
        <Loading />
      ) : (
        // fetch結果
        <GenerateResult result={result} />
      )}
    </>
  );
};

export default Generate;
