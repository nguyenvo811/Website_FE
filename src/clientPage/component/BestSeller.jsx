import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slugify from 'slugify';
import { getProductInHome, getProducts } from "../../api/apiServices";
import LOGO_MO from "../../asset/img/LOGO_MO.png";
// import Card from "../component/Card";

export default function BestSeller() {
	const navigate = useNavigate();
	const sliderRef = useRef(null);
	const [data, setData] = useState([]);

	useEffect(() => {
		getProductInHome()
		.then(res => {
			setData(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [])

  const PrevArrow = (props) => (
    <button
      {...props}
      className="absolute top-1/2 transform -translate-y-1/2 left-0 z-10 bg-opacity-30 bg-gray-400 hover:bg-gray-500 rounded-full"
      onClick={() => sliderRef.current.slickPrev()}
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full">
        <svg class="w-8 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
  );

  const NextArrow = (props) => (
    <button
      {...props}
      className="absolute top-1/2 transform -translate-y-1/2 right-0 z-10 bg-opacity-30 bg-gray-400 hover:bg-gray-500 rounded-full" 
      onClick={() => sliderRef.current.slickNext()}
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
		centerMode: true,
		centerPadding: '10px',
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,          // Enable autoplay
    autoplaySpeed: 1500,     // Set the interval for auto-sliding in milliseconds
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
		responsive: [
			{
				breakpoint: 1024, // screens greater than or equal to 1024px
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768, // screens greater than or equal to 768px
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 480, // screens less than 480px
				settings: {
					slidesToShow: 1,
				},
			},
		],
  };

	const bestSellerProducts = data
  .filter((val) => val?.active === true && val?.newest === false && val?.bestSeller === true)
  .slice(0, 10); // Take the first 10 articles


	const handleClickDetails = useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const productNameSlug = slugify(val?.productName, { lower: true, locale: 'vi' });
			const productPath = `/chi-tiet-san-pham/${productNameSlug}`;

			navigate({
				pathname: productPath
			}, {state : { product: val?._id }});
		},
		[navigate]
	);

	return (
		<>
			<div className="relative w-full p-6">
				<div className="bg-white m-4">
					<strong className="block text-center pb-2 text-xl font-bold text-yellow-400 sm:text-3xl underline">
						Sản phẩm bán chạy
					</strong>
					<Slider {...settings} ref={sliderRef}>							
            {bestSellerProducts.map((product, index) => (
              <div className="cursor-pointer relative group centerMode" onClick={() => handleClickDetails(product)}>
                <div className="p-4 h-[250px] lg:h-[400px] w-full m-auto">
					<img src={LOGO_MO} className="absolute w-24 h-24 top-1/2 left-1/2"/>
                  <img src={product?.variants[0]?.images[0]} className="w-full h-full object-center object-cover" alt={`Slide ${index + 1}`} />
                  <div className="absolute inset-0 btm flex items-end">
                    <div className="bg-black bg-opacity-60 p-4 w-full mx-4 overflow-hidden">
                      <strong className="block text-center text-lg font-bold text-white sm:text-xl">
                        {product?.productName}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
					</Slider>
				</div>
			</div>
		</>
	)
}