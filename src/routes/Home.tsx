import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { searchItemSchema, SearchItemSchemaType } from '../validation/searchItem';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SearchItemsResponse } from '../model/searchItemResponse';

const Home: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const keywords = searchParams.get('keywords') || '';
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchItemSchemaType>({
    resolver: zodResolver(searchItemSchema),
    defaultValues: {
      keywords: keywords,
    },
  });
  // update url
  const onSubmit: SubmitHandler<SearchItemSchemaType> = (data) => {
    navigate(`?keywords=${data.keywords}`);
  };
  // get search result
  const [data, setData] = useState<SearchItemsResponse | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (keywords !== '') {
        const result: SearchItemsResponse = await fetch(`http://localhost:5000/api/item/search?keywords=${keywords}`)
          .then((res) => res.json())
          .catch((err) => console.log(err));
        setData(result);
      }
    };
    fetchData();
  }, [keywords]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="keywords">Search: </label>
        <input id="keywords" type="text" {...register('keywords')} placeholder="Search" />
        <br />
        <ErrorMessage errors={errors} name="keywords" message={errors.keywords?.message} />
        <br />
        <input type="submit" value="検索" />
      </form>
      <Link to="/register">新規登録</Link>
      <div>
        {data?.search_items.map((item, index) =>
          item.id === 1 ? (
            // 筑波大学のレンタルを拒否
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.id}</p>
              <p>{item.visible_id}</p>
              <p>{item.connector.join(',')}</p>
              <p>{item.color}</p>
              <p>レンタル不可</p>
              <Link to={`/item/${item.id}`}>詳細</Link>
            </div>
          ) : (
            // それ以外
            <div key={index}>
              <h2>{item.name}</h2>
              <p>{item.id}</p>
              <p>{item.visible_id}</p>
              <p>{item.connector.join(',')}</p>
              <p>{item.color}</p>
              <p>{item.is_rent ? 'レンタル不可' : 'レンタル可'}</p>
              <Link to={`/item/${item.id}`}>詳細</Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
