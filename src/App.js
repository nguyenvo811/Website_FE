import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutAdmin from './adminPage/layout/LayoutAdmin';
import ProductTable from './adminPage/page/product/ProductTable';
import Authentication from './adminPage/page/Authentication';
import CategoryTable from './adminPage/page/category/CategoryTable';
import UserTable from './adminPage/page/user/UserTable';
import BrandTable from './adminPage/page/brand/BrandTable';
import Layout from './clientPage/layout/Layout';
import Home from './clientPage/page/Home';
import ProductDetail from './clientPage/page/ProductDetail';
import Introduction from './clientPage/page/Introduction';
import Policy from './clientPage/page/Policy';
import AllProduct from './clientPage/page/AllProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route index path='/chi-tiet-san-pham/:productName' element={<ProductDetail />} />
            <Route index path='/gioi-thieu' element={<Introduction />} />
            <Route index path='/chinh-sach' element={<Policy />} />
            <Route index path='/san-pham/:categoryName?/:search?' element={<AllProduct />} />
          </Route>
          <Route index path='/dang-nhap' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/quan-ly/san-pham' element={<ProductTable />} />
            <Route path='/quan-ly/danh-muc' element={<CategoryTable />} />
            <Route path='/quan-ly/nguoi-dung' element={<UserTable />} />
            <Route path='/quan-ly/nhan-hieu' element={<BrandTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
