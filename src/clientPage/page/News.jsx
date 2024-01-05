import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import news_banner from "../../asset/img/news-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import Newest from "../component/Newest";
import { getNews } from "../../api/apiServices";
import slugify from 'slugify';

export default function News() {
	const navigate = useNavigate();
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

	const highLight = data
  .filter((val) => val?.active === true && val?.newest === false && val?.highLight === true)

	const news = data
  .filter((val) => val?.active === true)

	const handleClickDetails = useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const tiltleSlug = slugify(val?.title, { lower: true, locale: 'vi' });
			const titlePath = `/tin-tuc/${tiltleSlug}`;

			navigate({
				pathname: titlePath
			}, {state : val?._id});
		},
		[navigate]
	);

	const handleSeeMore = useCallback(
		async (status, value) => {
			console.log("ssss", value)
			const tiltleSlug = slugify(status, { lower: true, locale: 'vi' });
			const statusPath = `/${tiltleSlug}`;

			navigate({
				pathname: statusPath
			}, {state : {
				name: status,
				data: value
			}});
		},
		[navigate]
	);


	const listNews = news.slice(0, 10).map((val, index) => {
		return (
			<div href="#" key={index} class="flex-wrap grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow max-w-screen-lg hover:bg-gray-100">
				<div className="w-full h-[200px] lg:h-[400px] m-auto">
					<img class="object-cover object-center w-full h-full rounded-l-lg" src={val.image} alt="" />
				</div>
				<div class="flex flex-col justify-between p-4 leading-normal text-left">
					<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{val.title}</h5>
					<div className="mb-3 text-sm text-gray-700">
						<p class="line-clamp-2">{val.shortDescription}</p>
					</div>
					<div>
						<span href="#" class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500" onClick={() => handleClickDetails(val)}>
							Xem thêm
							<svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
								<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
							</svg>
						</span>
					</div>
				</div>
			</div>
		)
	})

	const highLightNews = highLight.slice(0, 10).map((val, index) => {
		return (
			<div key={index} class="text-left w-full mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
				<div className="w-full h-[150px] lg:h-[250px] m-auto">
					<img class="object-cover object-center w-full h-full rounded-t-lg" src={val.image} alt="" />
				</div>
				<div class="p-5">
					<span href="#">
						<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 ">{val.title}</h5>
					</span>
					<div className="mb-3 font-normal text-gray-700">
						<p class="line-clamp-2">{val.shortDescription}</p>
					</div>
					<span href="#" class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-400 rounded-lg hover:bg-yellow-500" onClick={() => handleClickDetails(val)}>
						Xem thêm
						<svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
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

				<div className="grid md:grid-cols-3 gap-4 p-10 px-20 lg:px-40">
					<div class="md:col-span-2 w-full mx-auto">
						<div className="flex flex-wrap gap-4 justify-center">
							{listNews}
							{news.length >= 10 && (
								<span href="#" class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black hover:text-gray-500" onClick={() => handleSeeMore('Danh sách tin tức', news)}>
									Xem thêm
									<svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
									</svg>
								</span>
							)}
						</div>
					</div>
					<div class="hidden md:block md:col-span-1 w-full mx-auto">
						<div className="gap-4">
							<div className="flex text-left mb-2 justify-center">
								<span class="block mr-2 w-1 h-7 bg-yellow-400 rounded"></span>
								<strong
									class="block text-2xl font-bold text-black"
								>
									TIN NỔI BẬT
								</strong>
							</div>
							{highLightNews}
							{highLight.length >= 10 && (
								<span href="#" class="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black hover:text-gray-500" onClick={() => handleSeeMore('Tin nổi bật', highLight)}>
									Xem thêm
									<svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
										<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
									</svg>
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
