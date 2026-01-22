import { useState, type ChangeEvent } from "react";
import { mockCustomers } from "../mock/customerInfo";
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
function CustomerPage() {
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
      <div className="text-4xl font-bold pb-6">Customer Detail</div>
      <TableContainer component={Paper} sx={{ maxWidth: 600 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell align="right">Credit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockCustomers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.customerId}
                  </TableCell>
                  <TableCell align="right">
                    {row.credit.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mockCustomers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ maxWidth: 600 }}
      />
    </>
  );
}

export default CustomerPage;
