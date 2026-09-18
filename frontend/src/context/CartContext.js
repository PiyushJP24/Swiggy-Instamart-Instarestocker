import React, { createContext, useContext, useMemo, useState } from "react";
import { PRODUCTS, RESTOCK_ITEMS, INITIAL_CART } from "../mock";

const CartContext = createContext(null);

// A lookup of every purchasable product (grid + restocker items)
const ALL_PRODUCTS = [
  ...PRODUCTS,
  ...RESTOCK_ITEMS.map((r) => ({
    id: r.id,
    name: `${r.brand} ${r.name}`,
    brand: r.brand,
    weight: r.weight,
    price: r.price,
    mrp: r.mrp,
    discount: r.discount,
    image: r.image,
  })),
];

export function CartProvider({ children }) {
  // cart => [{ id, qty }]
  const [cart, setCart] = useState(INITIAL_CART);

  const getProduct = (id) => ALL_PRODUCTS.find((p) => p.id === id);

  const getQty = (id) => cart.find((c) => c.id === id)?.qty || 0;

  const addItem = (id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const detailedCart = useMemo(
    () =>
      cart
        .map((c) => {
          const p = getProduct(c.id);
          return p ? { ...p, qty: c.qty } : null;
        })
        .filter(Boolean),
    [cart]
  );

  const totals = useMemo(() => {
    const itemCount = detailedCart.reduce((s, i) => s + i.qty, 0);
    const subtotal = detailedCart.reduce((s, i) => s + i.price * i.qty, 0);
    const mrpTotal = detailedCart.reduce((s, i) => s + i.mrp * i.qty, 0);
    const savings = mrpTotal - subtotal;
    return { itemCount, subtotal, mrpTotal, savings };
  }, [detailedCart]);

  const value = {
    cart,
    detailedCart,
    totals,
    getProduct,
    getQty,
    addItem,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
