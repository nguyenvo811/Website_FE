import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	HiUsers,
	HiTag
} from "react-icons/hi";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import FeedIcon from '@mui/icons-material/Feed';
import BadgeIcon from '@mui/icons-material/Badge';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
export default function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();
	const data = [
		{
			icon: <InventoryIcon size='1.3rem' />,
			label: "Sản phẩm",
			path: "/quan-ly/san-pham"
		},
		{
			icon: <HiUsers size='1.2rem' />,
			label: "Người dùng",
			path: "/quan-ly/nguoi-dung"
		},
		{
			icon: <CategoryIcon size='1.2rem' />,
			label: "Danh mục sản phẩm",
			path: "/quan-ly/danh-muc"
		},
		{
			icon: <HiTag size='1.2rem' />,
			label: "Thương hiệu",
			path: "/quan-ly/nhan-hieu"
		},
		{
			icon: <FeedIcon size='1.2rem' />,
			label: "Tin tức",
			path: "/quan-ly/tin-tuc"
		},
		{
			icon: <SupportAgentIcon size='1.2rem' />,
			label: "Nhân viên",
			path: "/quan-ly/lien-he"
		},
		{
			icon: <BadgeIcon size='1.2rem' />,
			label: "Khách hàng",
			path: "/quan-ly/khach-hang"
		}
	]

	const sideBarHeading = data.map((val, index) => {
		return (
			<li data-drawer-hide="logo-sidebar"
				className=
				{`cursor-pointer ${val.path === location.pathname
					? "bg-gray-100 dark:bg-gray-700"
					: ""}
				`} >
				<a key={index} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => navigate(val.path)}>
					<svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						{val.icon}
					</svg>
					<span className="ml-3">{val.label}</span>
				</a>
			</li>
		)
	})

	return (
		<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
			<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
				<ul className="space-y-2">
					{sideBarHeading}
				</ul>
			</div>
		</aside>
	)
}