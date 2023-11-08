import { Breadcrumb } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import AddProduct from "./AddProduct";
import { getBrands, removeBrand } from "../../../api/apiServices";
import AddBrand from "./AddBrand";
import AlertBrand from "./AlertBrand";
import UpdateBrand from "./UpdateBrand";

export default function BrandTable() {
	return (
		<>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4 pt-16">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
							DANH SÁCH NHÃN HIỆU
						</h1>
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Nhãn hiệu</Breadcrumb.Item>
						</Breadcrumb>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="min-w-full align-middle">
						<div className="overflow-hidden mx-4 mt-4">
							<Table />
						</div>
					</div>
				</div>
			</div> 
		</>
	)
}

const Table = function() {

	// Add product dialog
	const [open, setOpen] = React.useState(false);
	const [openUpdate, setOpenUpdate] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [rows, setRows] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const [data, setData] = React.useState([]);
	const apiRef = React.useRef(null);

	React.useEffect(() => {
    getBrands()
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [])

	// Update the row.
	const updateRow = (value) => {
		const index = data.findIndex((p) => p._id === value._id);
		if (index !== -1) {
			const updatedData = [...data];
			updatedData[index] = value;
			setData(updatedData);
		} else {
			setData([...data, value]);
		}
  };

  // Delete the row.
  const removeRow = () => {
		const updatedRows = data.filter(row => row._id !== rows.row._id);
    removeBrand(rows?.row._id)
		.then((response) => { 
      setData(updatedRows);
    	apiRef.current.updateRows(updatedRows);
    })
    .catch((err)=>{
      console.log(err)
    })  
    setOpenAlert(false)
  };

	// Call data
	const columns = React.useMemo(() => [
		{
      field: 'actions',
      headerName: 'Actions',
			width: 100,
      renderCell: (params) => {
        return (
          <div>
						<IconButton 
							aria-label="update"
							onClick={() => {return setOpenUpdate(true), setRows(params.row)}}
						>
							<EditIcon />
						</IconButton>
						<IconButton 
							aria-label="delete"
							onClick={() => {return setOpenAlert(true), setRows(params)}}
						>
							<DeleteIcon />
						</IconButton>
          </div>
        );
      },
    },
    { field: 'brandName', headerName: 'Nhãn hiệu', width: 200, },
    { field: 'description', headerName: 'Mô tả' },
  ], []);

	return (
		<>
			<div className="flex pb-4 justify-end">
				<Button variant="outlined" onClick={handleClickOpen}>
				<AddIcon />
					THÊM NHÃN HIỆU
				</Button>
			</div>
			<div className="flex justify-center">
				<div style={{ height: 600, width: '100%' }}>
				<DataGrid
					rows={data}
					columns={columns}
					getRowId={(row) => row._id}
					slots={{
						toolbar: GridToolbar,
					}}
					
					/>
				</div>
			</div>
			<AddBrand open={open} close={() => setOpen(false)} row={updateRow} />
			<UpdateBrand open={openUpdate} close={() => setOpenUpdate(false)} row={updateRow} data={rows} setData={setRows} />
			<AlertBrand open={openAlert} close={() => setOpenAlert(false)} handleRemove={() => removeRow()}/>
		</>
	)
}

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getUsers = async () => {
//       setLoading(true);

//       try {
//         const response = await axios.get('https://api.example.com/users');
//         setUsers(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUsers();
//   }, []);

//   const columns = [
//     { field: 'id', headerName: 'ID' },
//     { field: 'name', headerName: 'Name' },
//     { field: 'email', headerName: 'Email' },
//   ];

//   return (
//     <DataGrid
//       rows={users}
//       columns={columns}
//       loading={loading}
//       error={error}
//       fetchRows={async () => {
//         // Call the API and return the data.
//         const response = await axios.get('https://api.example.com/users');
//         return response.data;
//       }}
//     />
//   );
// };