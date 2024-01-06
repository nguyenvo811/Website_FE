import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StateContext from "../component/StateContext";
import { getProductByCategory, getProductInHome, searchProducts } from "../../api/apiServices";
import { FormatCurrency } from "../../asset/FormatCurrency";
import slugify from 'slugify';
import { Label, Select } from "flowbite-react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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

export default function AllProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectCategory, selectBrand } = useStateContext();

  const [filters, setFilters] = useState({
    subCategory: '',
    brand: '',
    category: '',
    sort: ''
  });


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const openSideBar = () => { setIsSideBarOpen(!isSideBarOpen) }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getProductInHome()
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })

    if (location?.search && location?.state?.search) {
      searchProducts(location?.state?.search)
        .then(res => {
          console.log(res.data.data)
          setSearchData(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }

    if (location?.state?.category) {
      getProductByCategory(location?.state?.category)
        .then(res => {
          console.log("result ", res.data.data)
          setCategoryData(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [location?.state?.search, location?.search, location?.state?.category])

  const subCategoryList = selectCategory.find(val => {
    if (val._id === filters.category) {
      return val
    }
  });

  let sort = [
    { _id: 1, value: "Mới nhất" },
    { _id: 2, value: "Giá từ thấp đến cao" },
    { _id: 3, value: "Giá từ cao đến thấp" },
  ]

  const applySorting = (products, sortOption) => {
    switch (sortOption) {
      case '1':
        // Sort by the newest
        return products.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
      case '2':
        // Sort by price low to high
        return products.sort((a, b) => a?.variants[0]?.price - b?.variants[0]?.price);
      case '3':
        // Sort by price high to low
        return products.sort((a, b) => b?.variants[0]?.price - a?.variants[0]?.price);
      default:
        return products;
    }
  };

  const handleFilterChange = (filters) => {
    if (filters?.category) {
      const findCategory = selectCategory?.find((val) => val?._id === filters.category);
      const categoryNameSlug = slugify(findCategory?.categoryName, { lower: true, locale: 'vi' });
      const categoryPath = `/san-pham/danh-muc/${categoryNameSlug}`;

      navigate({
        pathname: categoryPath,
      });
    }

    // Implement your logic to filter products based on the provided filters
    const updatedFilteredProducts = data.filter((product) => {
      // Access the nested category object
      console.log(product)
      const categoryMatches = !filters.category || product?.category?._id === filters.category;
      const subCategoryMatches = !filters.subCategory || product?.subCategory === filters.subCategory;
      const brandMatches = !filters.brand || product?.brand?._id === filters?.brand;

      // Combine the conditions with logical AND
      return (categoryMatches && subCategoryMatches && brandMatches) || (!categoryMatches && !subCategoryMatches && !brandMatches);
    });

    const sortedProducts = applySorting(updatedFilteredProducts, filters.sort);
    // Update the state with the filtered products
    setFilteredProducts(sortedProducts);
  };

  const handleSelectedCategoryChange = (categoryId) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        category: categoryId,
        subCategory: "",
      };
      handleFilterChange(updatedFilters); // Call onFilterChange with the updated filters
      return updatedFilters; // Return the updated filters to setFilters
    });
  };

  // When sorting is changed:
  const handleSortChange = (e) => {
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        sort: e.target.value,
      };
      handleFilterChange(updatedFilters); // Call onFilterChange with the updated filters
      return updatedFilters; // Return the updated filters to setFilters
    });
  };

  const renderCategory = selectCategory.map((val, index) => (
    <li key={index}>
      <a
        className={`cursor-pointer block ${val._id === filters?.subCategory ? 'selected' : ''}`}
        onClick={() => handleSelectedCategoryChange(val._id)}
      >
        {val.categoryName}
      </a>
    </li>
  ));

  // pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages based on the data source
  const totalPages = Math.ceil(
    (location?.search && location?.state?.search
      ? searchData?.length
      : location?.state?.category
        ? categoryData?.length
        : filteredProducts?.length) / itemsPerPage
  );

  const handleChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate the index range for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extract data for the current page
  const currentPageData =
    location?.search && location?.state?.search
      ? searchData?.slice(startIndex, endIndex)
      : location?.state?.category
        ? categoryData?.slice(startIndex, endIndex)
        : filteredProducts?.slice(startIndex, endIndex);

  useEffect(() => {
    setFilteredProducts(data)
  }, [data])

  const listProduct = currentPageData?.length !== 0 ? (
    currentPageData?.map((val, index) => {
      return (
        <div key={index} className="lg:basis-[calc(100%/3-16px)] basis-[calc(100%/2-16px)] w-[330px] overflow-hidden">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="w-full md:h-[300px] h-[200px] ">
              <img className="rounded-t-lg w-full h-full object-cover object-center" src={val?.variants[0]?.images[0]} alt="product image" />
            </div>
            <div className="mt-2.5 px-5 pb-5">
              <a href="#">
                <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md font-semibold tracking-tight text-gray-900">{val?.productName}</h5>
              </a>
              <div className="flex items-center mt-2.5">
                <span href="#">
                  <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md tracking-tight text-gray-400">{val?.origin}</h5>
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-bold text-gray-900"><FormatCurrency price={val?.variants[0]?.price} /></span>
                <div className="">
                  <button className="mt-2.5 rounded-md bg-yellow-400 px-4 py-2 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center">
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
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full max-w-sm mx-auto text-center text-gray-500">Không tìm thấy sản phẩm.</div>
  );

  useEffect(() => {
    if (searchData) {
      const sortedProducts = applySorting(searchData, filters.sort);
      // Update the state with the filtered products
      setFilteredProducts(sortedProducts);
    }

    if (categoryData) {
      const sortedProducts = applySorting(categoryData, filters.sort);
      // Update the state with the filtered products
      setFilteredProducts(sortedProducts);
    }
  }, [searchData, categoryData, filters.sort]);

  const searchResult = currentPageData?.length !== 0 ? (
    currentPageData?.map((val, index) => {
      return (
        <div key={index} className="lg:basis-[calc(100%/3-16px)] basis-[calc(100%/2-16px)] w-[330px] overflow-hidden">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="w-full md:h-[300px] h-[200px] ">
              <img className="rounded-t-lg w-full h-full object-cover object-center" src={val?.variants[0]?.images[0]} alt="product image" />
            </div>
            <div className="mt-2.5 px-5 pb-5">
              <a href="#">
                <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md font-semibold tracking-tight text-gray-900">{val?.productName}</h5>
              </a>
              <div className="flex items-center mt-2.5">
                <span href="#">
                  <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md tracking-tight text-gray-400">{val?.origin}</h5>
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-bold text-gray-900"><FormatCurrency price={val?.variants[0]?.price} /></span>
                <div className="">
                  <button className="mt-2.5 rounded-md bg-yellow-400 px-4 py-2 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center">
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
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full max-w-sm mx-auto text-center text-gray-500">Không tìm thấy sản phẩm.</div>
  );

  const categoryResult = currentPageData?.length !== 0 ? (
    currentPageData?.map((val, index) => {
      return (
        <div key={index} className="lg:basis-[calc(100%/3-16px)] basis-[calc(100%/2-16px)] w-[330px] overflow-hidden">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="w-full md:h-[300px] h-[200px] ">
              <img className="rounded-t-lg w-full h-full object-cover object-center" src={val?.variants[0]?.images[0]} alt="product image" />
            </div>
            <div className="mt-2.5 px-5 pb-5">
              <a href="#">
                <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md font-semibold tracking-tight text-gray-900">{val?.productName}</h5>
              </a>
              <div className="flex items-center mt-2.5">
                <span href="#">
                  <h5 className="block overflow-hidden whitespace-nowrap overflow-ellipsis text-md tracking-tight text-gray-400">{val?.origin}</h5>
                </span>
              </div>
              <div className="mt-2.5">
                <span className="text-xl font-bold text-gray-900"><FormatCurrency price={val?.variants[0]?.price} /></span>
                <div className="">
                  <button className="mt-2.5 rounded-md bg-yellow-400 px-4 py-2 text-white text-sm font-medium transition hover:bg-yellow-500 flex items-center justify-center">
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
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full max-w-sm mx-auto text-center text-gray-500">Không tìm thấy sản phẩm.</div>
  );

  return (
    <div className='pt-28'>
      <div className='max-w-8xl px-4 mx-auto text-left'>
        <div class="bg-white">
          <div>
            {isSideBarOpen && <div class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
              <div class="fixed inset-0 bg-black bg-opacity-25"></div>
              <div class="fixed inset-0 z-50 flex">
                <div class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div class="flex items-center justify-between px-4">
                    <h2 class="text-lg font-medium text-gray-900">Bộ lọc</h2>
                    <button type="button" class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400" onClick={openSideBar}>
                      <span class="sr-only">Close menu</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <ProductFilter
                    filters={filters}
                    setFilters={setFilters}
                    onFilterChange={handleFilterChange}
                    renderCategory={renderCategory}
                    selectBrand={selectBrand}
                    selectSubCategory={subCategoryList}
                  />
                </div>
              </div>
            </div>}

            <main class="">
              <div class="md:flex items-baseline justify-between border-b border-gray-200 pb-6">
                {location?.state?.search ?
                  <div className="flex">
                    <span class="pb-4 md:pb-0 text-3xl md:text-4xl tracking-tight text-gray-900">Kết quả tìm kiếm cho <span className="font-bold">"{location?.state?.search}"</span></span>
                  </div>
                  :
                  <h1 class="pb-4 md:pb-0 text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Sản phẩm của chúng tôi</h1>
                }
                <div class="flex items-center">
                  <div class="relative inline-block text-left w-[200px]">
                    <div>
                      <Select
                        id="category"
                        name="category"
                        required
                        value={filters.sort}
                        onChange={handleSortChange}
                      >
                        <option value={""}>
                          Lọc
                        </option>
                        {sort?.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option.value}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                    <span class="sr-only">View grid</span>
                    <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <button type="button" class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden" onClick={openSideBar}>
                    <span class="sr-only">Filters</span>
                    <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <section aria-labelledby="products-heading" class="pb-24 pt-6">
                <h2 id="products-heading" class="sr-only">Products</h2>

                <div class="flex gap-x-8 gap-y-10">
                  {/* Filters */}
                  <MainProductFilter
                    filters={filters}
                    setFilters={setFilters}
                    onFilterChange={handleFilterChange}
                    renderCategory={renderCategory}
                    selectBrand={selectBrand}
                    selectSubCategory={subCategoryList}
                  />
                  <div class="w-full mx-auto">
                    <div className="flex flex-wrap gap-4">
                      {
                        location?.search && location?.state?.search
                          ? searchResult
                          : location?.state?.category
                            ? categoryResult
                            : listProduct
                      }
                    </div>
                    <div className='flex justify-center items-center mt-4'>
                      <Stack spacing={2}>
                        <Pagination
                          count={totalPages}
                          page={page}
                          onChange={handleChangePage}
                          variant="outlined"
                          shape="rounded" />
                      </Stack>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

      </div>
    </div>
  )
}

// The filter when the screen large
function MainProductFilter({ filters, setFilters, onFilterChange, renderCategory, selectBrand, selectSubCategory }) {

  // const filteredCaterogy = subselectCategory
  // .filter(category => category.subselectCategory?._id === filters?.subCategory)

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };
      onFilterChange(updatedFilters); // Call onFilterChange with the updated filters
      return updatedFilters; // Return the updated filters to setFilters
    });
  };

  return (
    <form class="hidden lg:block w-[300px]">
      <h3 class="sr-only">selectCategory</h3>
      <ul role="list" class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
        {renderCategory}
      </ul>

      {filters?.category && (<div class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          {/* Expand/collapse section button */}
          <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
            <span class="font-medium text-gray-900">Sản phẩm</span>
          </button>
        </h3>
        {/* Filter section, show/hide based on section state. */}
        <div class="pt-6" id="filter-section-0">
          <div class="space-y-4">
            <div>
              <Select
                id="subCategory"
                name="subCategory"
                required
                value={filters?.subCategory}
                onChange={handleFilterChange}
              >
                <option value={""}>
                  Chọn sản phẩm
                </option>
                {selectSubCategory?.subCategory?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.subCategoryName}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>)}
      <div class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          {/* Expand/collapse section button */}
          <button type="button" class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false">
            <span class="font-medium text-gray-900">Thương hiệu</span>
          </button>
        </h3>
        {/* Filter section, show/hide based on section state. */}
        <div class="pt-6" id="filter-section-1">
          <div class="space-y-4">
            <div>
              <Select
                id="brand"
                name="brand"
                required
                value={filters?.brand}
                onChange={handleFilterChange}
              >
                <option value={""}>
                  Chọn thương hiệu
                </option>
                {selectBrand?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.brandName}
                  </option>
                ))}
              </Select>
              {/* {selectedValue && (
                              <button type="button" onClick={handleClearSelection}>
                                Clear
                              </button>
                            )} */}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

// The filter when the screen small
function ProductFilter({ filters, setFilters, onFilterChange, renderCategory, selectBrand, selectSubCategory }) {

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        [name]: value,
      };
      onFilterChange(updatedFilters); // Call onFilterChange with the updated filters
      return updatedFilters; // Return the updated filters to setFilters
    });
  };

  return (
    <form class="mt-4 border-t border-gray-200">
      <h3 class="sr-only">Danh mục</h3>
      <ul role="list" class="px-4 py-3 space-y-4 text-sm font-medium text-gray-900">
        {renderCategory}
      </ul>

      {filters?.category && (<div class="border-t border-gray-200 px-4 py-6">
        <h3 class="-mx-2 -my-3 flow-root">
          <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
            <span class="font-medium text-gray-900">Sản phẩm</span>
          </button>
        </h3>
        {/* Filter section, show/hide based on section state. */}
        <div class="pt-6" id="filter-section-mobile-0">
          <div class="space-y-6">
            <div>
              <Select
                id="category"
                name="category"
                required
                value={filters?.category}
                onChange={handleFilterChange}
              >
                <option value={"Chọn sản phẩm"}>
                  Chọn sản phẩm
                </option>
                {selectSubCategory?.subCategory?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.subCategoryName}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>)}
      <div class="border-t border-gray-200 px-4 py-6">
        <h3 class="-mx-2 -my-3 flow-root">
          {/* Expand/collapse section button */}
          <button type="button" class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
            <span class="font-medium text-gray-900">Thương hiệu</span>
          </button>
        </h3>
        {/* Filter section, show/hide based on section state. */}
        <div class="pt-6" id="filter-section-mobile-1">
          <div class="space-y-6">
            <div>
              <Select
                id="brand"
                name="brand"
                required
                value={filters?.brand}
                onChange={handleFilterChange}
              >
                <option value={"Chọn thương hiệu"}>
                  Chọn thương hiệu
                </option>
                {selectBrand?.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.brandName}
                  </option>
                ))}
              </Select>
              {/* {selectedValue && (
                              <button type="button" onClick={handleClearSelection}>
                                Clear
                              </button>
                            )} */}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}