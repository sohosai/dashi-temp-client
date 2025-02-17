import { FC, useEffect, useState } from 'react';
import { IndividualItemResponse } from '../model/individualItemResponse';
import { ErrorResponse } from '../model/error';
import { updateItemSchema, UpdateItemSchemaType } from '../validation/updateItem';
import { UpdateItemRequest } from '../model/updateItemRequest';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

type Props = {
  id: number;
};

const UpdateItemForm: FC<Props> = (props) => {
  const [individualItem, setIndividualItem] = useState<IndividualItemResponse | ErrorResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result: IndividualItemResponse | ErrorResponse = await fetch(
        `http://localhost:5000/api/item/update/${props.id}`
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));
      setIndividualItem(result);
    };
    fetchData();
  }, [props.id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateItemSchemaType>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      name:
        individualItem === null
          ? ''
          : 'code' in individualItem && 'message' in individualItem
          ? ''
          : individualItem.name,
      visible_id:
        individualItem === null
          ? ''
          : 'code' in individualItem && 'message' in individualItem
          ? ''
          : individualItem.visible_id,
      product_number:
        individualItem === null
          ? ''
          : 'code' in individualItem && 'message' in individualItem
          ? ''
          : individualItem.product_number,
      description:
        individualItem === null
          ? ''
          : 'code' in individualItem && 'message' in individualItem
          ? ''
          : individualItem.description,
      purchase_year:
        individualItem === null
          ? null
          : 'code' in individualItem && 'message' in individualItem
          ? null
          : individualItem.purchase_year,
      purchase_price:
        individualItem === null
          ? null
          : 'code' in individualItem && 'message' in individualItem
          ? null
          : individualItem.purchase_price,
      durability:
        individualItem === null
          ? null
          : 'code' in individualItem && 'message' in individualItem
          ? null
          : individualItem.durability,
      is_depreciation:
        individualItem === null
          ? false
          : 'code' in individualItem && 'message' in individualItem
          ? false
          : individualItem.is_depreciation,
      connector:
        individualItem === null
          ? []
          : 'code' in individualItem && 'message' in individualItem
          ? []
          : individualItem.connector.map((connector) => ({ connector })),
      color:
        individualItem === null
          ? []
          : 'code' in individualItem && 'message' in individualItem
          ? []
          : individualItem.color.split('^').map((color) => ({ color })),
    },
  });
  const onSubmit: SubmitHandler<UpdateItemSchemaType> = (data) => {
    // conver from zod schema to api schema
    const requestColor: string = data.color.map((color) => color.color).join('^');
    const requestPurchaseYear: number | null = Number.isNaN(data.purchase_year) ? null : data.purchase_year;
    const requestPurchasePrice: number | null = Number.isNaN(data.purchase_price) ? null : data.purchase_price;
    const requestDurability: number | null = Number.isNaN(data.durability) ? null : data.durability;
    const requestData: UpdateItemRequest = {
      name: data.name,
      visible_id: data.visible_id,
      product_number: data.product_number,
      description: data.description,
      purchase_year: requestPurchaseYear,
      purchase_price: requestPurchasePrice,
      durability: requestDurability,
      is_depreciation: data.is_depreciation,
      connector: data.connector.map((connector) => connector.connector),
      color: requestColor,
    };
    console.debug('requestData');
    console.info(requestData);
    // send
    fetch(`http://localhost:5000/api/item/update/${props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }).catch((err) => console.error(err));
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
    <>
      {individualItem === null ? (
        <h2>Loading...</h2>
      ) : !('code' in individualItem && 'message' in individualItem) ? (
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
          <input type="submit" value="更新j" />
        </form>
      ) : (
        <>
          <p>{individualItem.code}</p>
          <p>{individualItem.message}</p>
        </>
      )}
    </>
  );
};

export default UpdateItemForm;
