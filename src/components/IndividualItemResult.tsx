import { FC, useEffect, useState } from 'react';
import { IndividualItemResponse } from '../model/individualItemResponse';
import { ErrorResponse } from '../model/error';

type Props = {
  id: number;
};

const IndividualItemResult: FC<Props> = (props) => {
  const [individualItem, setIndividualItem] = useState<IndividualItemResponse | ErrorResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const result: IndividualItemResponse | ErrorResponse = await fetch(`http://localhost:5000/api/item/${props.id}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      setIndividualItem(result);
    };
    fetchData();
  }, [props.id]);
  return (
    <>
      {individualItem !== null ? (
        !('code' in individualItem && 'message' in individualItem) ? (
          <>
            <h2>name: {individualItem.name}</h2>
            <p>id: {individualItem.id}</p>
            <p>visible_id: {individualItem.visible_id}</p>
            <p>parent_id: {individualItem.parent_id}</p>
            <p>parent_visible_id: {individualItem.parent_visible_id}</p>
            <p>record: {individualItem.record}</p>
            <p>product_number: {individualItem.product_number}</p>
            <p>description: {individualItem.description}</p>
            <p>purchase_year: {individualItem.purchase_year ?? ''}</p>
            <p>purchase_price: {individualItem.purchase_price ?? ''}</p>
            <p>durability: {individualItem.durability ?? ''}</p>
            <p>is_depreciation: {individualItem.is_depreciation ? '減価償却する' : '減価償却しない'}</p>
            <p>connector: {individualItem.connector.join(',')}</p>
            <p>color: {individualItem.color}</p>
            <p>is_rent: {individualItem.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
            <p>created_at: {individualItem.created_at}</p>
            <p>updated_at: {individualItem.updated_at}</p>
          </>
        ) : (
          <>
            <p>{individualItem.code}</p>
            <p>{individualItem.message}</p>
          </>
        )
      ) : (
        <h2>Loding...</h2>
      )}
    </>
  );
};

export default IndividualItemResult;

// <div>
//   <h2>name: {individualItem.name}</h2>
//   <p>id: {individualItem.id}</p>
//   <p>visible_id: {individualItem.visible_id}</p>
//   <p>parent_id: {individualItem.parent_id}</p>
//   <p>parent_visible_id: {individualItem.parent_visible_id}</p>
//   <p>record: {individualItem.record}</p>
//   <p>product_number: {individualItem.product_number}</p>
//   <p>description: {individualItem.description}</p>
//   <p>purchase_year: {individualItem.purchase_year ?? ''}</p>
//   <p>purchase_price: {individualItem.purchase_price ?? ''}</p>
//   <p>durability: {individualItem.durability ?? ''}</p>
//   <p>is_depreciation: {individualItem.is_depreciation ? '減価償却する' : '減価償却しない'}</p>
//   <p>connector: {individualItem.connector.join(',')}</p>
//   <p>color: {individualItem.color}</p>
//   <p>is_rent: {individualItem.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
//   <p>created_at: {individualItem.created_at}</p>
//   <p>updated_at: {individualItem.updated_at}</p>
// </div>;
