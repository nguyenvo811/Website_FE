import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import StateContext from "./StateContext";
import ContactSection from "./ContactSection";
import logoSaleNoti from "../../asset/img/logoSaleNoti.png";
// import { viewProfile } from "../../api/apiServices";
// import ChangePassword from "../page/user/ChangePassword";

function useStateContext() {
	// Get the context value
	const context = React.useContext(StateContext);

	// Throw an error if the context is undefined
	if (context === undefined) {
		throw new Error('useStateContext must be used within a StateContext.Provider');
	}

	// Return the context value
	return context;
}

export default function Footer(props) {
	const navigate = useNavigate();
	// const { open, setOpen } = useStateContext();
	// const { category } = props;

	// const [isDropdownOpen, setDropdownOpen] = useState(false);
	// const [showSearch, setShowSearch] = useState(true);

	// const [profile, setProfile] = useState([]);
	// const [open, setOpen] = React.useState(false);

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	// const handleClose = () => {
	// 	setOpen(false);
	// };




	return (
		<footer>
			<div class="bg-red-700 px-4 pb-8 pt-6 sm:px-6 lg:px-8">
				<div class="mx-auto max-w-md">
					<strong
						class="block text-center text-xl font-bold text-white sm:text-2xl"
					>
						Đăng ký ngay để nhận được những thông tin sản phẩm và ưu đãi mới nhất đến từ Nhà Yến Thân Thi
					</strong>

					<form class="mt-6">
						<div class="relative max-w-lg">
							<label class="sr-only" for="email"> Email </label>

							<input
								class="w-full rounded-full border-gray-200 bg-gray-100 p-4 pe-32 text-sm font-medium"
								id="email"
								type="email"
								placeholder="Địa chỉ email"
							/>

							<button
								class="absolute end-1 top-1/2 -translate-y-1/2 rounded-full bg-yellow-400 px-5 py-3 text-sm font-medium text-white transition hover:bg-yellow-500"
							>
								Đăng ký
							</button>
						</div>
					</form>
				</div>
			</div>
			<div class="bg-white lg:grid lg:grid-cols-5">
				<div class="relative block h-72 lg:col-span-2 lg:h-full">
					<div
						class="absolute inset-0 h-full w-full object-cover"
					>
						<ContactSection />
					</div>
				</div>

				<div class="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
					<div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
						<div>

							<div>
								<span class="text-xs uppercase tracking-wide text-gray-500">
									LIÊN HỆ ĐẶT HÀNG
								</span>

								<p onClick={() => navigate("/lien-he")} className="cursor-pointer block text-2xl font-medium text-gray-900 sm:text-3xl rounded-full text-gray-900 text-sm font-medium transition hover:text-gray-500 flex items-center justify-center mx-auto">
									LIÊN HỆ NGAY
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-8 w-8 ml-1 transform rotate-90"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
								</p>
							</div>

							<ul class="mt-8 space-y-1 text-sm text-gray-700">
								<li>Làm việc từ thứ hai đến thứ bảy</li>
								<li>Sáng: 7:30</li>
								<li>Chiều: 17:00</li>
							</ul>

							<ul class="mt-8 flex item-center justify-center gap-6">
								<li>
									<a
										href="https://www.facebook.com/thanthi.nhayen?locale=vi_VN"
										rel="noreferrer"
										target="_blank"
										class="text-gray-700 transition hover:opacity-75"
									>
										<span class="sr-only">Facebook</span>

										<svg 
											xmlns="http://www.w3.org/2000/svg" 
											width="24" height="24" 
											fill="currentColor" 
											class="bi bi-facebook" 
											viewBox="0 0 16 16" 
											id="IconChangeColor"
										> 
											<path 
												d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" 
												id="mainIconPathAttribute">
											</path> 
										</svg>
									</a>
								</li>

								<li>
									<a
										href="https://www.youtube.com/@BIRDNESTTHANTHIVIETNAM"
										rel="noreferrer"
										target="_blank"
										class="text-gray-700 transition hover:opacity-75"
									>
										<span class="sr-only">Youtube</span>

										<svg 
											xmlns="http://www.w3.org/2000/svg" 
											width="24" height="24" 
											fill="currentColor" 
											class="bi bi-youtube" 
											viewBox="0 0 16 16"
										> 
											<path 
												d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
											/> 
										</svg>
									</a>
								</li>

								<li>
									<a
										href="https://www.tiktok.com/@audaxindonesia?_t=8ir7IvJjZaL&_r=1"
										rel="noreferrer"
										target="_blank"
										class="text-gray-700 transition hover:opacity-75"
									>
										<span class="sr-only">Tiktok</span>

										<svg
											id="changeColor"
											fill="#DC7633"
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											zoomAndPan="magnify"
											viewBox="0 0 375 374.9999"
											height="24"
											preserveAspectRatio="xMidYMid meet"
											version="1.0"
										>
											<defs>
												<path
													id="pathAttribute"
													d="M 7.09375 7.09375 L 367.84375 7.09375 L 367.84375 367.84375 L 7.09375 367.84375 Z M 7.09375 7.09375 "
													fill="#374151"
												></path>
											</defs>
											<g>
												<path
													id="pathAttribute"
													d="M 187.46875 7.09375 C 87.851562 7.09375 7.09375 87.851562 7.09375 187.46875 C 7.09375 287.085938 87.851562 367.84375 187.46875 367.84375 C 287.085938 367.84375 367.84375 287.085938 367.84375 187.46875 C 367.84375 87.851562 287.085938 7.09375 187.46875 7.09375 "
													fill-opacity="1"
													fill-rule="nonzero"
													fill="#374151"
												></path>
											</g>
											<g id="inner-icon" transform="translate(85, 75)">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="199.8"
													height="199.8"
													fill="#ffffff"
													class="bi bi-tiktok"
													viewBox="0 0 16 16"
													id="IconChangeColor"
												>
													<path
														d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z"
														id="mainIconPathAttribute"
													></path>
												</svg>
											</g>
										</svg>
									</a>
								</li>
							</ul>
						</div>

						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<p class="font-medium text-gray-900">Về chúng tôi</p>

								<ul class="mt-6 space-y-4 text-sm">
									<li>
										<a onClick={() => navigate("/gioi-thieu")} class="cursor-pointer text-gray-700 transition hover:opacity-75">
											Giới thiệu
										</a>
									</li>

									<li>
										<a onClick={() => navigate("/tin-tuc")} href="#" class="cursor-pointer text-gray-700 transition hover:opacity-75">
											Tin tức
										</a>
									</li>

									<li>
										<a onClick={() => navigate("/lien-he")} class="cursor-pointer text-gray-700 transition hover:opacity-75">
											Liên hệ
										</a>
									</li>

									<li>
										<a onClick={() => navigate("/san-pham")} href="#" class="cursor-pointer text-gray-700 transition hover:opacity-75">
											Sản phẩm
										</a>
									</li>
								</ul>
							</div>

							<div>
								<p class="font-medium text-gray-900">Hổ trợ và dịch vụ</p>

								<ul class="mt-6 space-y-4 text-sm">
									<li>
										<a onClick={() => navigate("/chinh-sach")} class="cursor-pointer text-gray-700 transition hover:opacity-75">
											Chính sách
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="mt-12 border-t border-gray-100 pt-12">
						<div class="sm:flex sm:items-center sm:justify-between gap-4">
							<div className="w-[200px] m-auto sm:m-0">
								<a className="" href="http://online.gov.vn/Home/WebDetails/68453" target="_blank">
									<img src={logoSaleNoti} className="w-full" />
								</a>
							</div>

							<ul class="sm:flex flex-wrap gap-4 text-xs mt-8 m-auto sm:m-0">
								<li>
									<a href="#" class="text-gray-500 transition hover:opacity-75">
										Terms & Conditions
									</a>
								</li>

								<li>
									<a href="#" class="text-gray-500 transition hover:opacity-75">
										Privacy Policy
									</a>
								</li>

								<li>
									<a href="#" class="text-gray-500 transition hover:opacity-75">
										Cookies
									</a>
								</li>
							</ul>

							<p class="mt-8 text-xs text-gray-500 sm:mt-0 m-auto sm:m-0">
								&copy; 2018. Nhà Yến Thân Thi. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}