import React from 'react';
import CallIcon from '@mui/icons-material/Call';

export default function Contact() {
	return (
		<div className="relative">
      <button className="fixed z-50 bottom-4 left-4 bg-yellow-400 p-2 rounded-full text-white hover:bg-yellow-500">
        <CallIcon />
      </button>
    </div>
	)
}
