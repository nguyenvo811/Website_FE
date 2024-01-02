import React, { useState, useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import news_banner from "../../asset/img/news-banner.jpg";
import Newest from "../component/Newest";
import { getNews } from "../../api/apiServices";

export default function News() {
	const [data, setData] = useState([]);

	useEffect(() => {
		getNews()
		.then(res => {
			setData(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [])

	const listNews = data.map((val, index) => {
		return (
			<div href="#" key={index} class="grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow max-w-screen-lg hover:bg-gray-100">
				<div className="w-full h-[400px] m-auto">
					<img class="object-cover object-center w-full h-full rounded-l-lg" src={val.image} alt="" />
				</div>
				<div class="flex flex-col justify-between p-4 leading-normal text-left">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{val.title}</h5>
					<div className="mb-3 text-sm text-gray-700">
						<p class="line-clamp-2">{val.shortDescription}</p>
					</div>
				</div>
			</div>
		)
	})

	const highLightNews = data.map((val, index) => {
		return (
			<div class="text-left w-full mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
					<div className="w-full h-[250px] m-auto">
							<img class="object-cover object-center w-full h-full rounded-t-lg" src={val.image} alt="" />
					</div>
					<div class="p-5">
							<span href="#">
									<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{val.title}</h5>
							</span>
							<div className="mb-3 font-normal text-gray-700">
								<p class="line-clamp-2">{val.shortDescription}</p>
							</div>
							<span href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500">
									Xem thêm
									<svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
											<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
									</svg>
							</span>
					</div>
			</div>
		)
	})

	return (
		<>
			<div className="relative pt-20">
				<div className="relative w-full h-[320px] lg:h-[620px]">
					<div className="absolute sm:left-20 sm:bottom-20 left-5 bottom-5 text-left z-10">
						<div className="bg-black  bg-opacity-10 p-4 rounded-lg">
							<strong className="block text-2xl font-bold text-white sm:text-4xl pb-2">
								TIN TỨC
							</strong>
							<p className="text-md sm:text-xl text-justify text-white">
								Trang chuyên về tin tức ngành yến.
							</p>
						</div>
					</div>
					<div className="absolute w-full h-full bg-black opacity-10"></div>
					<img src={news_banner} className="w-full h-full object-cover object-center" />
				</div>

				<Newest />

				<div className="grid grid-cols-3 gap-4 p-10 px-40">
					<div class="col-span-2 w-full mx-auto">
						<div className="flex flex-wrap gap-4">
							{listNews}
						</div>
					</div>
					<div class="col-span-1 w-full mx-auto">
						<div className="gap-4">
							<div className="flex text-left mb-2">
								<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
								<strong
									class="block text-2xl font-bold text-black"
								>
									TIN NỔI BẬT
								</strong>
							</div>
							{highLightNews}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
