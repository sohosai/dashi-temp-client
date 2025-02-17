import { FC, useState } from 'react';
import { Loading, RegisterItemForm } from '..';
import { ErrorResponse } from '../model/error';
import { OkResponse } from '../model/ok';
import RegisterItemResult from '../components/RegisterItemResult';
import { Link } from 'react-router-dom';
import { Pending } from '../model/pending';

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
      ) : result === 'ok' ? (
        // fetch成功
        <RegisterItemResult result={result} />
      ) : (
        // fetchに失敗
        <>
          <p>{result.code}</p>
          <p>{result.message}</p>
          <Link to="/">Home</Link>
        </>
      )}
    </>
  );
};

export default Register;
