// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ── Your pages & components ──
import HomePage      from './pages/HomePage';
import ProductDetail from './components/ProductDetails';
import Login         from './pages/Login';
import CreateAccount from './pages/Createaccount';
import Contact       from './pages/Contact';
import CartDrawer    from './components/CartDrawer';
import Endabout      from './components/Endabout';

// ── Other developer's pages ──
import ProductsPage from './pages/ProductsPage';
import CartPage     from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage    from './pages/AboutPage';

export default function App() {
  const [cartOpen,  setCartOpen]  = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id && i.color === item.color);
      if (exists) {
        return prev.map(i =>
          i.id === item.id && i.color === item.color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const handleRemove = ({ id, color }) => {
    setCartItems(prev => prev.filter(i => !(i.id === id && i.color === color)));
  };

  const handleUpdateQuantity = ({ id, color, quantity }) => {
    setCartItems(prev =>
      prev.map(i => i.id === id && i.color === color ? { ...i, quantity } : i)
    );
  };

  const handleToggleWishlist = ({ id, color }) => {
    setCartItems(prev =>
      prev.map(i => i.id === id && i.color === color ? { ...i, wishlisted: !i.wishlisted } : i)
    );
  };

  return (
    <BrowserRouter>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onRemove={handleRemove}
        onUpdateQuantity={handleUpdateQuantity}
        onToggleWishlist={handleToggleWishlist}
      />

      <Routes>
        {/* ── Your routes ── */}
        <Route path="/"              element={<HomePage />} />
        <Route path="/product"       element={
          <ProductDetail
            onAddToCart={handleAddToCart}
            onOpenCart={() => setCartOpen(true)}
          />}
        />
        <Route path="/products/:id"  element={
          <ProductDetail
            onAddToCart={handleAddToCart}
            onOpenCart={() => setCartOpen(true)}
          />}
        />
        <Route path="/login"         element={<Login />}         />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/contact"       element={<Contact />}       />
        <Route path="/endabout"      element={<Endabout />}      />

        {/* ── Other developer's routes ── */}
        <Route path="/products"      element={<ProductsPage />}  />
        <Route path="/cart"          element={<CartPage />}      />
        <Route path="/wishlist"      element={<WishlistPage />}  />
        <Route path="/checkout"      element={<CheckoutPage />}  />
        <Route path="/about"         element={<AboutPage />}     />
      </Routes>
    </BrowserRouter>
  );
}