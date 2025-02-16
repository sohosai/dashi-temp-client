import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Update: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Update: {id}</h1>
    </div>
  );
};

export default Update;
