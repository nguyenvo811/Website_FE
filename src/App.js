import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductTable from './adminPage/page/product/ProductTable';
import Authentication from './adminPage/page/Authentication';
import CategoryTable from './adminPage/page/category/CategoryTable';
import UserTable from './adminPage/page/user/UserTable';
import BrandTable from './adminPage/page/brand/BrandTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path='/dang-nhap' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/products' element={<ProductTable />} />
            <Route path='/categories' element={<CategoryTable />} />
            <Route path='/user-list' element={<UserTable />} />
            <Route path='/nhan-hieu' element={<BrandTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
