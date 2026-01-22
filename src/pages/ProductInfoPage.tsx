import { useState, type ChangeEvent } from "react";
import { mockSupplierItems } from "../mock/productInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

function ProductInfoPage() {
  const mock = [...mockSupplierItems];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="text-4xl font-bold pb-6">Product Detail</div>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell align="right">Supplier ID</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mock
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.itemId}
                  </TableCell>
                  <TableCell align="right">{row.supplierId}</TableCell>
                  <TableCell align="right">{row.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mock.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ maxWidth: 800 }}
      />
    </>
  );
}

export default ProductInfoPage;
