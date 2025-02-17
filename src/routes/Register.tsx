import { FC, useState } from 'react';
import { Loading, RegisterItemForm } from '..';
import { ErrorResponse } from '../model/error';
import { OkResponse } from '../model/ok';
import RegisterItemResult from '../components/RegisterItemResult';
import { Link } from 'react-router-dom';

const Register: FC = () => {
  const [result, setResult] = useState<OkResponse | ErrorResponse | null>(null);
  return (
    <>
      <h1>Register</h1>
      {result === null ? (
        // 処理中
        <RegisterItemForm setResult={setResult} />
      ) : !(result === 'ok') ? (
        // fetchに失敗
        <>
          <p>{result.code}</p>
          <p>{result.message}</p>
          <Link to="/">Home</Link>
        </>
      ) : (
        // fetch成功
        <RegisterItemResult result={result} />
      )}
    </>
  );
};

export default Register;
