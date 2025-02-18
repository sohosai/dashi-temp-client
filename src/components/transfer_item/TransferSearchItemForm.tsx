import { SubmitHandler, useForm } from 'react-hook-form';
import { searchItemSchema, SearchItemSchemaType } from '../../validation/searchItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SearchItemsResponse } from '../../model/searchItemResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { useFetchSearchData } from '../../hooks/useFetchSearchData';
import { Loading } from '..';

type Props = {
  id: string;
};

const TransferSearchItemForm: FC<Props> = (props) => {
  // get keywords
  const [keywords, setKeywords] = useState<string>('');
  // get search result
  const [result, setResult] = useState<SearchItemsResponse | ErrorResponse | Pending | null>(null);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchItemSchemaType>({
    resolver: zodResolver(searchItemSchema),
  });
  // update url
  const onSubmit: SubmitHandler<SearchItemSchemaType> = (formData) => {
    setKeywords(formData.keywords);
    const data: SearchItemsResponse | ErrorResponse | Pending | null = useFetchSearchData(formData.keywords);
    setResult(data);
  };
  return (
    <>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="keywords">Search: </label>
        <input id="keywords" type="text" {...register('keywords')} placeholder="Search" />
        <br />
        <ErrorMessage errors={errors} name="keywords" message={errors.keywords?.message} />
        <br />
        <input type="submit" value="検索" />
      </form>
      {/* result */}
      <div>
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
          <>
            {result.search_items.map((item, index) =>
              item.id === 1 ? (
                // 筑波大学のレンタルを拒否
                <div key={index}>
                  <h2>{item.name}</h2>
                  <p>{item.id}</p>
                  <p>{item.visible_id}</p>
                  <p>{item.connector.join(',')}</p>
                  <p>{item.color}</p>
                  <p>レンタル不可</p>
                  {/* <TransferItemButton id={parseInt(props.id)} parent_id={item.visible_id} /> */}
                </div>
              ) : (
                // それ以外
                <div key={index}>
                  <h2>{item.name}</h2>
                  <p>{item.id}</p>
                  <p>{item.visible_id}</p>
                  <p>{item.connector.join(',')}</p>
                  <p>{item.color}</p>
                  <p>{item.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
                  {/* <TransferItemButton id={parseInt(props.id)} parent_id={item.visible_id} /> */}
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default TransferSearchItemForm;
