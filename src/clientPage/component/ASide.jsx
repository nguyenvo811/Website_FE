import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductInHome } from '../../api/apiServices';
import StateContext from "./StateContext";
import slugify from 'slugify';

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

const ASide = ({ isSideBarOpen, openSideBar }) => {
	const navigate = useNavigate();
	const { selectCategory } = useStateContext();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const categories = [];

	selectCategory.forEach((category) => {
		if (!category.subCategories) {
			categories.push(category);
		}
	});

	let listTabSide = [
		{
			// icon: <InventoryIcon size='1.3rem' />,
			label: "Giới thiệu",
			path: "/gioi-thieu"
		},
		{
			// icon: <HiUsers size='1.2rem' />,
			label: "Chính sách",
			path: "/chinh-sach"
		},
		{
			// icon: <HiTag size='1.2rem' />,
			label: "Tin tức",
			path: "/tin-tuc"
		},
		{
			// icon: <FeedIcon size='1.2rem' />,
			label: "Liên hệ",
			path: "/lien-he"
		}
	]

	const handleClick = (value) => {
		navigate(value.path)
		openSideBar()
	}

	const handleClickDetails = useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const categoryNameSlug = slugify(val?.categoryName, { lower: true, locale: 'vi' });
			const categoryPath = `/san-pham/danh-muc/${categoryNameSlug}`;

			navigate({
				pathname: categoryPath
			}, { state: { category: val?._id } });
		},
		[navigate]
	);

	const renderCategory = categories.map((val, index) => {
		return (
			<li key={index}>
				<a className="cursor-pointer block p-2 flex items-center" onClick={() => handleClickDetails(val)}>
					{val?.categoryName}
				</a>
			</li>
		)
	})

	const renderTabSide = listTabSide.map((val, index) => (
		<li key={index}>
			<a
				className={`cursor-pointer block`}
				onClick={() => handleClick(val)}
			>
				{val.label}
			</a>
		</li>
	));

	return (
		<>
			{isSideBarOpen && <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
				<div class="fixed inset-0 bg-black bg-opacity-25"></div>
				<div class="fixed inset-0 z-50 flex">
					<div class="relative ml-auto flex h-full w-full max-w-2xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
						<div class="flex items-center justify-between px-4 border-b border-gray-200">
							<h2 class="text-xl font-medium text-gray-900">Bộ lọc</h2>
							<button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" onClick={openSideBar}>
								<span class="sr-only">Close menu</span>
								<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<ul role="list" class="text-left px-4 py-3 space-y-4 text-sm font-medium text-gray-900">
							{renderTabSide}
							<li className="opcion-con-desplegable">
								<div className="flex items-center justify-between">
									<div className="cursor-pointer flex items-center">
										<span onClick={() => navigate('/san-pham')}>Sản phẩm</span>
										<svg
											onClick={toggleDropdown}
											className={`h-5 w-5 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M19 9l-7 7-7-7"
											/>
										</svg>
									</div>
									<i className="fas fa-chevron-down text-xs"></i>
								</div>
								<ul className={`desplegable ml-2 mt-2 ${isDropdownOpen ? 'block' : 'hidden'}`}>
									{renderCategory}
								</ul>
							</li>
						</ul>

					</div>
				</div>
			</div>}
		</>
	);
};

export default ASide;