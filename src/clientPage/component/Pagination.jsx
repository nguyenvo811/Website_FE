import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({ data, totalItems }) {
	const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	// console.log("current", page)
	// console.log("rowperpage", rowsPerPage)
	// console.log("total", totalItems)

  return (
    <TablePagination
      component="div"
      count={totalItems}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
			labelRowsPerPage="Số hàng mỗi trang:"
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
