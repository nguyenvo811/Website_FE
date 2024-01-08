import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import Carousel from "../component/Carousel";
import cooperateImg from "../../asset/img/wepik-export-20231121015625G76j.png"
import NewProduct from "../component/NewProduct";
import BestSeller from "../component/BestSeller";
import Contribute from "../component/Contribute";
// import Card from "../component/Card";

export default function Home() {

	return (
		<>
			<div className="relative">
				<Carousel />
				<div className="bg-white m-4">
					<div className="block md:grid md:grid-cols-2 items-center justify-center">
						<div className="px-8 lg:px-20">
							<strong className="block text-center pb-2 text-xl font-bold text-yellow-400 sm:text-3xl">
								Cam kết sản phẩm chính hãng 100%
							</strong>
							<p className="block text-center text-sm font-normal text-black sm:text-xl">
								Tự hào là một nhà cung cấp và phân phối thiết bị - sản phẩm, 
								chúng tôi xin cam kết rằng thiết bị nhà yến đảm bảo 
								chất lượng cao được nhập khẩu 100% từ nước ngoài như Indonesia, Malaysia, Đài Loan,...
								Với sứ mệnh cao cả là thúc đẩy ngành yến tại Việt Nam, chúng tôi mang đến cho khách hàng 
								những thiết bị và sản phẩm cao cấp và tân tiến nhất cùng với những giải pháp hiệu quả cho nhà yến của bạn.
							</p>
							<div className="text-center py-4">
								<button className="rounded-full bg-yellow-400 px-5 py-3 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center mx-auto">
									Tham khảo
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4 ml-1 transform rotate-90"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
								</button>
							</div>
						</div>
						<div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full m-auto border-4 border-solid border-yellow-400">
							<img src={cooperateImg} className="w-full h-full object-center object-cover rounded-full" />
						</div>
					</div>
				</div>
				<NewProduct />
				<BestSeller />
				{/* <Contribute /> */}
			</div>
		</>
	)
}