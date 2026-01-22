import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  TextField,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Chip,
} from "@mui/material";

import { sortOrder } from "../mock/orders";
import { mockSupplierItems } from "../mock/productInfo";
import { mockCustomers } from "../mock/customerInfo";
import { orderTier } from "../mock/priceTier";
import { mockInventory } from "../mock/warehouseInventory";

import type { OrderType } from "../mock/orders";
import type { InventoryItem } from "../mock/warehouseInventory";

import { calculateAutoAssign, bankersRound } from "../utils/calculate";

// ต้อง sort ก่อน
const orders = sortOrder();

export default function OrdersTable2() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<OrderType[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [customerTotalSpend, setCustomerTotalSpend] = useState(
    new Map<string, number>(),
  );
  const hasRun = useRef(false);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  async function refreshOrderData(baseOrders: OrderType[]) {
    const initialInventory = structuredClone(mockInventory);
    const tempTotalSpendMap = new Map<string, number>();

    const finalOrders = baseOrders.map((order) => {
      const initialCredit =
        mockCustomers.find((c) => c.customerId === order.customerId)?.credit ||
        0;

      const spentSoFar = tempTotalSpendMap.get(order.customerId) || 0;
      const remainingCredit = initialCredit - spentSoFar;

      const invItem = initialInventory.find(
        (v) =>
          v.itemId === order.itemId &&
          v.warehouseId === order.warehouseId &&
          v.supplierId === order.supplierId,
      );
      const currentStock = invItem?.amount || 0;

      const multiplier = orderTier[order.type.toLowerCase()].multiplier;
      const supplierItem = mockSupplierItems.find(
        (s) => s.supplierId === order.supplierId && s.itemId === order.itemId,
      );
      if (!supplierItem) return;
      const calPrice = bankersRound(supplierItem.price * multiplier, 2);
      const targetAmount =
        order.assigned !== undefined && order.assigned !== null
          ? Number(order.assigned)
          : order.request;
      const assigned = calculateAutoAssign(
        targetAmount,
        calPrice,
        currentStock,
        remainingCredit,
      );

      const rowTotalPrice = bankersRound(assigned * calPrice, 2);

      tempTotalSpendMap.set(order.customerId, spentSoFar + rowTotalPrice);
      if (invItem) {
        invItem.amount -= assigned; // หักสต็อกออกจากถังกลาง
      }

      return {
        ...order,
        price: calPrice,
        initialCredit,
        assigned,
        totalPrice: rowTotalPrice,
      };
    });
    setTableData(finalOrders);
    setInventory(initialInventory); // Admin จะเห็นสต็อกที่เหลือจริงๆ หลังหักทุก Order
    setCustomerTotalSpend(tempTotalSpendMap); // เอาไว้โชว์ยอดสรุปรายคน
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    refreshOrderData(orders);
  }, []);

  function manualAssignedChange(order: OrderType, newValue: string) {
    const numNewValue = Number(newValue) || 0;
    if (numNewValue < 0) return;

    // check inventory
    const invIndex = inventory.findIndex(
      (inv) =>
        inv.warehouseId === order.warehouseId &&
        inv.supplierId === order.supplierId &&
        inv.itemId === order.itemId,
    );
    // ถ้าไม่เจอของ
    if (invIndex === -1) {
      return;
    }

    const updatedData = tableData.map((t) => {
      if (t.order === order.order && t.subOrder === order.subOrder) {
        // ห้ามกรอกเกิน Request
        if (numNewValue > t.request) return t;
        return {
          ...t,
          assigned: newValue,
        };
      }
      return t;
    });

    refreshOrderData(updatedData);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eeeeee" }}>
              <TableCell>
                <Tooltip title={"Order"} arrow>
                  <div>Order</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Sub Order"} arrow>
                  <div>S. Order</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Item ID"} arrow>
                  <div>I. ID</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Warehouse ID"} arrow>
                  <div>W. ID</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Supplier ID"} arrow>
                  <div>S. ID</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Request Amount"} arrow>
                  <div>R. AMT</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Type"} arrow>
                  <div>Type</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Price"} arrow>
                  <div>Price</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Date"} arrow>
                  <div>Date</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Customer ID"} arrow>
                  <div>C. ID</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Customer Credit"} arrow>
                  <div>C. Cred</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Assigned"} arrow>
                  <div>Assigned</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Order Value"} arrow>
                  <div>O. Value</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Remark"} arrow>
                  <div>Remark</div>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={"Total Value"} arrow>
                  <div>T. Value</div>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={`${item.order}-${item.subOrder}`}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.order}
                  </TableCell>
                  <TableCell align="center">{item.subOrder}</TableCell>
                  <TableCell align="center">{item.itemId}</TableCell>
                  <TableCell align="center">{item.warehouseId}</TableCell>
                  <TableCell align="center">{item.supplierId}</TableCell>
                  <TableCell align="center">
                    {item.request.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={item.type.toLowerCase()}
                      color={orderTier[item.type.toLowerCase()].color}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    {item.price?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center">{item.createDate}</TableCell>
                  <TableCell align="center">{item.customerId}</TableCell>
                  <TableCell align="center">
                    {item.initialCredit?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip
                      slotProps={{
                        tooltip: {
                          sx: {
                            bgcolor: "error.main", // สีพื้นหลัง (แดง)
                            color: "white", // สีตัวอักษร
                            "& .MuiTooltip-arrow": {
                              color: "error.main", // สีลูกศรต้องเป็นสีเดียวกับพื้นหลัง
                            },
                            boxShadow: 3, // ใส่เงาให้ดูมีมิติ
                            fontSize: "12px",
                          },
                        },
                      }}
                      title={
                        Number(item.assigned) < Number(item.request)
                          ? "ยอดจัดสรรน้อยกว่าที่สั่งเนื่องจากของไม่พอหรือเงินไม่พอ"
                          : ""
                      }
                      arrow
                      placement="top"
                    >
                      <TextField
                        value={item.assigned}
                        onChange={(e) =>
                          manualAssignedChange(item, e.target.value)
                        }
                        hiddenLabel
                        type="number"
                        id="outlined-hidden-label-small"
                        variant="outlined"
                        size="small"
                        error={Number(item.assigned) < Number(item.request)}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    {item.totalPrice?.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell align="center">{item.remark || "-"}</TableCell>
                  <TableCell align="center">
                    {customerTotalSpend
                      .get(item.customerId)
                      ?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
