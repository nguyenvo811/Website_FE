import React, { useRef } from "react";
import Slider from "react-slick";
import feat from "../../asset/img/feat.jpg";
import certificate from "../../asset/img/certificate.jpg";
import adambao from "../../asset/img/adambao.jpg";

export default function Carousel() {
  const sliderRef = useRef(null);
  
  let images = [
    feat,
    certificate,
    adambao,
  ];

  const PrevArrow = (props) => (
    <button
      {...props}
      className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 hover:bg-opacity-30 hover:bg-gray-400 rounded-full"
      onClick={() => sliderRef.current.slickPrev()}
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full">
        <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>
  );

  const NextArrow = (props) => (
    <button
      {...props}
      className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 hover:bg-opacity-30 hover:bg-gray-400 rounded-full" 
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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="w-full relative">
      <Slider {...settings} ref={sliderRef}>
        {images.map((image, index) => (
          <div key={index} className="h-[450px] lg:h-[750px] w-full m-auto relative group">
            <img src={image} className="w-full h-full object-center object-cover duration-700" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
