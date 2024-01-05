import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from "react-router-dom";
import { getNewsDetail } from '../../api/apiServices';
import ReactQuill from 'react-quill';
import { FormatDateAndTime } from '../../asset/FormatDateAndTime';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
    <div className='w-full h-full pt-28 px-10 md:px-40'>
			<div className='text-left pb-2 w-full border-1 border-b'>
				<p className='text-sm'>
					<span className='mr-1 pb-2'><AccessTimeIcon fontSize='small' /></span>
					{FormatDateAndTime(news?.createdAt)}
				</p>
				<strong className='text-3xl font-bold'>{news?.title}</strong>
				<p className='pt-2 font-medium'>{news?.shortDescription}</p>
			</div>
      <ReactQuill
				value={news?.description || ''}
				readOnly={true}
				theme="bubble"
			/>
    </div>
  )
}
