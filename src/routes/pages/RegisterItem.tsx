import { FC, useState } from 'react';
import { Loading, RegisterItemForm } from '../../components';
import { ErrorResponse } from '../../model/error';
import { OkResponse } from '../../model/ok';
import RegisterItemResult from '../../components/register_item/RegisterItemResult';
import { Pending } from '../../model/pending';

const Register: FC = () => {
  const [result, setResult] = useState<OkResponse | ErrorResponse | Pending | null>(null);
  return (
    <>
      <h1>Register</h1>
      {result === null ? (
        // 処理中
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

export default Register;
