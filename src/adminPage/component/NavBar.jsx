import React, { useState, useEffect, useRef } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import { viewProfile } from "../../api/apiServices";
import ChangePassword from "../page/user/ChangePassword";
import Logo from '../../asset/img/LOGO.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function NavBar() {
	const navigate = useNavigate();
	const [showSearch, setShowSearch] = useState(false);
	const [isSignIn, setIsSignIn] = useState(false);
	const [isDropdownOpen, setDropdownOpen] = React.useState(false);
	const [profile, setProfile] = useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogOut = () => {
		localStorage.clear();
		navigate("/dang-nhap")
	}

	useEffect(() => {
		viewProfile()
			.then(res => {
				console.log(res.data.data)
				setProfile(res.data.data)
				setIsSignIn(true)
			})
			.catch(error => {
				console.log(error)
			})
	}, [])

	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
								<span className="sr-only">Open sidebar</span>
								<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
								</svg>
							</button>
							<a onClick={() => navigate("/")} className="flex ml-2 md:mr-24">
								<div className="cursor-pointer w-[40px] h-[40px] relative" >
								<img className="w-full h-full object-center object-cover" src={Logo} />
							</div>
								<span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">NHÀ YẾN THÂN THI</span>
							</a>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
								{!isSignIn ? (
                <button
                  type="button"
                  class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4 bg-green-400 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => navigate("/sign-in")}
                >
                  <span class="text-sm font-medium">Sign in</span>
                </button>
              ) : (
                <>

                  <button
                    type="button"
                    className="text-sm"
                    onMouseOver={() => setDropdownOpen(true)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <AccountCircleIcon />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className="absolute right-0 top-10 z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                          {profile.fullName}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate " role="none">
                          {profile.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                       { profile?.role === "Admin" || profile?.role === "Staff"?
                        <li>
                          <a onClick={() => navigate("/managements/products")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Management</a>
                        </li>
                        : ""}
                        <li>
                          <a className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Change password</a>
                        </li>
                        <li>
                          <a onClick={() => handleLogOut()}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Sign out</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
								</div>
								<div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
									<div className="px-4 py-3" role="none">
										<p className="text-sm text-gray-900 dark:text-white" role="none">
											{profile.fullName}
										</p>
										<p className="text-sm font-medium text-gray-900 truncate " role="none">
											{profile.email}
										</p>
									</div>
									<ul className="py-1" role="none">
										<li>
											<a onClick={() => navigate("/")} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Trang chủ</a>
										</li>
										<li>
											<a onClick={handleClickOpen} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Đổi mật khẩu</a>
										</li>
										<li>
											<a onClick={() => handleLogOut()}
												className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Đăng xuất</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<ChangePassword open={open} close={handleClose} />
		</>
	)
}