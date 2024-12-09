import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import ProductsPage from "./pages/ProductsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
          <Route element={<MainLayout />}>
            <Route path="/products" element={<ProductsPage />}></Route>
            <Route path="/add-product" element={<AddProductPage />}></Route>
            <Route path="/edit-product/:id" element={<EditProductPage />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
