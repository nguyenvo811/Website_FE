import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductTable from './adminPage/page/product/ProductTable';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutAdmin />}>
            <Route index path='/products' element={<ProductTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
