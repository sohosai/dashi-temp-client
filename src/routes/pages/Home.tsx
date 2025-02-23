import { Link, useLocation } from 'react-router-dom';
import { FC } from 'react';
import { SearchItemsResponse } from '../../model/searchItemResponse';
import { useFetchSearchItemWithUseEffect } from '../../hooks/useFetchSearchItemWithUseEffect';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { DepreiationCsvButton, ItemCsvButton, Loading, SearchItemForm, SearchItemResult } from '../../components';

const Home: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keywords = searchParams.get('keywords') || '';
  // get search result
  const result: SearchItemsResponse | ErrorResponse | Pending | null = useFetchSearchItemWithUseEffect(keywords);
  return (
    <>
      <SearchItemForm keywords={keywords} />
      <Link to="/register">Register</Link>
      <DepreiationCsvButton />
      <ItemCsvButton />
      {keywords === '' ? (
        // 検索欄が空
        <></>
      ) : result === null || result === 'pending' ? (
        // 処理中
        <Loading />
      ) : (
        // fetch結果
        <SearchItemResult result={result} />
      )}
    </>
  );
};

export default Home;
