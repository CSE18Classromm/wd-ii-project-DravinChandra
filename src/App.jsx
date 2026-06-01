import { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";
import Footer from "./components/Footer";


export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderId, setOrderId] = useState(null);

  const navigate = (p, data = null) => {
    setPage(p);
    if (data) setSelectedProduct(data);
    window.scrollTo(0, 0);
  };

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const placeOrder = (id) => {
    setOrderId(id);
    setCart([]);
    navigate("confirm");
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f3f3f3", fontFamily: "'Amazon Ember', Arial, sans-serif" }}>
      <Navbar
        cartCount={cartCount}
        navigate={navigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {page === "home" && (
        <HomePage navigate={navigate} searchQuery={searchQuery} addToCart={addToCart} />
      )}
      {page === "product" && selectedProduct && (
        <ProductPage product={selectedProduct} navigate={navigate} addToCart={addToCart} cart={cart} />
      )}
      {page === "cart" && (
        <CartPage cart={cart} navigate={navigate} removeFromCart={removeFromCart} updateQty={updateQty} />
      )}
      {page === "checkout" && (
        <CheckoutPage cart={cart} navigate={navigate} placeOrder={placeOrder} />
      )}
      {page === "confirm" && (
        <OrderConfirmPage orderId={orderId} navigate={navigate} />
      )}
      <Footer/>
    </div>
  );
}
