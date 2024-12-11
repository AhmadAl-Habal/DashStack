import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<RegisterPage />}></Route>
          <Route path="/sign-in" element={<LoginPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/add-product" element={<AddProductPage />}></Route>
            <Route
              path="/edit-product/:id"
              element={<EditProductPage />}
            ></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
