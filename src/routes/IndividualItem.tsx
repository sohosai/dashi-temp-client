import { useParams } from 'react-router-dom';

const IndividualItem = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h1>Individual Item: {id}</h1>
    </div>
  );
};

export default IndividualItem;
