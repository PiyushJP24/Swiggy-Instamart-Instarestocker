import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ReorderPage from "./pages/ReorderPage";
import CheckoutPage from "./pages/CheckoutPage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reorder" element={<ReorderPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Toaster position="bottom-center" />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
