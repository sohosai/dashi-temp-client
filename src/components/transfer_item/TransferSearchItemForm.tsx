import { SubmitHandler, useForm } from 'react-hook-form';
import { searchItemSchema, SearchItemSchemaType } from '../../validation/searchItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SearchItemsResponse } from '../../model/searchItemResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { useFetchSearchItemWithoutUseEffect } from '../../hooks/useFetchSearchItemWithoutUseEffect';
import { OkResponse } from '../../model/okResponse';
import TransferSearchItemResult from './TransferSearchItemResult';

type Props = {
  id: string;
  setTransferResult: Dispatch<SetStateAction<OkResponse | ErrorResponse | Pending | null>>;
};

const TransferSearchItemForm: FC<Props> = (props) => {
  // get keywords
  const [keywords, setKeywords] = useState<string>('');
  // get search result
  const [searchResult, setSearchResult] = useState<SearchItemsResponse | ErrorResponse | Pending | null>(null);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchItemSchemaType>({
    resolver: zodResolver(searchItemSchema),
  });
  // update url
  const onSubmit: SubmitHandler<SearchItemSchemaType> = async (formData) => {
    setKeywords(formData.keywords);
    const data: SearchItemsResponse | ErrorResponse | Pending | null = await useFetchSearchItemWithoutUseEffect(
      formData.keywords
    );
    setSearchResult(data);
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
      <TransferSearchItemResult
        keywords={keywords}
        result={searchResult}
        id={props.id}
        setTransferResult={props.setTransferResult}
      />
    </>
  );
};

export default TransferSearchItemForm;
