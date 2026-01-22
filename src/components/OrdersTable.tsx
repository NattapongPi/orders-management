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
} from "@mui/material";

import { sortOrder } from "../mock/orders";
import { mockSupplierItems } from "../mock/productInfo";
import { mockCustomers } from "../mock/customerInfo";
import { orderTier } from "../mock/priceTier";
import { mockInventory } from "../mock/warehouseInventory";

import type { ProductInfoType } from "../mock/productInfo";
import type { OrderType } from "../mock/orders";
import type { Customer } from "../mock/customerInfo";
import type { InventoryItem } from "../mock/warehouseInventory";

// ต้อง sort ก่อน
const orders = sortOrder();

export default function OrdersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<OrderType[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerTotalPrice, setCustomerTotalPrice] = useState(
    new Map<string, number>(),
  );
  const hasRun = useRef(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function findPriceBySupAndItem(
    supItemObj: ProductInfoType[],
    order: OrderType,
  ): number {
    const multiplier = orderTier[order.type.toLowerCase()];
    const find = supItemObj?.find(
      (s) => s.supplierId === order.supplierId && s.itemId === order.itemId,
    );
    if (find) return find.price * multiplier;
    return 0; // what
  }

  function findCustomerCredit(tempCustomer: Customer[], item: OrderType) {
    const findCustomer = tempCustomer.find(
      (cus) => cus.customerId === item.customerId,
    );
    if (findCustomer) {
      return findCustomer.credit;
    }
    return 0;
  }

  function calculateTotalPrice(price: number, order: OrderType) {
    return price * order.request;
  }

  function calAssignedLogic(
    tempInventory: InventoryItem[],
    order: OrderType,
    totalPrice: number,
    customerCreditBefore: number,
    price: number,
  ) {
    const invIndex = tempInventory.findIndex(
      (item) =>
        item.warehouseId === order.warehouseId &&
        item.supplierId === order.supplierId &&
        item.itemId === order.itemId,
    );
    const inventoryAmount = tempInventory[invIndex]?.amount ?? 0;
    // case 1 มีเงินพอ ของพอ
    // total price <= customer credit && inv enough >>> full amount
    if (
      customerCreditBefore >= totalPrice &&
      inventoryAmount >= order.request
    ) {
      return {
        isBuySuccess: true,
        totalPrice: totalPrice,
        isPartialBuy: false,
        inventoryAmount: inventoryAmount,
        buyableAtLeastOne: false,
      };
    }

    // case 2 มีเงินพอ ของไม่พอ
    // total price <= customer credit && inv less than needed >>> partial amount max of inv
    else if (
      customerCreditBefore >= totalPrice &&
      inventoryAmount < order.request &&
      inventoryAmount > 0
    ) {
      return {
        isBuySuccess: true,
        totalPrice: totalPrice,
        isPartialBuy: true,
        inventoryAmount: inventoryAmount,
        buyableAtLeastOne: false,
      };
    }

    // case 3 มีเงินไม่พอ แต่ซื้อได้อย่างน้อย 1 อัน ของพอ
    // total price > customer credit  >>> partial amount
    else if (
      customerCreditBefore < totalPrice &&
      customerCreditBefore > price &&
      inventoryAmount > 0
    ) {
      return {
        isBuySuccess: true,
        totalPrice: totalPrice,
        isPartialBuy: true,
        inventoryAmount: inventoryAmount,
        buyableAtLeastOne: true,
      };
    }
  }

  async function calculateOrderLogic(
    currentOrder: OrderType,
    inventory: InventoryItem[],
    customers: Customer[],
  ) {
    const price = await findPriceBySupAndItem(mockSupplierItems, currentOrder);
    const totalPrice = await calculateTotalPrice(price, currentOrder);
    const customerCreditBefore = await findCustomerCredit(
      customers,
      currentOrder,
    );
    const result = await calAssignedLogic(
      inventory,
      currentOrder,
      totalPrice,
      customerCreditBefore,
      price,
    );

    const updatedOrder = {
      ...currentOrder,
      price,
      customerCreditBefore,
    };

    let assignedAmount = 0;

    if (result?.isBuySuccess && !result.isPartialBuy) {
      assignedAmount = currentOrder.request;
    } else if (
      result?.isBuySuccess &&
      result.isPartialBuy &&
      !result.buyableAtLeastOne
    ) {
      assignedAmount = result.inventoryAmount;
    } else if (result?.buyableAtLeastOne) {
      assignedAmount = Math.floor(customerCreditBefore / price);
    }

    const finalTotalPrice = assignedAmount * price;
    updatedOrder.assigned = assignedAmount;
    updatedOrder.totalPrice = finalTotalPrice;
    updatedOrder.customerCreditAfter = customerCreditBefore - finalTotalPrice;

    // คำนวนยอดใหม่
    if (assignedAmount > 0) {
      const cIdx = customers.findIndex(
        (c) => c.customerId === currentOrder.customerId,
      );
      if (cIdx !== -1) customers[cIdx].credit -= finalTotalPrice;

      const iIdx = inventory.findIndex(
        (v) =>
          v.warehouseId === currentOrder.warehouseId &&
          v.itemId === currentOrder.itemId &&
          v.supplierId === currentOrder.supplierId,
      );
      if (iIdx !== -1) inventory[iIdx].amount -= assignedAmount;
    }

    return { updatedOrder, inventory, customers };
  }

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // const initialCustomers = structuredClone(mockCustomers);
    // const initialInventory = structuredClone(mockInventory);
    // const initialOrders = structuredClone(orders)

    // async function mapOrders() {
    //   const currentOrders = structuredClone(orders);
    //   for (let i = 0; i < currentOrders.length; i += 1) {
    //     const price = await findPriceBySupAndItem(
    //       mockSupplierItems,
    //       currentOrders[i],
    //     );
    //     const totalPrice = await calculateTotalPrice(price, currentOrders[i]);
    //     const customerCreditBefore = await findCustomerCredit(
    //       initialCustomers,
    //       currentOrders[i],
    //     );
    //     const result = await calAssignedLogic(
    //       initialInventory,
    //       currentOrders[i],
    //       totalPrice,
    //       customerCreditBefore,
    //       price,
    //     );
    //     currentOrders[i].customerCreditBefore = customerCreditBefore;
    //     currentOrders[i].price = price;
    //     if (result?.isBuySuccess && !result.isPartialBuy) {
    //       currentOrders[i].totalPrice = totalPrice;
    //       currentOrders[i].assigned = currentOrders[i].request;
    //       currentOrders[i].customerCreditAfter =
    //         customerCreditBefore - result.totalPrice;

    //       const customerIndex = initialCustomers.findIndex(
    //         (item) => item.customerId === currentOrders[i].customerId,
    //       );
    //       if (customerIndex !== -1) {
    //         initialCustomers[customerIndex].credit -= totalPrice;
    //       }

    //       const invIndex = initialInventory.findIndex(
    //         (item) =>
    //           item.warehouseId === currentOrders[i].warehouseId &&
    //           item.supplierId === currentOrders[i].supplierId &&
    //           item.itemId === currentOrders[i].itemId,
    //       );
    //       if (invIndex !== -1) {
    //         initialInventory[invIndex].amount -= currentOrders[i].request;
    //       }
    //     } else if (
    //       result?.isBuySuccess &&
    //       result.isPartialBuy &&
    //       !result.buyableAtLeastOne
    //     ) {
    //       const newPrice = result.inventoryAmount * price;
    //       currentOrders[i].assigned = result.inventoryAmount;
    //       currentOrders[i].totalPrice = newPrice;
    //       currentOrders[i].customerCreditAfter =
    //         customerCreditBefore - newPrice;
    //     } else if (result?.buyableAtLeastOne) {
    //       const buyableAmount = Math.floor(customerCreditBefore / price);
    //       currentOrders[i].assigned = buyableAmount;
    //       const totalPriceBought = price * buyableAmount;
    //       currentOrders[i].totalPrice = totalPriceBought;
    //       currentOrders[i].customerCreditAfter =
    //         customerCreditBefore - totalPriceBought;
    //     } else {
    //       currentOrders[i].assigned = 0;
    //       currentOrders[i].totalPrice = 0;
    //       currentOrders[i].customerCreditAfter = customerCreditBefore;
    //     }
    //   }
    //   setTableData(currentOrders);
    //   setCustomers(initialCustomers);
    //   setInventory(initialInventory);
    //   // manual case ของต้องพอ ไม่เกินจำนวน request และ credit
    // }
    // mapOrders();

    async function initializeData() {
      let initialCustomers = structuredClone(mockCustomers);
      let initialInventory = structuredClone(mockInventory);
      const initialOrders = structuredClone(orders);
      const finalOrder = [];

      const tempTotalMap = new Map();

      for (let i = 0; i < initialOrders.length; i++) {
        // เรียกใช้ function กลาง
        const { updatedOrder, inventory, customers } =
          await calculateOrderLogic(
            initialOrders[i],
            initialInventory,
            initialCustomers,
          );
        finalOrder.push(updatedOrder);
        initialInventory = inventory; // ส่งค่าที่ถูกตัดยอดแล้วไปใช้ต่อใน Loop หน้า
        initialCustomers = customers;

        const currentTotal = tempTotalMap.get(updatedOrder.customerId) || 0;
        tempTotalMap.set(
          updatedOrder.customerId,
          currentTotal + updatedOrder.totalPrice,
        );
      }
      setInventory(initialInventory);
      setCustomers(initialCustomers);
      setTableData(finalOrder);
      setCustomerTotalPrice(tempTotalMap);
    }
    initializeData();
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

    const currentInvAmount = inventory[invIndex].amount;

    const updatedData = tableData.map((t) => {
      if (t.order === order.order && t.subOrder === order.subOrder) {
        const oldAssigned = Number(t.assigned) || 0;
        const amountDiff = numNewValue - oldAssigned;
        // validate
        // ห้ามกรอกเกิน Request
        if (numNewValue > t.request) return t;

        // ห้ามใช้สต็อกเกินจริง
        if (amountDiff > currentInvAmount) return t;

        // ห้ามใช้ Credit เกิน
        const newTotalPrice = numNewValue * t.price;
        const newCreditAfter = t.customerCreditBefore - newTotalPrice;
        if (newCreditAfter < 0) return t;

        // success case
        const nextInventory = [...inventory];
        nextInventory[invIndex] = {
          ...nextInventory[invIndex],
          amount: currentInvAmount - amountDiff,
        };
        setInventory(nextInventory);
        return {
          ...t,
          assigned: newValue, // เก็บเป็น string ก่อนเพื่อให้พิมพ์ได้ลื่นไหล
          totalPrice: newTotalPrice,
          customerCreditAfter: newCreditAfter,
        };
      }
      return t;
    });

    const newTotalMap = new Map();
    updatedData.forEach((row) => {
      const current = newTotalMap.get(row.customerId) || 0;
      newTotalMap.set(
        row.customerId,
        current + Number(row.assigned) * row.price,
      );
    });
    setCustomerTotalPrice(newTotalMap);
    setTableData(updatedData);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell align="right">Sub Order</TableCell>
              <TableCell align="right">Item ID</TableCell>
              <TableCell align="right">Ware ID</TableCell>
              <TableCell align="right">Sup ID</TableCell>
              <TableCell align="right">Req amt</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">C Date</TableCell>
              <TableCell align="right">Cus ID</TableCell>
              <TableCell align="right">Cus cred bf</TableCell>
              <TableCell align="right">Assigned</TableCell>
              <TableCell align="right">t price</TableCell>
              <TableCell align="right">cred after</TableCell>
              <TableCell align="right">Remark</TableCell>
              <TableCell align="right">total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={`${item.order}-${item.subOrder}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.order}
                  </TableCell>
                  <TableCell align="right">{item.subOrder}</TableCell>
                  <TableCell align="right">{item.itemId}</TableCell>
                  <TableCell align="right">{item.warehouseId}</TableCell>
                  <TableCell align="right">{item.supplierId}</TableCell>
                  <TableCell align="right">{item.request}</TableCell>
                  <TableCell align="right">{item.type}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.createDate}</TableCell>
                  <TableCell align="right">{item.customerId}</TableCell>
                  <TableCell align="right">
                    {item.customerCreditBefore?.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell align="right">
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
                    />
                  </TableCell>
                  <TableCell align="right">
                    {item.totalPrice?.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell align="right">
                    {item.customerCreditAfter?.toLocaleString("en-US")}
                  </TableCell>
                  <TableCell align="right">{item.remark}</TableCell>
                  <TableCell align="right">
                    {customerTotalPrice.get(item.customerId)?.toLocaleString()}
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
