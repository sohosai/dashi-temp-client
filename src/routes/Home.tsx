import { useLocation } from 'react-router-dom';

const Home = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  return (
    <div>
      <h1>Param: {query.get('search') ?? 'Default Value'}</h1>
    </div>
  );
};

export default Home;
