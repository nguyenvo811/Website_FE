import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import queryString from "query-string";
import Slider from "react-slick";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function ProductDetail() {
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [listColor, setListColor] = useState([]);
  const [color, setColor] = useState("");
  const [colorChange, setColorChange] = useState("");

  const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

  const scrollToElement = () => {
    // Find the element you want to scroll to
    const targetElement = document.getElementById('targetElementId');
    // Scroll to the target element with an offset
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const productData = data.find(val => val?._id === location?.state)
    setProduct(productData)
    setListColor(productData.variants)
  }, [])

  const data = [
    {
      _id: "1h",
      productName: "Product A",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 1,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
          ],
          price: "1.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 2,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "2.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1f",
      productName: "Product B",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 3,
          images: [
            'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 4,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1e",
      productName: "Product C",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 5,
          images: [
            'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 6,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1d",
      productName: "Product D",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 7,
          images: [
            'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 8,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1c",
      productName: "Product E",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 9,
          images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 10,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1b",
      productName: "Product F",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 11,
          images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 12,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    },
    {
      _id: "1a",
      productName: "Product H",
      brand: "AUDAX INDONESIA",
      variants: [
        {
          _id: 13,
          images: [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "3.000.000VNĐ",
          color: "Red"
        },
        {
          _id: 14,
          images: [
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
          ],
          price: "4.000.000VNĐ",
          color: "Blue"
        }
      ]
    }
  ]

  const selectValue = product?.variants?.find(val => val._id === product?.variants[0]?._id)

  console.log(product?.variants)
  console.log(selectValue)

  
  const handleSelectColor = (event) => {
    const selectedColor = event.target.value;
    console.log(selectedColor);
    setColor(selectedColor);
  
    // Find the selected variant based on the color
    const variant = listColor?.find((variant) => variant._id === selectedColor);
    console.log(variant);
  };

  const listProductDetail = product?.variants?.map(val => { return val._id });
  const defaultColor = listProductDetail?.find((id) => { return id === selectValue?._id });

  useEffect(() => {
    setColor(defaultColor);
  }, [defaultColor]); 

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

  return (
    <>
      <section class="pt-28 font-poppins dark:bg-gray-800">
        <div class="max-w-6xl px-4 mx-auto text-left">
          <div class="flex flex-wrap -mx-4">
            <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <Slider {...settings} asNavFor={nav2} ref={slider => (setSlider1(slider))}>
                {product?.variants?.map((val, index) =>
                  color === val?._id && (
                    val?.images.map((image, imgIndex) => (
                      <div className="relative group" key={imgIndex}>
                        <div className="p-4 h-[450px] lg:h-[450px] w-full m-auto">
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
                    val?._id === color && (
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
                  <span class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">{product?.brand}</span>
                  <h2 class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                    {product?.productName}
                  </h2>
                 
                  <p class="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 ">
                    <span>Giá: Rs.7,000.00</span>
                  </p>
                </div>
                <div 
                  class="cursor-pointer mb-6 flex items-center"
                  onClick={scrollToElement}
                >
                  <h2 class="text-lg font-bold text-gray-700">Chi tiết sản phẩm</h2>
                  <svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1 transform rotate-90"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
                </div>
                <div class="py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <span class="mr-3">Phiên bản:</span>
                    <div class="relative">
                      <select
                        class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                        id="color"
                        name="color"
                        required
                        value={color}
                        onChange={handleSelectColor}
                      >
                        {product?.variants?.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.color}
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
                  <button class="w-full px-4 py-3 text-center text-gray-100 bg-yellow-400 hover:bg-yellow-500 border rounded-xl">
                    <span className="cursor-pointer" >
                      Mua ngay
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
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        LỊCH SỬ THÀNH LẬP
                      </strong>
                    </div>
                    <p className="text-justify">
                      Được thành lập vào năm 2013 - trải qua một chặng đường dài trong việc nghiên cứu và phát triển về lĩnh vực thiết bị nhà nuôi yến,
                      cùng với mong muốn mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, ngày nay, CÔNG TY TNHH TM CUNG CẤP THIẾT BỊ NHÀ YẾN THÂN THI
                      được nhắc đến như là một trong những nhà cung cấp hàng đầu các giải pháp dịch vụ trọn gói cho hệ thống Nhà Nuôi yến và hệ thống thiết bị lắp
                      đặt nhà yến chuyên nghiệp, cũng như hỗ trợ, tư vấn tận tâm cho Quý khách hàng.
                    </p>
                    <br />
                    <p className="text-justify">
                      Hiểu được tâm tư và nguyện vọng của khách hàng, NHÀ YẾN THÂN THI luôn không ngừng phấn đấu để đem đến một quy trình phục vụ tốt nhất từ việc lên kế hoạch
                      tìm hiểu, Tư vấn cho khách hàng, Thiết kế mô hình nhà nuôi yến, Cung cấp trọn gói hệ thống thiết bị lắp đặt nhà yến hoàn chỉnh và quan tâm
                      sát sao đến việc bảo hành, bảo trì sản phẩm cho Quý khách hàng.
                      May mắn nhận được sự hỗ trợ từ phía đối tác cũng như sự tin tưởng và tín nhiệm của khách hàng, NHÀ YẾN THÂN THI THÂN THI đã có cơ hội mở rộng quy mô thị
                      trường hoạt động từ Trung Bộ trải dài tới Tây Nam Bộ nhằm đáp ứng nhu cầu ngày một cao hơn của khách hàng là các chủ nhà yến, kỹ thuật lắp đặt, đại
                      lý phân phối sản phẩm thiết bị… trên Toàn Quốc.
                    </p>
                    <br />
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        TÌNH HÌNH HIỆN NAY
                      </strong>
                    </div>
                    <p className="text-justify">
                      Được thành lập vào năm 2013 - trải qua một chặng đường dài trong việc nghiên cứu và phát triển về lĩnh vực thiết bị nhà nuôi yến,
                      cùng với mong muốn mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất, ngày nay, CÔNG TY TNHH TM CUNG CẤP THIẾT BỊ NHÀ YẾN THÂN THI
                      được nhắc đến như là một trong những nhà cung cấp hàng đầu các giải pháp dịch vụ trọn gói cho hệ thống Nhà Nuôi yến và hệ thống thiết bị lắp
                      đặt nhà yến chuyên nghiệp, cũng như hỗ trợ, tư vấn tận tâm cho Quý khách hàng.
                    </p>
                    <br />
                    <p className="text-justify">
                      Hiểu được tâm tư và nguyện vọng của khách hàng, NHÀ YẾN THÂN THI luôn không ngừng phấn đấu để đem đến một quy trình phục vụ tốt nhất từ việc lên kế hoạch
                      tìm hiểu, Tư vấn cho khách hàng, Thiết kế mô hình nhà nuôi yến, Cung cấp trọn gói hệ thống thiết bị lắp đặt nhà yến hoàn chỉnh và quan tâm
                      sát sao đến việc bảo hành, bảo trì sản phẩm cho Quý khách hàng.
                      May mắn nhận được sự hỗ trợ từ phía đối tác cũng như sự tin tưởng và tín nhiệm của khách hàng, NHÀ YẾN THÂN THI THÂN THI đã có cơ hội mở rộng quy mô thị
                      trường hoạt động từ Trung Bộ trải dài tới Tây Nam Bộ nhằm đáp ứng nhu cầu ngày một cao hơn của khách hàng là các chủ nhà yến, kỹ thuật lắp đặt, đại
                      lý phân phối sản phẩm thiết bị… trên Toàn Quốc.
                    </p>
                    <br />
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        NHÓM HÀNG - SẢN PHẨM CHỦ LỰC
                      </strong>
                    </div>
                    <p className="text-justify">
                      Nhóm hệ thống gỗ
                      Nhóm hệ thống Loa và Amply
                      Nhóm hệ thống phun sương, tạo ẩm
                      Nhóm dung dịch
                      Nhóm thiết bị điện
                      Nhóm thiết bị khác
                    </p>
                    <br />
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        THẾ MẠNH CỦA NHÀ YẾN THÂN THI
                      </strong>
                    </div>
                    <div className="space-y-2">
                      <p className="text-justify">
                        Có kinh nghiệm hơn 10 năm tìm hiểu và hoạt động trong lĩnh vực cung cấp thiết bị lắp đặt nhà nuôi yến.
                      </p>
                      <p className="text-justify">
                        Sản phẩm mang thương hiệu  được nhập khẩu chính ngạch từ Malaysia, Indonesia, Taiwan,…Quý khách hàng khi
                        mua thiết bị tại NHÀ YẾN THÂN THI sẽ được tư vấn và hướng dẫn cách sử dụng tận tâm cùng với chế độ bảo hành sản phẩm đặc biệt dành riêng cho quý khách hàng.
                      </p>
                      <p className="text-justify">
                        Các nhóm sản phẩm đa dạng, chất lượng cao, với mức chi phí cạnh tranh và phù hợp nhất cho từng điều kiện kinh tế của chủ đầu tư.
                      </p>
                      <p className="text-justify">
                        Hệ thống Đại lý phân phối của lớn mạnh trải dài từ Bắc Trung Bộ đến Tây Nam Bộ , đáp ứng mọi nhu cầu xây dựng, lắp đặt nhà yến của chủ nhà yến mọi miền Tổ quốc.
                      </p>
                      <p className="text-justify">
                        Dịch vụ chăm sóc khách hàng, bảo trì, thay thế linh kiện linh hoạt, tận tâm và nhanh chóng.
                      </p>
                      <p className="text-justify">
                        Đội ngũ nhân viên THÂN THI giàu kinh nghiệm, thân thiện, nhịêt tình và đầy trách nhiệm luôn thấu hiểu nhu cầu và phục vụ tối đa quyền lợi cho Quý khách hàng.
                      </p>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="text-left">
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        TẦM NHÌN CHIẾN LƯỢC
                      </strong>
                    </div>
                    <div className="space-y-2">
                      <p className="text-justify">
                        “NHÀ YẾN THÂN THI- niềm tin hàng đầu của Quý khách hàng về sản phẩm thiết bị và dịch vụ”
                      </p>
                      <p className="text-justify">
                        Với tầm nhìn dài hạn tập trung cho sự phát triển bền vững trở thành công ty tiên phong có tên tuổi và vị thế trên thị trường trong lĩnh vực Nhà nuôi yến.
                      </p>
                      <p className="text-justify">
                        NHÀ YẾN THÂN THI tập trung cơ cấu ở 4 mảng chính gồm:
                        <div className="space-y-1 ml-4">
                          <p className="text-justify">
                            Nghiên cứu cải tiến và phát triển công nghệ sản phẩm theo tiêu chuẩn chất lượng Quốc tế.
                          </p>
                          <p className="text-justify">
                            Nhập khẩu và thương mại Thiết Bị Nhà Yến.
                          </p>
                          <p className="text-justify">
                            Tư vấn và hỗ trợ kỹ thuật lắp đặt thiết bị nhà yến cho khách hàng.
                          </p>
                          <p className="text-justify">
                            Xây dựng kênh thu mua, chế biến và phân phối.
                          </p>
                        </div>
                      </p>
                    </div>
                    <br />
                    <div className="flex items-center pb-2">
                      <span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
                      <strong
                        class="block text-xl font-bold text-black sm:text-2xl"
                      >
                        SỨ MỆNH
                      </strong>
                    </div>
                    <div className="space-y-2">
                      <p className="text-justify">
                        “Giúp hàng ngàn người Việt thành công trong lĩnh vực Nhà Nuôi Yến”
                      </p>
                      <div>
                        <span>
                          <strong
                            class="block text-sm font-bold text-black sm:text-lg"
                          >
                            Đối với khách hàng
                          </strong>
                          <p className="text-justify">
                            THÂN THI tận tâm phục vụ đưa ra giải pháp thiết kế xây dựng- cung cấp thiết bị Nhà Nuôi Yến phù hợp đạt
                            tiêu chuẩn chất lượng quốc tế. Giúp khách hàng tiết kiệm tối đa chi phí đầu tư và đem về nguồn lợi đáng kể từ Nhà Nuôi Yến.
                          </p>
                        </span>
                        <span>
                          <strong
                            class="block text-sm font-bold text-black sm:text-lg"
                          >
                            Đối với đối tác
                          </strong>
                          <p className="text-justify">
                            Trên tinh thần hợp tác cùng phát triển. Tuân thủ các thỏa thuận hợp tác và tuân thủ Pháp luật.
                          </p>
                        </span>
                        <span>
                          <strong
                            class="block text-sm font-bold text-black sm:text-lg"
                          >
                            Đối với CBCNV
                          </strong>
                          <p className="text-justify">
                            Xây dựng môi trường làm việc chuyên nghiệp, có nguồn thu nhập cao. Mỗi cá nhân đều có cơ hội học tập,
                            phát triển trong môi trường năng động, sáng tạo, mang tính nhân văn và công bằng.
                          </p>
                        </span>
                        <span>
                          <strong
                            class="block text-sm font-bold text-black sm:text-lg"
                          >
                            Đối với xã hội
                          </strong>
                          <p className="text-justify">
                            Cân bằng giữa lợi ích doanh nghiệp và lợi ích xã hội. THÂN THI tích cực tham gia đóng góp, xây dựng các
                            chương trình vì cộng đồng. Thể hiện tinh thần dân tộc và trách nhiệm đối với xã hội.
                          </p>
                        </span>
                        <span>
                          <strong
                            class="block text-sm font-bold text-black sm:text-lg"
                          >
                            Đối với môi trường
                          </strong>
                          <p className="text-justify">
                            Tuân thủ các quy định của Pháp luật về thiết kế- thi công- xây dựng. Bên cạnh đó là bảo vệ môi trường sinh sống cho loài Chim Yến.
                          </p>
                        </span>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      </section>
    </>
  )
}