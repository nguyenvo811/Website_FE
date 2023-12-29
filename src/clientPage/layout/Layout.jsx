import { Outlet } from "react-router-dom";
import * as React from 'react';
import { MdFacebook } from "react-icons/md"
import { FaDribbble, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import StateContext from "../component/StateContext";
// import Bottom from "../component/Bottom";
import Header from "../component/Header";
import Footer from "../component/Footer";
// import ASide from "../component/ASide";
import { getBrands, getCategories } from "../../api/apiServices";
import ScrollToTopButton from "../component/ScrollToTopButton";

export default function Layout(){
  // State variable here
  const [open, setOpen] = React.useState(false);

  const [selectCategory, setSelectCategory] = React.useState([]);
  const [selectBrand, setSelectBrand] = React.useState([]);

// 	Get categories 
  React.useEffect(() => {
    getCategories()
      .then(res => {
        setSelectCategory(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })

    getBrands()
    .then(res => {
      setSelectBrand(res.data.data)
    })
    .catch(err => {
      if (err.response) {
        console.log(err.response.data.result);
        console.log(err.response.status);
        console.log(err.response.data.message);
      }
    })
  }, []);

  return (
    <>
      <StateContext.Provider value={{ open, setOpen, selectCategory, selectBrand }}>
        <Header category={selectCategory} />
          {/* <ASide category={selectCategory} /> */}
          <MainContent />
        {/* <div className="mt-4">
          <Bottom />
        </div> */}
        <ScrollToTopButton />
        <Footer />
      </StateContext.Provider>
    </>
  )
}

const MainContent = function() {
  return (
    <div className="overflow-hidden">
      <div className="h-full w-full">
        <div className="max-md:pt-0">
            <Outlet />
        </div>
      </div>
    </div>
  )
}