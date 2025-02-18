import { Dispatch, FC, SetStateAction } from 'react';
import { IndividualItemResponse } from '../../model/individualItemResponse';
import { ErrorResponse } from '../../model/errorResponse';
import { updateItemSchema, UpdateItemSchemaType } from '../../validation/updateItem';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { OkResponse } from '../../model/okResponse';
import { Pending } from '../../model/pending';
import { useFetchUpdateData } from '../../hooks/useFetchUpdateData';

type Props = {
  individualItem: IndividualItemResponse;
  setResult: Dispatch<SetStateAction<OkResponse | ErrorResponse | Pending | null>>;
};

const UpdateItemForm: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateItemSchemaType>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      name: props.individualItem === null ? '' : props.individualItem.name,
      visible_id: props.individualItem === null ? '' : props.individualItem.visible_id,
      product_number: props.individualItem === null ? '' : props.individualItem.product_number,
      description: props.individualItem === null ? '' : props.individualItem.description,
      purchase_year: props.individualItem === null ? null : props.individualItem.purchase_year,
      purchase_price: props.individualItem === null ? null : props.individualItem.purchase_price,
      durability: props.individualItem === null ? null : props.individualItem.durability,
      is_depreciation: props.individualItem === null ? false : props.individualItem.is_depreciation,
      connector:
        props.individualItem === null ? [] : props.individualItem.connector.map((connector) => ({ connector })),
      color: props.individualItem === null ? [] : props.individualItem.color.split('^').map((color) => ({ color })),
    },
  });

  const onSubmit: SubmitHandler<UpdateItemSchemaType> = async (formData) => {
    props.setResult('pending');
    const result: ErrorResponse | OkResponse = await useFetchUpdateData(formData, props.individualItem.id);
    props.setResult(result);
  };

  const connectorArray = useFieldArray({
    name: 'connector',
    control,
  });
  const colorArray = useFieldArray({
    name: 'color',
    control,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name: </label>
      <input id="name" type="text" {...register('name')} />
      <br />
      <ErrorMessage errors={errors} name="name" message={errors.name?.message} />
      <br />
      <label htmlFor="visible_id">Visible ID: </label>
      <input id="visible_id" type="text" {...register('visible_id')} />
      <br />
      <ErrorMessage errors={errors} name="visible_id" message={errors.visible_id?.message} />
      <br />
      <label htmlFor="product_number">Product Number: </label>
      <input id="product_number" type="text" {...register('product_number')} />
      <br />
      <ErrorMessage errors={errors} name="product_number" message={errors.product_number?.message} />
      <br />
      <label htmlFor="description">Description: </label>
      <input id="description" type="text" {...register('description')} />
      <br />
      <ErrorMessage errors={errors} name="description" message={errors.description?.message} />
      <br />
      <label htmlFor="purchase_year">Purchase Year: </label>
      <input id="purchase_year" type="number" {...register('purchase_year', { valueAsNumber: true })} />
      <br />
      <ErrorMessage errors={errors} name="purchase_year" message={errors.purchase_year?.message} />
      <br />
      <label htmlFor="purchase_price">Purchase Price: </label>
      <input id="purchase_price" type="number" {...register('purchase_price', { valueAsNumber: true })} />
      <br />
      <ErrorMessage errors={errors} name="purchase_price" message={errors.purchase_price?.message} />
      <br />
      <label htmlFor="durability">Durability: </label>
      <input id="durability" type="number" {...register('durability', { valueAsNumber: true })} />
      <br />
      <ErrorMessage errors={errors} name="durability" message={errors.durability?.message} />
      <br />
      <label htmlFor="is_depreciation">Is Depreciation: </label>
      <input id="is_depreciation" type="checkbox" {...register('is_depreciation')} />
      <br />
      <ErrorMessage errors={errors} name="is_depreciation" message={errors.is_depreciation?.message} />
      <br />
      <label htmlFor="connector">Connector: </label>
      {connectorArray.fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor="connector">{index}</label>
          <input id="connector" type="text" {...register(`connector.${index}.connector`)} />
          {index >= 0 && <input type="submit" value="✕" onClick={() => connectorArray.remove(index)} />}
        </div>
      ))}
      <br />
      <ErrorMessage errors={errors} name="connector" message={errors.connector?.message} />
      <br />
      <input type="button" value="端子の追加" onClick={() => connectorArray.append({ connector: '' })} />
      <br />
      <label htmlFor="color">Color: </label>
      {colorArray.fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor="color">{index}</label>
          <input id="color" type="text" {...register(`color.${index}.color`)} />
          {index >= 0 && <input type="submit" value="✕" onClick={() => colorArray.remove(index)} />}
        </div>
      ))}
      <br />
      <ErrorMessage errors={errors} name="color" message={errors.color?.message} />
      <br />
      <input type="button" value="色の追加" onClick={() => colorArray.append({ color: '' })} />
      <br />
      <input type="submit" value="更新" />
    </form>
  );
};

export default UpdateItemForm;
