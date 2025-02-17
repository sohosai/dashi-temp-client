import { FC } from 'react';
import { IndividualItemResponse } from '../model/individualItemResponse';

type Props = {
  result: IndividualItemResponse;
};

const IndividualItemResult: FC<Props> = (props) => {
  return (
    <>
      <h2>name: {props.result.name}</h2>
      <p>id: {props.result.id}</p>
      <p>visible_id: {props.result.visible_id}</p>
      <p>parent_id: {props.result.parent_id}</p>
      <p>parent_visible_id: {props.result.parent_visible_id}</p>
      <p>record: {props.result.record}</p>
      <p>product_number: {props.result.product_number}</p>
      <p>description: {props.result.description}</p>
      <p>purchase_year: {props.result.purchase_year ?? ''}</p>
      <p>purchase_price: {props.result.purchase_price ?? ''}</p>
      <p>durability: {props.result.durability ?? ''}</p>
      <p>is_depreciation: {props.result.is_depreciation ? '減価償却する' : '減価償却しない'}</p>
      <p>connector: {props.result.connector.join(',')}</p>
      <p>color: {props.result.color}</p>
      <p>is_rent: {props.result.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
      <p>created_at: {props.result.created_at}</p>
      <p>updated_at: {props.result.updated_at}</p>
    </>
  );
};

export default IndividualItemResult;
