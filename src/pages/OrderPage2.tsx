import OrdersTable2 from "../components/OrdersTable2";
import Button from "@mui/material/Button";
function OrderPage() {
  return (
    <>
      <div className="text-4xl font-bold pb-6">Order Management</div>
      <OrdersTable2 />
      <div className="flex justify-end">
        <Button variant="contained">confirm</Button>
      </div>
    </>
  );
}

export default OrderPage;
