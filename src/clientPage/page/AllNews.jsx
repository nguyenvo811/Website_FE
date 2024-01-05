import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import slugify from 'slugify';
import { Link, useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function AllNews() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  const handleClickDetails = useCallback(
    async (val) => {
      // Define the logic for handling click details
      console.log("Item Clicked:", val);

      // Example: Navigate to the product details page
      const tiltleSlug = slugify(val?.title, { lower: true, locale: 'vi' });
      const titlePath = `/tin-tuc/${tiltleSlug}`;

      navigate({
        pathname: titlePath
      }, { state: val?._id });
    },
    [navigate]
  );

  // pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(location?.state?.data?.length / 10); // Assuming 10 items per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Assuming you want to display 10 items per page
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  const currentPageData = location?.state?.data.slice(startIndex, endIndex);

  const listNews = currentPageData.map((val, index) => {
    return (
      <div href="#" key={index} class="lg:basis-[calc(100%/2-16px)] flex-wrap grid grid-cols-2 items-center bg-white border border-gray-200 rounded-lg shadow max-w-screen-lg hover:bg-gray-100">
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

  return (
    <div className='w-full h-full pt-28 px-10 md:p-20 md:mt-12'>
      <strong className="block uppercase text-center pb-2 text-xl font-bold text-yellow-400 sm:text-3xl underline">
        {location?.state?.name}
      </strong>
      <div class="w-full mx-auto mt-4">
        <div className="flex flex-wrap gap-4">
          {listNews}
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
  )
}