import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, FC, SetStateAction } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { generateSchema, GenerateSchemaType } from '../../validation/generate';
import { useFetchGenerate } from '../../hooks/useFetchGenerate';
import { ErrorResponse } from '../../model/errorResponse';
import { Pending } from '../../model/pending';
import { GenerateResponse } from '../../model/generateResponse';
import { Record } from '../../model/generateRequest';

type Props = {
  setResult: Dispatch<SetStateAction<GenerateResponse | ErrorResponse | Pending | null>>;
  setRecordType: Dispatch<SetStateAction<Record | null>>;
};

const GenerateForm: FC<Props> = (props) => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GenerateSchemaType>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      quantity: 49,
      record: 'Qr',
    },
  });
  // update url
  const onSubmit: SubmitHandler<GenerateSchemaType> = async (formData) => {
    props.setResult('pending');
    const result: GenerateResponse | ErrorResponse = await useFetchGenerate(formData.quantity, formData.record);
    props.setRecordType(formData.record);
    props.setResult(result);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="quantity">Quantity: </label>
      <input id="quantity" type="number" {...register('quantity')} />
      <br />
      <ErrorMessage errors={errors} name="quantity" message={errors.quantity?.message} />
      <br />
      <label htmlFor="record">Record: </label>
      <select id="record" {...register('record')}>
        <option value="Qr">QR</option>
        <option value="Barcode">バーコード</option>
        <option value="Nothing">なし</option>
      </select>
      <br />
      <ErrorMessage errors={errors} name="record" message={errors.record?.message} />
      <br />
      <input type="submit" value="生成" />
    </form>
  );
};

export default GenerateForm;
