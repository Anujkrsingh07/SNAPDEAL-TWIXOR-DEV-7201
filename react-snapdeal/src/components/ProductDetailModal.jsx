import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductDetailModal = ({ product, onClose, addToCart }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="product-detail-overlay active" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-detail-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="product-detail-body">
          <div className="product-detail-image-section">
            <div className="product-detail-img-wrapper">
              <img src={product.image || product.img} alt={product.title || product.name} />
            </div>
          </div>
          <div className="product-detail-info-section">
            <span className="product-detail-badge">{product.discount || 'DEAL OF THE DAY'}</span>
            <h2 className="product-detail-title">{product.title || product.name}</h2>
            
            <div className="product-detail-price-block">
              <span className="product-detail-price">{product.price || '₹999'}</span>
              <span className="product-detail-mrp">{product.mrp || '₹1,999'}</span>
              <span className="product-detail-discount-tag">{product.discount || '50% OFF'}</span>
            </div>

            <p className="product-detail-desc">
              Experience the best of {product.title || product.name}. High-quality materials and premium design for your daily needs.
            </p>

            <ul className="product-detail-highlights">
              <li><i className="fas fa-check"></i> High-quality Material</li>
              <li><i className="fas fa-check"></i> 7 Days Easy Return</li>
              <li><i className="fas fa-check"></i> 100% Genuine Product</li>
            </ul>

            <div className="product-detail-delivery">
              <i className="fas fa-truck"></i>
              <span>Free Delivery by <strong>Tomorrow</strong></span>
            </div>

            <div className="product-detail-actions">
              <button className="pd-btn pd-add-cart" onClick={() => { addToCart(product); onClose(); navigate('/cart'); }}>
                <i className="fas fa-shopping-cart"></i> ADD TO CART
              </button>
              <button className="pd-btn pd-buy-now" onClick={() => { addToCart(product); onClose(); navigate('/cart'); }}>
                <i className="fas fa-bolt"></i> BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
