import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './components/pages/homepage/Homepage';
import NotFound from './components/pages/notFound/NotFound';
import Table from './components/pages/table/Table';
import Footer from './components/views/footer/Footer';
import Header from './components/views/header/Header';
import { fetchTables } from './redux/TableRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/table/:id' element={<Table />} />
        <Route path='/table/*' element={<Homepage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
