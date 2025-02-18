import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { searchItemSchema, SearchItemSchemaType } from '../../validation/searchItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
  keywords: string;
};

const SearchItemForm: FC<Props> = (props) => {
  const navigate = useNavigate();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchItemSchemaType>({
    resolver: zodResolver(searchItemSchema),
    defaultValues: {
      keywords: props.keywords,
    },
  });
  // update url
  const onSubmit: SubmitHandler<SearchItemSchemaType> = (formData) => {
    navigate(`?keywords=${formData.keywords}`);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="keywords">Search: </label>
      <input id="keywords" type="text" {...register('keywords')} placeholder="Search" />
      <br />
      <ErrorMessage errors={errors} name="keywords" message={errors.keywords?.message} />
      <br />
      <input type="submit" value="検索" />
    </form>
  );
};

export default SearchItemForm;
