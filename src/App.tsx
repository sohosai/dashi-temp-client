import { Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import { Generate, Home, IndividualItem, PageNotFound, RegisterItem, UpdateItem } from './routes';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<IndividualItem />} />
        <Route path="/item/:id/update" element={<UpdateItem />} />
        <Route path="/register" element={<RegisterItem />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
