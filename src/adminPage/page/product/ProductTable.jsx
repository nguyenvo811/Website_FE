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
import AddProduct from "./AddProduct";
import { getProducts } from "../../../api/apiServices";
// import MaterialReactTable from 'material-react-table';
// import { Box, IconButton, Tooltip } from '@mui/material';
// import Button from '@mui/joy/Button';
// import Add from '@mui/icons-material/Add';
// import CreateProductModal from "./CreateProductModal";
// import AlertDeleteModal from "./AlertDeleteModal";
// import { getProducts, deleteProduct } from "../../../api/apiServices";
// import UpdateProductModal from "./UpdateProductModal";
// import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";

export default function ProductTable() {
	return (
		<>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4 pt-16">
						<h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
							DANH SÁCH SẢN PHẨM
						</h1>
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Products</Breadcrumb.Item>
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const [data, setData] = React.useState([]);

	React.useEffect(() => {
	
    getProducts()
      .then(res => {
        setData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [])

	// Call data
	const columns = [
		{
      field: 'actions',
      headerName: 'Actions',
			width: 200,
      renderCell: (params) => {
        return (
          <div>
						<IconButton 
							aria-label="delete"
							onClick={() => updateRow(params.row)}
						>
							<EditIcon />
						</IconButton>
						<IconButton 
							aria-label="delete"
						>
							<DeleteIcon />
						</IconButton>
          </div>
        );
      },
    },
    { field: 'image', headerName: 'Sản phẩm', width: 100 },
    { field: 'productName', headerName: 'Tên sản phẩm', width: 200, },
    { field: 'description', headerName: 'Mô tả' },
		{ field: 'category', headerName: 'Loại sản phẩm', width: 200, valueGetter: (params) => params.row?.category?.categoryName },
    { field: 'color', headerName: 'Màu sắc' },
		{ field: 'origin', headerName: 'Xuất xứ' }
  ];

	 // Update the row.
	 const updateRow = (row) => {
    // ...
  };

  // Delete the row.
  const deleteRow = (row) => {
    // ...
  };

  // const [filterModel, setFilterModel] = React.useState({
  //   items: [
  //     {
  //       field: 'rating',
  //       operator: '>',
  //       value: '2.5',
  //     },
  //   ],
  // });
	return (
		<>
			<div className="flex pb-4 justify-end">
				<Button variant="outlined" onClick={handleClickOpen}>
				<AddIcon />
					THÊM SẢN PHẨM
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
					
					// filterModel={filterModel}
					// onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
					/>
				</div>
			</div>
			<AddProduct open={open} close={() => setOpen(false)} />
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