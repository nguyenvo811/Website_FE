import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "react-toggle/style.css"
import StateContext from "./StateContext";
import ASide from "./ASide";
import Logo from '../../asset/img/LOGO.png';
import { getProductInHome } from "../../api/apiServices";
import { FormatCurrency } from "../../asset/FormatCurrency";
import slugify from 'slugify';
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

export default function Header(props) {
	const navigate = useNavigate();
	const { open, setOpen } = useStateContext();
	const { category } = props;

	const [isDropdownOpen, setDropdownOpen] = useState(false);
	const [showSearch, setShowSearch] = useState(true);
	const [scrolled, setScrolled] = useState(false);
	const [isSideBarOpen, setIsSideBarOpen] = useState(false)
	const [data, setData] = useState([])
	
	const openSideBar = () => {setIsSideBarOpen(!isSideBarOpen)}

	useEffect(() => {
		getProductInHome()
		.then(res => {
			setData(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = `font-sans w-full m-0 fixed top-0 z-40 ${
    window.location.pathname !== "/" && !scrolled
      ? "bg-red-700 opacity-100 transition-all duration-300 ease-in"
      : scrolled
      ? "bg-red-700 transition-all duration-300 ease-in"
      : "bg-opacity-0 transition-all duration-300 ease-out"
  }`;

	const categories = [];

  category.forEach((category) => {
    if (!category.subCategories) {
      categories.push(category);
    }
  });

	const handleClick = useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const categoryNameSlug = slugify(val?.categoryName, { lower: true, locale: 'vi' });
			const categoryPath = `/san-pham/danh-muc/${categoryNameSlug}`;

			navigate({
				pathname: categoryPath
			}, {state: { category: val?._id }});
		},
		[navigate]
	);

	const renderCategory = categories.map((val, index) => {
		return (
			<>
				<li
					key={index}
					// className="cursor-pointer block text-sm font-semibold px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
					onClick={() => handleClick(val)}
				>
					<span className="cursor-pointer block text-sm font-semibold px-4 py-2 text-gray-800 hover:bg-red-700 hover:text-white">{val.categoryName}</span>
				</li>
			</>
		)
	})

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const removeSpecialCharacters = (text) => {
		return text.replace(/[^\w\s]/gi, "").toLowerCase();
	};
	
	const handleFilter = (event) => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);
	
		if (searchWord.trim() === "") {
			setFilteredData([]);
			setShowSearch(false);
			return;
		}
	
		const normalizedSearch = removeSpecialCharacters(searchWord);
	
		const newFilter = data.filter((value) => {
			const normalizedProductName = removeSpecialCharacters(value.productName);
	
			// Check if the normalized search word is included in the normalized product name
			return normalizedProductName.includes(normalizedSearch);
		});
	
		setFilteredData(newFilter);
		setShowSearch(true);
	};

  const handleClickDetails = useCallback(
		async (val) => {
			// Define the logic for handling click details
			console.log("Item Clicked:", val);

			// Example: Navigate to the product details page
			const productNameSlug = slugify(val?.productName, { lower: true, locale: 'vi' });
			const productPath = `/chi-tiet-san-pham/${productNameSlug}`;

			navigate({
				pathname: productPath
			}, {state : { product: val?._id }});
		},
		[navigate]
	);
 
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSearch = (val) => {
    setWordEntered(val.productName)
    setShowSearch(false)
    clearInput()
  }

  // search
	const search = useCallback(
		async (searchWord, e) => {
			e.preventDefault();
			setShowSearch(false)
			// Example: Navigate to the product details page
			const searchNameSlug = slugify(searchWord, { lower: true, locale: 'vi' });
			const searchPath = `/san-pham/${searchNameSlug}`;

			navigate({
				pathname: searchPath,
				search: `?search=${searchWord}`
			}, {state : { search: searchWord }});
		},
		[navigate]
	);

  const showData = filteredData?.length !== 0 ? (
		<div className="absolute left-0 top-1 w-[300px] sm:w-[400px] rounded-md overflow-x-auto bg-white border py-2 mx-auto">
			{filteredData.slice(0, 15).map((val, index) => (
				<div key={index} onClick={() => {return handleSearch(val), handleClickDetails(val)}}
					className="cursor-pointer text-sm flex">
					{console.log(val)}
					<div className="px-2 w-full">
							<div className="grid items-center grid-cols-3 py-2 hover:bg-gray-100 text-black">
								<img key={index} src={val?.variants[0]?.images[0]} className="w-[70px] h-[60px] object-center object-cover" alt={`Slide ${index + 1}`} />
								<div className="text-left pl-2 overflow-hidden scroll-m-0">
									<span className="block">{val?.productName}</span>
								</div>
								<span className=""><FormatCurrency price={val?.variants[0]?.price} /></span>
							</div>
					</div>
				</div>
			))}
		</div>
	) : (
		wordEntered && (
			<div className="absolute left-0 top-1 w-[300px] sm:w-[400px] rounded-md overflow-x-auto bg-white border py-2 mx-auto text-center text-gray-500">
				Không tìm thấy sản phẩm.
			</div>
		)
	);

	return (
		<>
			<div className={headerClass}>
				<div class="">
					<div class="container mx-auto px-4">
						<div class="flex items-center justify-between py-2">
							<div className="cursor-pointer w-[70px] h-[70px] relative" onClick={() => navigate("/")}>
								<img className="w-full h-full object-center object-cover" src={Logo} />
							</div>

							<div class="hidden lg:flex lg:items-center">
								<ul class="flex justify-center items-center">
									<li onClick={() => navigate("/gioi-thieu") }><a class="cursor-pointer text-white text-sm font-semibold hover:text-yellow-400 mr-4">Giới thiệu</a></li>
									<li onClick={() => navigate("/chinh-sach")} ><a class="cursor-pointer text-white text-sm font-semibold hover:text-yellow-400 mr-4">Chính sách</a></li>
									<li className="relative inline-block" onClick={() => navigate("/san-pham")}>
										<button
											className="flex justify-center items-center text-white text-sm font-semibold mr-4"
											onMouseOver={() => { return setDropdownOpen(true) }}
										>
											<span>Sản phẩm</span>
											<svg
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
										</button>
									</li>
									<li onClick={() => navigate("/tin-tuc")} ><a class="cursor-pointer text-white text-sm font-semibold hover:text-yellow-400 mr-4">Tin tức</a></li>
									<li onClick={() => navigate("/lien-he")} ><a class="cursor-pointer text-white text-sm font-semibold hover:text-yellow-400 mr-4">Liên hệ</a></li>
								</ul>
							</div>

							<div class="lg:items-center">
								<form>
									<div class="relative w-[300px] sm:w-[400px]">
										<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
												<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
										</div>
										<input 
											type="search" 
											class="block w-full pl-10 rounded-md border border-[#DDE2E4] px-3 py-2 text-sm text-gray-800" 
											placeholder="Tên sản phẩm..." 
											value={wordEntered}
            					onChange={handleFilter}
											required/>
										<button 
											type="submit" 
											class="text-white absolute top-0 right-0 bottom-0 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-md text-xs sm:text-sm px-2 sm:px-4 sm:py-2"
											onClick={(e) => search(wordEntered, e)}
										>Tìm kiếm</button>
									</div>
								</form>
								<div className={`relative flex border-t-none z-10 bg-gray-50 justify-center ${showSearch? "" : "hidden"}`} onMouseLeave={() => { return setShowSearch(false) }}> 
									<div className="mx-auto" > 
										{showData}
									</div>
								</div>
							</div>

							<div class="lg:hidden cursor-pointer mx-2" onClick={openSideBar}>
								<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24">
									<path fill="currentColor" d="M12.9499909,17 C12.7183558,18.1411202 11.709479,19 10.5,19 C9.29052104,19 8.28164422,18.1411202 8.05000906,17 L3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L8.05000906,16 C8.28164422,14.8588798 9.29052104,14 10.5,14 C11.709479,14 12.7183558,14.8588798 12.9499909,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L12.9499909,17 Z M18.9499909,12 C18.7183558,13.1411202 17.709479,14 16.5,14 C15.290521,14 14.2816442,13.1411202 14.0500091,12 L3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L14.0500091,11 C14.2816442,9.85887984 15.290521,9 16.5,9 C17.709479,9 18.7183558,9.85887984 18.9499909,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L18.9499909,12 Z M9.94999094,7 C9.71835578,8.14112016 8.70947896,9 7.5,9 C6.29052104,9 5.28164422,8.14112016 5.05000906,7 L3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L5.05000906,6 C5.28164422,4.85887984 6.29052104,4 7.5,4 C8.70947896,4 9.71835578,4.85887984 9.94999094,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L9.94999094,7 Z M7.5,8 C8.32842712,8 9,7.32842712 9,6.5 C9,5.67157288 8.32842712,5 7.5,5 C6.67157288,5 6,5.67157288 6,6.5 C6,7.32842712 6.67157288,8 7.5,8 Z M16.5,13 C17.3284271,13 18,12.3284271 18,11.5 C18,10.6715729 17.3284271,10 16.5,10 C15.6715729,10 15,10.6715729 15,11.5 C15,12.3284271 15.6715729,13 16.5,13 Z M10.5,18 C11.3284271,18 12,17.3284271 12,16.5 C12,15.6715729 11.3284271,15 10.5,15 C9.67157288,15 9,15.6715729 9,16.5 C9,17.3284271 9.67157288,18 10.5,18 Z" />
								</svg>
							</div>
						</div>

						{/* <div class="block sm:hidden bg-white border-t-2 py-2">
							<div class="flex flex-col">
								<a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Products</a>
								<a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Marketplace</a>
								<a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Partners</a>
								<a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1">Pricing</a>
								<div class="flex justify-between items-center border-t-2 pt-2">
									<a href="#" class="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">Sign in</a>
									<a href="#" class="text-gray-800 text-sm font-semibold border px-4 py-1 rounded-lg hover:text-purple-600 hover:border-purple-600">Sign up</a>
								</div>
							</div>
						</div> */}
						{isSideBarOpen && <ASide isSideBarOpen={isSideBarOpen} openSideBar={openSideBar} />}
					</div>
					{isDropdownOpen && (
						<div
							className="absolute w-full z-10 left-0 space-y-2 bg-white border rounded shadow-md"
						>
							<ul class="gap-x-8 text-white" onMouseLeave={() => { return setDropdownOpen(false)}}>
								{renderCategory}
							</ul>
						</div>
					)}
					
				</div>
			</div>
		</>
	)
}