import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Card from "../component/Card";

export default function BestSeller() {
	const navigate = useNavigate();
	const sliderRef = useRef(null);
  const data = [
		{
			productName: "Product A",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "1.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "2.000.000VNĐ",
					color: "Blue"
				}
			]
		},
		{
			productName: "Product B",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		}, 
    {
			productName: "Product C",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		},
    {
			productName: "Product D",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		},
    {
			productName: "Product E",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		},
		{
			productName: "Product F",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		},
		{
			productName: "Product H",
			variants: [
				{
					images: [
						'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "3.000.000VNĐ",
					color: "Red"
				},
				{
					images: [
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
						'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80'
					],
					price: "4.000.000VNĐ",
					color: "Blue"
				}
			]
		}
	]

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

//   const handleClickDetails = useCallback(async(val) => {
// 	navigate({
// 		pathname: slug.DETAIL, 
// 		search: `?_id=${val._id}`
// 	})
// })

 const handleClickDetails = () => {
	navigate("/chi-tiet-san-pham")
 }

	return (
		<>
			<div className="relative w-full p-6">
				<div className="bg-white m-4">
					<strong className="block text-center pb-2 text-xl font-bold text-yellow-400 sm:text-3xl underline">
						Sản phẩm bán chạy
					</strong>
					<Slider {...settings} ref={sliderRef}>							
            {data.map((product, index) => (
              <div className="relative group centerMode" onClick={handleClickDetails}>
                <div className="p-4 h-[250px] lg:h-[400px] w-full m-auto">
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