import React from 'react';

const AppBanner = () => {
  return (
    <section className="app-banner">
      <div className="app-banner-content">
        <div className="app-text-side">
          <h1>Scan to Download <br /><span>Snapdeal</span> App Now!</h1>
          <ul className="app-features">
            <li><i className="fas fa-check-circle"></i> Latest Deals, Offers etc</li>
            <li><i className="fas fa-check-circle"></i> Price Drop Alerts</li>
            <li><i className="fas fa-check-circle"></i> Real-time Order Updates</li>
          </ul>
          <div className="qr-container">
            <img src="/images/scanner.jpg" alt="QR Code" className="qr-image" />
          </div>
          <a href="/download-app.html" className="banner-download-btn">
            Download Now <i className="fas fa-arrow-right"></i>
          </a>
        </div>
        <div className="app-image-side">
          <div className="triple-mockup">
            <img src="/images/snapdeal.jpg" alt="Snapdeal App Mockup" className="mockup-bg left" />
            <img src="/images/snapdeal.jpg" alt="Snapdeal App Mockup" className="mockup-bg right" />
            <img src="/images/snapdeal.jpg" alt="Snapdeal App Mockup" className="mockup-main" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
