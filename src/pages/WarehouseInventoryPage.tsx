import { useState, type ChangeEvent } from "react";
import { mockInventory } from "../mock/warehouseInventory";
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
function WarehouseInventoryPage() {
  const mock = [...mockInventory];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <div className="text-4xl font-bold pb-6">Warehouse Detail</div>
      <TableContainer component={Paper} sx={{ maxWidth: 800 }}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>Warehouse ID</TableCell>
              <TableCell align="right">Supplier ID</TableCell>
              <TableCell align="right">Item ID</TableCell>
              <TableCell align="right">Amount</TableCell>
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
                    {row.warehouseId}
                  </TableCell>
                  <TableCell align="right">{row.supplierId}</TableCell>
                  <TableCell align="right">{row.itemId}</TableCell>
                  <TableCell align="right">
                    {row.amount.toLocaleString()}
                  </TableCell>
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

export default WarehouseInventoryPage;
