import { useState, type SyntheticEvent } from "react";
import { Alert, Snackbar, type SnackbarCloseReason } from "@mui/material";
import Button from "@mui/material/Button";
import OrdersTable from "../components/OrdersTable";
function OrderPage() {
  const [open, setOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleClick = () => {
    setOpen(true);
    setIsConfirm(true);
  };
  const handleClose = (
    _?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div className="text-4xl font-bold pb-6">Order Management</div>
      <OrdersTable isConfirm={isConfirm} />
      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={isConfirm}
          sx={{ textTransform: "none" }}
        >
          Confirm
        </Button>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          บันทึกสำเร็จ
        </Alert>
      </Snackbar>
    </>
  );
}

export default OrderPage;
