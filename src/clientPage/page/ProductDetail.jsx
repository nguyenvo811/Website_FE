import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import LOGO_MO from "../../asset/img/LOGO_MO.png";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { getCategories, getProduct } from "../../api/apiServices";
import { FormatCurrency } from "../../asset/FormatCurrency";
import ReactQuill from "react-quill";

export default function ProductDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [select, setSelect] = useState([]);
  const [variants, setVariants] = useState("");

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProduct(location?.state?.product)
      .then(res => {
        console.log(res.data.data)
        setProduct(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

    getCategories()
      .then(res => {
        setSelect(res.data.data)
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.result);
          console.log(err.response.status);
          console.log(err.response.data.message);
        }
      })
  }, [location?.state])

  const selectValue = product?.variants?.find(val => val._id === product?.variants[0]?._id)
  const compareCategory = select?.find(val => val?._id === product?.category?._id)

  console.log(product)
  console.log(compareCategory)


  const handleSelectVariants = (event) => {
    const selectedVariamts = event.target.value;
    console.log(selectedVariamts);
    setVariants(selectedVariamts);
  };

  const listProductDetail = product?.variants?.map(val => { return val._id });
  const defaultVariants = listProductDetail?.find((id) => { return id === selectValue?._id });

  useEffect(() => {
    setVariants(defaultVariants);
  }, [defaultVariants]);

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-opacity-30 bg-gray-400 hover:bg-gray-500 rounded-full"
      onClick={onClick}
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full">
        <svg class="w-8 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-opacity-30 bg-gray-400 hover:bg-gray-500 rounded-full"
      onClick={onClick}
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full">
        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    asNavFor: '.slider-nav',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {

    setNav1(slider1);
    setNav2(slider2);

  });

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: '10px',
    asNavFor: '.slider-for',
  };

  const renderSpecifications = product?.specifications?.map((val, index) => {
    return (
      <tr key={index} className="border-b border-gray-200">
        <th scope="row" className="w-1/2 px-6 py-4 font-medium whitespace-nowrap bg-gray-50">
          {val?.name}
        </th>
        <td className="w-1/2 px-6 py-4">
          {val?.value}
        </td>
      </tr>
    )
  })

  return (
    <>
      <section class="pt-28 font-poppins dark:bg-gray-800">
        <div class="max-w-6xl px-4 mx-auto text-left">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <Slider {...settings} asNavFor={nav2} ref={slider => (setSlider1(slider))}>
                {product?.variants?.map((val, index) =>
                  variants === val?._id && (
                    val?.images.map((image, imgIndex) => (
                      <div className="relative group" key={imgIndex}>
                        <div className="p-4 h-[450px] lg:h-[450px] w-full m-auto">
                          <img src={LOGO_MO} className="absolute w-24 h-24 top-1/2 left-1/2"/>
                          <img src={image} className="w-full h-full object-center object-cover duration-700" alt={`Slide ${imgIndex + 1}`} />
                        </div>
                      </div>
                    ))
                  )
                )}
              </Slider>
              <div className="thumbnail-slider-wrap">
                <Slider
                  {...settingsThumbs}
                  asNavFor={nav1}
                  ref={slider => (setSlider2(slider))}>
                  {product?.variants?.map((val, index) =>
                    val?._id === variants && (
                      val?.images.map((image, imgIndex) => (
                        <div className="relative group" key={imgIndex}>
                          <div className="p-4 h-[150px] lg:h-[150px] w-full m-auto">
                            <img className="w-full flex justify-center items-center cursor-pointer duration-300" src={image} />
                          </div>
                        </div>
                      ))
                    )
                  )}
                </Slider>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2">
              <div class="lg:pl-20">
                <div class="mb-6 ">
                  <span class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">{product?.brand?.brandName}</span>
                  <h2 class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product?.productName}
                  </h2>

                  <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    {product?.variants?.map((val, index) =>
                      variants === val?._id && (
                        <>
                          <span>Giá: <FormatCurrency price={val?.price} /></span>
                        </>
                      )
                    )}
                  </p>
                  <p class="mt-6 text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>Xuất xứ: {product?.origin}</span>    
                  </p>
                </div>
                <div
                  class="cursor-pointer mb-6 flex items-center"
                >
                  <p class="text-md text-gray-700">{product?.shortDescription}</p>
                </div>
                <div class="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <span class="mr-3">{product?.variantCategory}:</span>
                    <div class="relative">
                      <select
                        class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                        id="color"
                        name="color"
                        required
                        value={variants}
                        onChange={handleSelectVariants}
                      >
                        {product?.variants?.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.variantName}
                          </option>
                        ))}
                      </select>
                      <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="mb-6 "></div>
                <div class="flex gap-4 mb-6">
                  <button onClick={() => navigate('/lien-he')} class="w-full px-4 py-3 text-center text-gray-100 bg-yellow-400 hover:bg-yellow-500 border rounded-xl">
                    <span className="cursor-pointer" >
                      Đặt hàng
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="targetElementId" className="-mx-4 mb-6 sm:mt-16 border-t border-b border-gray-200">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: 1,
                  borderColor: 'divider',
                }}>
                  <TabList
                    value={value}
                    onChange={handleChange}
                    sx={{
                      "& .MuiTabs-indicator": {
                        backgroundColor: "#eab308", // Set the tab indicator color
                      }
                    }}
                  >
                    <Tab label="MÔ TẢ SẢN PHẨM" value="1"
                      sx={{
                        "&.Mui-selected": {
                          color: "#eab308", // Add '#' and fix the color value
                        },
                      }}
                    />
                    <Tab label="THÔNG SỐ CHI TIẾT" value="2"
                      sx={{
                        "&.Mui-selected": {
                          color: "#eab308", // Add '#' and fix the color value
                        },
                      }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="text-left">
                    <section className='w-full h-full pb-8 border-1 border-b'>
                      <iframe
                        width="100%"
                        className="sm:h-[415px] lg:h-[615px] h-[315px]"
                        src={`https://www.youtube.com/embed/${getYouTubeVideoId(product?.video)}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded Video"
                      ></iframe>
                    </section>
                    <ReactQuill
                      value={product?.description || ''}
                      readOnly={true}
                      theme="bubble"
                    />
                  </div>
                </TabPanel>
                {product?.specifications && 
                  <TabPanel value="2">
                    <table className="w-full text-sm text-left rtl:text-right border">
                      <tbody>
                        {renderSpecifications}
                      </tbody>
                    </table>
                  </TabPanel>
                }
              </TabContext>
            </Box>
          </div>
        </div>
      </section>
    </>
  )
}

function getYouTubeVideoId(url) {
  // Regular expression to extract the video ID
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url?.match(regex);

  // If there's a match, return the video ID, otherwise return an empty string
  return match ? match[1] : "";
}