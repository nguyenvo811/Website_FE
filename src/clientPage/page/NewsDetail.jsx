import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { getNewsDetail } from '../../api/apiServices';
import ReactQuill from 'react-quill';

export default function NewsDetail() {
	const [news, setNews] = useState({});
	const location = useLocation();
	console.log(location?.state)
	useEffect(() => {
		if (location?.state) {
			getNewsDetail(location?.state)
			.then(res => {
				console.log(res.data.data)
				setNews(res.data.data)
			})
			.catch(err => {
				console.log(err)
			})
		}
	}, [location?.state])

  return (
    <div className='w-full h-full pt-28 px-10 lg:px-20'>
			<div></div>
			<div className='text-left pb-2'>
				<strong className='text-3xl font-medium'>{news?.title}</strong>
				<p>{news?.shortDescription}</p>
			</div>
      <ReactQuill
				value={news?.description || ''}
				readOnly={true}
				theme="bubble"
			/>
    </div>
  )
}
