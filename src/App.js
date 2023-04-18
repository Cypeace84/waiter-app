import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage';
import NotFound from './components/pages/notFound/NotFound';
import Table from './components/pages/table/Table';
import Footer from './components/views/footer/Footer';
import Header from './components/views/header/Header';
import { getIsLoading } from './redux/loadingRedux';

import { fetchTables, getAllTables } from './redux/tableRedux';

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(getIsLoading);
  const tables = useSelector(getAllTables);
  console.log('isLoading', isLoading);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  if (isLoading) {
    console.log('is', isLoading);
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/table/:id' element={<Table tables={tables} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
