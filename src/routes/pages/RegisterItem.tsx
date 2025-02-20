import { FC, useState } from 'react';
import { Loading, RegisterItemForm, RegisterItemResult } from '../../components';
import { ErrorResponse } from '../../model/errorResponse';
import { OkResponse } from '../../model/okResponse';
import { Pending } from '../../model/pending';

const RegisterItem: FC = () => {
  const [result, setResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  return (
    <>
      <h1>Register</h1>
      {result === null ? (
        // 初期表示
        <RegisterItemForm setResult={setResult} />
      ) : result === 'pending' ? (
        // 処理中
        <Loading />
      ) : (
        // fetch結果
        <RegisterItemResult result={result} />
      )}
    </>
  );
};

export default RegisterItem;
