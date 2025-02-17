import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { registerItemSchema, RegisterItemSchemaType } from '../validation/registerItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { RegisterItemRequest } from '../model/registerItemRequest';

const RegisterItemForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterItemSchemaType>({
    resolver: zodResolver(registerItemSchema),
  });
  const onSubmit: SubmitHandler<RegisterItemSchemaType> = (data) => {
    // conver from zod schema to api schema
    const requestColor: string = data.color.map((color) => color.color).join('^');
    const requestPurchaseYear: number | null = Number.isNaN(data.purchase_year) ? null : data.purchase_year;
    const requestPurchasePrice: number | null = Number.isNaN(data.purchase_price) ? null : data.purchase_price;
    const requestDurability: number | null = Number.isNaN(data.durability) ? null : data.durability;
    const requestData: RegisterItemRequest = {
      name: data.name,
      visible_id: data.visible_id,
      parent_visible_id: data.parent_visible_id,
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
    fetch(`http://localhost:5000/api/item/register`, {
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
      <label htmlFor="parent_visible_id">Parent Visible ID: </label>
      <input id="parent_visible_id" type="text" {...register('parent_visible_id')} />
      <br />
      <ErrorMessage errors={errors} name="parent_visible_id" message={errors.parent_visible_id?.message} />
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
          <select id="connector" {...register(`connector.${index}.connector` as const)}>
            <option value="USB">USB</option>
            <option value="HDMI">HDMI</option>
            <option value="VGA">VGA</option>
            <option value="DVI">DVI</option>
          </select>
          {index >= 0 && <input type="submit" value="✕" onClick={() => connectorArray.remove(index)} />}
        </div>
      ))}
      <br />
      <ErrorMessage errors={errors} name="connector" message={errors.connector?.message} />
      <br />
      <input type="button" value="端子の追加" onClick={() => connectorArray.append({ connector: 'USB' })} />
      <br />
      <label htmlFor="color">Color: </label>
      {colorArray.fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor="color">{index}</label>
          <select id="color" {...register(`color.${index}.color`)}>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Purple">Purple</option>
            <option value="Black">Black</option>
            <option value="White">White</option>
            <option value="Gray">Gray</option>
            <option value="Brown">Brown</option>
            <option value="Pink">Pink</option>
          </select>
          {index >= 0 && <input type="submit" value="✕" onClick={() => colorArray.remove(index)} />}
        </div>
      ))}
      <br />
      <ErrorMessage errors={errors} name="color" message={errors.color?.message} />
      <br />
      <input type="button" value="色の追加" onClick={() => colorArray.append({ color: 'Black' })} />
      <br />
      <input type="submit" value="登録" />
    </form>
  );
};

export default RegisterItemForm;
