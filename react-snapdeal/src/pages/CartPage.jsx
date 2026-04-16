import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cartItems, setCartItems, openLogin }) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const getPrice = (item) => {
    let priceStr = item.salePrice || item.price || '999';
    if (typeof priceStr === 'number') return priceStr;
    const match = priceStr.match(/\d+(,\d+)*(\.\d+)?/);
    if (match) {
      return parseInt(match[0].replace(/,/g, ''));
    }
    return 999;
  };

  const updateQuantity = (index, delta) => {
    setCartItems(prev => {
      const newItems = [...prev];
      const itemToUpdate = { ...newItems[index] };
      const newQty = (itemToUpdate.quantity || 1) + delta;
      
      if (newQty <= 0) {
        newItems.splice(index, 1);
      } else {
        itemToUpdate.quantity = newQty;
        newItems[index] = itemToUpdate;
      }
      return newItems;
    });
  };

  const removeItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const total = cartItems.reduce((acc, item) => acc + (getPrice(item) * (item.quantity || 1)), 0);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      openLogin();
    }
  };

  if (checkoutSuccess) {
    return (
      <main className="cart-main">
        <div className="container">
          <div className="empty-cart" style={{ background: 'white', padding: '60px', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
            <i className="fas fa-check-circle" style={{ color: '#4CAF50', fontSize: '90px' }}></i>
            <h2 style={{ marginTop: '20px', color: '#333' }}>Order Placed Successfully!</h2>
            <p style={{ marginBottom: '30px', color: '#777', fontSize: '16px' }}>Thank you for shopping with Snapdeal. Your order will be delivered soon.</p>
            <Link to="/" className="shop-now-btn" onClick={() => setCheckoutSuccess(false)}>CONTINUE SHOPPING</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-main">
      <div className="container">
        <div className="cart-container">
          
          <div className="cart-items-section">
            <h1 className="cart-title">Shopping Cart ({cartItems.reduce((a, i) => a + (i.quantity || 1), 0)} items)</h1>
            
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <i className="fas fa-shopping-basket"></i>
                <h2>Your shopping bag is empty!</h2>
                <p style={{ marginBottom: '25px', color: '#999' }}>Explore our best categories and deals.</p>
                <Link to="/" className="shop-now-btn">SHOP NOW</Link>
              </div>
            ) : (
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="cart-item-img">
                      <img src={item.image || item.img} alt={item.title || item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h3>{item.title || item.name}</h3>
                      <p className="cart-item-desc">{item.discount || item.category || 'High quality product'}</p>
                      <div className="cart-item-price">₹{getPrice(item).toLocaleString('en-IN')}</div>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(index, -1)}><i className="fas fa-minus"></i></button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(index, 1)}><i className="fas fa-plus"></i></button>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(index)}>
                        <i className="fas fa-trash"></i> REMOVE
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="summary-section">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Charges</span>
              <span style={{ color: '#4CAF50' }}>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              style={{ opacity: cartItems.length === 0 ? 0.5 : 1 }}
            >
              PROCEED TO CHECKOUT
            </button>
            
            <div style={{ marginTop: '20px', fontSize: '12px', color: '#999', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fas fa-shield-alt" style={{ fontSize: '20px', color: '#4CAF50' }}></i>
              TrustPay: 100% Moneyback Guarantee. 7 Days Easy Returns.
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CartPage;
