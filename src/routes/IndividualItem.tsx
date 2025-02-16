import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IndividualItemResult } from '..';

const IndividualItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [itemId, setItemId] = useState<number | null>(null);
  useEffect(() => {
    if (id !== undefined) {
      setItemId(parseInt(id));
    }
  }, [id]);
  return (
    <div>
      {itemId === null ? (
        <h2>Loading...</h2>
      ) : Number.isNaN(itemId) ? (
        <>
          <p>IntParse Error</p>
          <p>idは数字でなければなりません。</p>
        </>
      ) : (
        <IndividualItemResult id={itemId} />
      )}
    </div>
  );
};

export default IndividualItem;
