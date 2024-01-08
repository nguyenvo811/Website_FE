import React from 'react';
import CallIcon from '@mui/icons-material/Call';
import { Link, useNavigate } from "react-router-dom";

export default function ContactIcon() {
  const navigate = useNavigate();
	return (
		<div className="relative">
      <a className="fixed z-50 bottom-4 left-4 bg-yellow-400 p-2 rounded-full text-white hover:bg-yellow-500" onClick={() => navigate("/lien-he")}>
        <CallIcon />
      </a>
    </div>
	)
}
