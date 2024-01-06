import React, { useState, useEffect, useRef, useCallback } from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import contact_img from "../../asset/img/contact_img.avif";
import { Link, useNavigate } from "react-router-dom";
import { getNews } from "../../api/apiServices";
import slugify from 'slugify';
import CallIcon from '@mui/icons-material/Call';
import { Label, TextInput, Textarea } from "flowbite-react";

export default function News() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });

		getNews()
			.then(res => {
				setData(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	return (
		<>
			<div className="relative pt-20">
				<div className="relative w-full h-[320px] lg:h-[620px]">
					<div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
						<div className="p-4">
							<strong className="block text-2xl font-bold text-white sm:text-4xl pb-2">
								LIÊN HỆ CHO CHÚNG TÔI
							</strong>
							<p className="max-w-2xl text-md sm:text-xl text-white">
								Chúng tôi sử dụng các phương pháp tiếp cận linh hoạt để kiểm tra và kết nối với nhu cầu của khách hàng sớm hơn và thường xuyên.
							</p>
						</div>
					</div>
					<div className="absolute space-y-4 p-6 top-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] bg-white border border-gray-200 rounded-lg shadow z-10 mx-auto">
						<div className="text-left space-y-6">
							<div className='grid grid-cols-2 gap-2'>
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="firstName"
											value="Họ"
										/>
									</div>
									<TextInput
										id="firstName"
										name="firstName"
										placeholder="Họ của bạn"
										required
										type="text"
									// value={newBrand.brandName}
									// onChange={handleChangeInput}
									/>
									{/* <p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p> */}
								</div>

								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="lastName"
											value="Tên"
										/>
									</div>
									<TextInput
										id="lastName"
										name="lastName"
										placeholder="Tên của bạn"
										required
										type="text"
									// value={newBrand.brandName}
									// onChange={handleChangeInput}
									/>
									{/* <p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p> */}
								</div>
							</div>
							<div className='grid grid-cols-2 gap-2'>
								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="phoneNumber"
											value="Số điện thoại"
										/>
									</div>
									<TextInput
										id="phoneNumber"
										name="phoneNumber"
										placeholder="+12 345 6789"
										required
										type="text"
									// value={newBrand.brandName}
									// onChange={handleChangeInput}
									/>
									{/* <p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p> */}
								</div>

								<div>
									<div className="mb-2 block">
										<Label
											htmlFor="email"
											value="Email"
										/>
									</div>
									<TextInput
										id="email"
										name="email"
										placeholder="Ví dụ: yensaokiengiang@gmail.com"
										required
										type="text"
									// value={newBrand.brandName}
									// onChange={handleChangeInput}
									/>
									{/* <p class="mt-1 text-sm text-red-500"> 
										{error.brandName}
									</p> */}
								</div>
							</div>

							<div>
								<div className="mb-2 block">
									<Label
										htmlFor="message"
										value="Nội dung"
									/>
								</div>
								<Textarea
									id="message"
									name="message"
									placeholder="Hãy để lại nội dung"
									required
									rows={8}
								// value={newBrand.description}
								// onChange={handleChangeInput}
								/>
								{/* <p class="mt-1 text-sm text-red-500"> 
									{error.description}
								</p> */}
							</div>
						</div>
						<p className="text-left text-sm text-gray-500">Bằng cách gửi biểu mẫu này, bạn đồng ý với các điều khoản và điều kiện cũng như chính sách quyền riêng tư của chúng tôi.</p>
						<div className="">
							<button className="mt-2.5 rounded-md bg-yellow-400 px-4 py-2 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center">
								Gửi biểu mẫu
							</button>
						</div>
					</div>
					<div className="absolute w-full h-full bg-black opacity-40"></div>
					<img src={contact_img} className="w-full h-full object-cover object-center" />
				</div>
				<div className="w-full bg-white mt-60">
					<div className="p-10 px-40">
						<div className="flex justify-center items-center">
							<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2">
								<div className="flex justify-center item-center">
									<div className="w-14 h-14 bg-yellow-400 rounded-xl p-2 flex items-center justify-center">
										<CallIcon className="h-8 w-8 text-white" />
									</div>
								</div>
								<div className="space-y-2">
									<div className="text-xl font-medium text-black">Contact us:</div>
									<p className="text-gray-500">
										Contact us for general queries, including marketing and partnership opportunities.
									</p>
									<a href="tel:+123456789" className="text-black hover:underline">+1 (234) 567-89</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
