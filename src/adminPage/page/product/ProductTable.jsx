import { Breadcrumb } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddProduct from "./AddProduct";
// import MaterialReactTable from 'material-react-table';
// import { Box, IconButton, Tooltip } from '@mui/material';
// import Button from '@mui/joy/Button';
// import Add from '@mui/icons-material/Add';
// import CreateProductModal from "./CreateProductModal";
// import AlertDeleteModal from "./AlertDeleteModal";
// import { getProducts, deleteProduct } from "../../../api/apiServices";
// import UpdateProductModal from "./UpdateProductModal";
// import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";

export default function ProductTable (){
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

	// Call data
	const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];
	const { data } = useDemoData({
    dataSet: 'Employee',
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const [filterModel, setFilterModel] = React.useState({
    items: [
      {
        field: 'rating',
        operator: '>',
        value: '2.5',
      },
    ],
  });
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
					{...data}
					slots={{
						toolbar: GridToolbar,
					}}
					filterModel={filterModel}
					onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
					/>
				</div>
			</div>
			<AddProduct open={open} close={() => setOpen(false)} />
		</>
	)
}