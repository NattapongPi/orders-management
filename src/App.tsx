import { Routes, Route } from "react-router-dom";
import "./App.css";
import OrderPage from "./pages/OrderPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import PriceTierPage from "./pages/PriceTierPage";
import CustomerPage from "./pages/CustomerPage";
import WarehouseInventoryPage from "./pages/WarehouseInventoryPage";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<OrderPage />} />
          <Route path="/product" element={<ProductInfoPage />} />
          <Route path="/price-tier" element={<PriceTierPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/warehouse" element={<WarehouseInventoryPage />} />
        </Routes>
      </MainLayout>
    </>
  );
}

export default App;
