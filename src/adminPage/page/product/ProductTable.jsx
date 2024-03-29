import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddProduct from "./AddProduct";
import { getProduct, getProducts, removeProduct } from "../../../api/apiServices";
import AlertProduct from "./AlertProduct";
import UpdateProduct from "./UpdateProduct";
import Progress from "../../component/Progress";
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

const Table = function () {

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
		getProducts()
		  .then(res => {
			setData(res.data.data)
			console.log(res.data.data)
		  })
		  .catch(err => {
			console.log(err); 
		  }) 
	  }, [])

	// Update the row.
	const updateRow = async (value) => {
		const index = data.findIndex((p) => p._id === value._id);
		console.log(value)
		if (index !== -1) {
			const response = await getProduct(value._id);
			const updatedData = [...data];
			updatedData[index] = response.data.data;
			setData(updatedData);
		} else {
			const response = await getProduct(value._id);
			setData([...data, response.data.data]);
		}
	};

	// Delete the row.
	const removeRow = () => {
		const updatedRows = data.filter(row => row._id !== rows.row._id);
		removeProduct(rows?.row._id)
			.then((response) => {
				setData(updatedRows);
				apiRef.current.updateRows(updatedRows);
			})
			.catch((err) => {
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
							onClick={() => { return setOpenUpdate(true), setRows(params.row) }}
						>
							<EditIcon />
						</IconButton>
						<IconButton
							aria-label="delete"
							onClick={() => { return setOpenAlert(true), setRows(params) }}
						>
							<DeleteIcon />
						</IconButton>
					</div>
				);
			},
		},
		{
			field: 'variants',
			headerName: 'Sản phẩm',
			width: 100,
			valueGetter: (params) => params.row?.variants[0]?.images[0],
			renderCell: (params) => {
				return <img src={params?.row?.variants[0]?.images[0]} alt={params.value} className="w-20 h-20 object-cover object-center" />;
			},
		},
		{ field: 'productName', headerName: 'Tên sản phẩm', width: 200, },
		{
			field: 'brand',
			headerName: 'Thương hiệu',
			width: 200,
			valueGetter: (params) => params?.value?.brandName
		},
		{
			field: 'category',
			headerName: 'Danh mục sản phẩm',
			width: 200,
			valueGetter: (params) => params?.value?.categoryName
		},
		{ field: 'origin', headerName: 'Xuất xứ' },
		{ field: 'variantCategory', headerName: 'Loại biến thể' },
		{ field: 'active', headerName: 'Hoạt động' },
		{ field: 'newest', headerName: 'Mới nhất' },
		{ field: 'bestSeller', headerName: 'Best Seller' },
	], []);

	return (
		<div>
			
				<div>
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
							/>
						</div>
					</div>
					<AddProduct open={open} close={() => setOpen(false)} row={updateRow} />
					<UpdateProduct open={openUpdate} close={() => setOpenUpdate(false)} row={updateRow} data={rows} setData={setRows} />
					<AlertProduct open={openAlert} close={() => setOpenAlert(false)} handleRemove={() => removeRow()} />
				</div>
		</div>
	)
}