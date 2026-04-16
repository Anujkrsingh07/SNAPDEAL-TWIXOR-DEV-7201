import React from 'react';
import './DownloadAppPage.css';
import { Link } from 'react-router-dom';

const DownloadAppPage = () => {
  return (
    <div className="download-page">
      <section className="download-hero">
        <div className="container">
          <h1 className="hero-title">Experience the New Snapdeal App</h1>
          <p className="hero-subtitle">Get the best value on 85 million+ products across 500+ categories. Fast, secure, and designed for the best shopping experience in India.</p>

          <div className="platforms-grid">
            <div className="platform-card android">
              <i className="fab fa-android"></i>
              <div className="platform-name">Android</div>
              <p className="platform-desc">Experience seamless shopping with our highly optimized Android app. Rated 4.5+ on Play Store.</p>
              <a href="#" className="download-button">GOOGLE PLAY <i className="fas fa-download"></i></a>
            </div>

            <div className="platform-card ios">
              <i className="fab fa-apple"></i>
              <div className="platform-name">iOS</div>
              <p className="platform-desc">Clean, fast, and beautiful. Our iOS app is designed for the premium experience you deserve.</p>
              <a href="#" className="download-button">APP STORE <i className="fas fa-download"></i></a>
            </div>

            <div className="platform-card windows">
              <i className="fab fa-windows"></i>
              <div className="platform-name">Windows</div>
              <p className="platform-desc">Shop directly from your desktop with our native Windows application for faster access.</p>
              <a href="#" className="download-button">WINDOWS STORE <i className="fas fa-download"></i></a>
            </div>
          </div>
        </div>
      </section>

      <section className="features-strip">
        <div className="container">
          <div className="features-flex">
            <div className="feature-item">
              <i className="fas fa-bolt"></i>
              <span>Lightning Fast Checkout</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-shield-alt"></i>
              <span>100% Secure Payments</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-headset"></i>
              <span>24/7 Priority Support</span>
            </div>
            <div className="feature-item">
              <i className="fas fa-undo"></i>
              <span>Easy 7-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      <section className="qr-showcase">
        <div className="container">
          <div className="qr-flex">
            <div className="qr-info">
              <h2>Scan & Go Mobile</h2>
              <p>Don't want to search? Just scan this QR code with your phone's camera to get the direct download link for your specific device automatically. It's that simple!</p>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                 <i className="fas fa-mobile-alt" style={{ fontSize: '40px', color: '#ddd' }}></i>
                 <span style={{ color: '#888', fontWeight: 600 }}>Available for all smartphones</span>
              </div>
            </div>
            <div className="qr-box">
              <img src="/images/scanner.jpg" alt="QR Code" />
              <span>SCAN TO DOWNLOAD</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadAppPage;
