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
import News from './clientPage/page/News';
import NewsTable from './adminPage/page/news/NewsTable';
import NewsDetail from './clientPage/page/NewsDetail';
import AllNews from './clientPage/page/AllNews';
import Contact from './clientPage/page/Contact';
import ContactTable from './adminPage/page/contact/ContactTable';
import CustomerTable from './adminPage/page/customer/CustomerTable';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/chi-tiet-san-pham/:productName' element={<ProductDetail />} />
            <Route path='/gioi-thieu' element={<Introduction />} />
            <Route path='/chinh-sach' element={<Policy />} />
            <Route path='/tin-tuc' element={<News />} />
            <Route path='/tin-tuc/:title' element={<NewsDetail />} />
            <Route path='/:status' element={<AllNews />} />
            <Route path='/lien-he' element={<Contact />} />
            <Route path='/san-pham/:categoryName?/:search?' element={<AllProduct />} />
          </Route>
          <Route index path='/dang-nhap' element={<Authentication />} />
          <Route element={<LayoutAdmin />}>
            <Route index path='/quan-ly/san-pham' element={<ProductTable />} />
            <Route path='/quan-ly/danh-muc' element={<CategoryTable />} />
            <Route path='/quan-ly/nguoi-dung' element={<UserTable />} />
            <Route path='/quan-ly/nhan-hieu' element={<BrandTable />} />
            <Route path='/quan-ly/tin-tuc' element={<NewsTable />} />
            <Route path='/quan-ly/lien-he' element={<ContactTable />} />
            <Route path='/quan-ly/khach-hang' element={<CustomerTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
