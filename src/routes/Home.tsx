import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { SearchItemsResponse } from '../model/searchItemResponse';
import { useFetchSearchData } from '../hooks/useFetchSearchData';
import { Loading, SearchItemForm, SearchItemResult } from '..';
import { ErrorResponse } from '../model/error';
import { Pending } from '../model/pending';

const Home: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywords = searchParams.get('keywords') || '';
  // get search result
  const result: SearchItemsResponse | ErrorResponse | Pending | null = useFetchSearchData(keywords);
  return (
    <>
      <SearchItemForm keywords={keywords} />
      {keywords === '' ? (
        // 検索欄が空
        <></>
      ) : result === null || result === 'pending' ? (
        // 処理中
        <Loading />
      ) : 'code' in result && 'message' in result ? (
        // fetchに失敗
        <>
          <p>{result.code}</p>
          <p>{result.message}</p>
        </>
      ) : (
        // fetch成功
        <SearchItemResult result={result} />
      )}
    </>
  );
};

export default Home;
