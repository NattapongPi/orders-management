import OrdersTable from "../components/OrdersTable";
import Button from "@mui/material/Button";
function OrderPage() {
  return (
    <>
      <OrdersTable />
      <div className="flex justify-end">
        <Button variant="contained">confirm</Button>
      </div>
    </>
  );
}

export default OrderPage;
