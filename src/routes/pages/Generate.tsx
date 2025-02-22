import { FC, useState } from 'react';
import { GenerateResponse } from '../../model/generateResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { GenerateForm, GenerateResult, Loading } from '../../components';
import { Record } from '../../model/generateRequest';

const Generate: FC = () => {
  // get generate result
  const [result, setResult] = useState<GenerateResponse | ErrorResponse | Pending | null>(null);
  // get record type
  const [recordType, setRecordType] = useState<Record | null>(null);
  return (
    <>
      <h1>Generate</h1>
      <GenerateForm setResult={setResult} setRecordType={setRecordType} />
      {result === null ? (
        //初期表示
        <></>
      ) : result === 'pending' ? (
        // 処理中
        <Loading />
      ) : (
        // fetch結果
        <GenerateResult result={result} recordType={recordType} />
      )}
    </>
  );
};

export default Generate;
