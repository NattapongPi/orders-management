import { orderTier } from "../mock/priceTier";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
function PriceTierPage() {
  return (
    <>
      <div className="text-4xl font-bold pb-6">Order Type Multiplier</div>
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table sx={{ minWidth: 200, maxWidth: 400 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#eeeeee" }}>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Multiplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(orderTier).map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Chip label={row} color={orderTier[row].color} />
                </TableCell>
                <TableCell align="right">{orderTier[row].multiplier}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default PriceTierPage;
