import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import ProductDetailModal from './components/ProductDetailModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import DownloadAppPage from './pages/DownloadAppPage';

import './index.css';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('snapdeal_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('snapdeal_cart', JSON.stringify(cartItems));
  }, [cartItems]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [toasts, setToasts] = useState([]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => (item.id && item.id === product.id) || item.name === product.name || item.title === product.title);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast('Added to Cart!');
  };

  return (
    <BrowserRouter>
      <div className={isFocusMode ? 'focus-mode' : ''}>
        <Header 
          cartItemsCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} 

          openLogin={() => setIsLoginModalOpen(true)} 
        />
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <HomePage 
              isFocusMode={isFocusMode} 
              setIsFocusMode={setIsFocusMode} 
              addToCart={addToCart} 
              setSelectedProduct={setSelectedProduct} 
            />
          } />
          <Route path="/cart" element={<CartPage cartItems={cartItems} setCartItems={setCartItems} openLogin={() => setIsLoginModalOpen(true)} />} />
          <Route path="/download-app.html" element={<DownloadAppPage />} />
        </Routes>
        
        {!isFocusMode && <Footer />}
        
        {isLoginModalOpen && (
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
        )}
        
        {selectedProduct && (
          <ProductDetailModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            addToCart={addToCart}
          />
        )}
        
        <div className="toast-container">
          {toasts.map((toast) => (
            <Toast key={toast.id} message={toast.message} />
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
