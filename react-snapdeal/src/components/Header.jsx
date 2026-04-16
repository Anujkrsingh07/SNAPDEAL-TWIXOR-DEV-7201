import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchCatalog, trendingSuggestions } from '../data/searchCatalog';

const Header = ({ cartItemsCount, openLogin }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter Catalog
  const searchResults = searchCatalog.filter(p => 
    p.name.toLowerCase().includes(searchValue.toLowerCase()) || 
    p.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <header>
      <div className="container header-main">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>Snapdeal</Link>

        <div className="search-container">
          <div className="search-input-wrapper">
            <input 
              type="text" 
              placeholder="Search products & brands" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
              onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            />
            {searchValue && (
              <i 
                className="fas fa-times clear-search" 
                style={{ display: 'block' }}
                onClick={() => setSearchValue('')}
              ></i>
            )}
          </div>

          {isDropdownOpen && (
            <div className="search-dropdown" style={{ display: 'block' }}>
              {!searchValue ? (
                <>
                  <div className="search-dd-section"><div className="search-dd-label"><i className="fas fa-fire"></i> Trending Searches</div></div>
                  {trendingSuggestions.map((s, i) => (
                    <div 
                      key={i} 
                      className="search-dd-text-item"
                      onClick={() => setSearchValue(s.text)}
                    >
                      <i className="fas fa-arrow-trend-up"></i>
                      <span className="sdd-text">{s.text}</span>
                      <span className="sdd-category">{s.cat}</span>
                    </div>
                  ))}
                </>
              ) : searchResults.length > 0 ? (
                <>
                  <div className="search-dd-section"><div className="search-dd-label"><i className="fas fa-box-open"></i> Products</div></div>
                  <div className="search-dd-products">
                    {searchResults.slice(0, 4).map(p => (
                      <div className="search-dd-product" key={p.id}>
                        <div className="search-dd-product-img">
                          <img src={p.image} alt={p.name} />
                        </div>
                        <div className="search-dd-product-info">
                          <span className="search-dd-product-name">{p.name}</span>
                          <span className="search-dd-product-price">
                            ₹{p.price.toLocaleString('en-IN')} <del>₹{p.mrp.toLocaleString('en-IN')}</del>
                          </span>
                          <span className="search-dd-product-discount">{p.discount}% OFF</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="search-dd-empty">
                  <i className="fas fa-search"></i>
                  <span>No products found for "<strong>{searchValue}</strong>"</span>
                </div>
              )}
            </div>
          )}

          <button type="button">
            <i className="fas fa-search"></i> Search
          </button>
        </div>

        <div className="header-right">
          <div className="header-item login-item" onClick={openLogin}>
            <i className="fas fa-user"></i>
            <span>Login</span>
          </div>

          <Link to="/cart" className="header-item cart-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="cart-icon-wrapper">
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartItemsCount}</span>
            </div>
            <span>Cart</span>
          </Link>

          <Link to="/download-app.html" className="download-app-btn">
            <i className="fas fa-mobile-alt"></i> Download App
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
