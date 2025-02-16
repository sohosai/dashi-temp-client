import { Route, Routes } from 'react-router-dom';
import { Home, IndividualItem, PageNotFound, Register, Update } from '.';
import { FC } from 'react';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<IndividualItem />} />
        <Route path="/item/:id/update" element={<Update />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
