import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-top-grid">
          <div className="footer-col">
            <h4>ABOUT</h4>
            <a href="#">Contact Us</a>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Snapdeal Stories</a>
            <a href="#">Press</a>
            <a href="#">Corporate Information</a>
          </div>

          <div className="footer-col">
            <h4>GROUP COMPANIES</h4>
            <a href="#">Myntra</a>
            <a href="#">Cleartrip</a>
            <a href="#">Shopsy</a>
          </div>

          <div className="footer-col">
            <h4>HELP</h4>
            <a href="#">Payments</a>
            <a href="#">Shipping</a>
            <a href="#">Cancellation & Returns</a>
            <a href="#">FAQ</a>
          </div>

          <div className="footer-col">
            <h4>CONSUMER POLICY</h4>
            <a href="#">Cancellation & Returns</a>
            <a href="#">Terms Of Use</a>
            <a href="#">Security</a>
            <a href="#">Privacy</a>
            <a href="#">Sitemap</a>
            <a href="#">Grievance Redressal</a>
            <a href="#">EPR Compliance</a>
          </div>

          <div className="footer-col border-left">
            <h4>Mail Us:</h4>
            <p>Snapdeal Private Limited,<br />
               Buildings Alyssa, Begonia &<br />
               Clove Embassy Tech Village,<br />
               Outer Ring Road, Devarabeesanahalli Village,<br />
               Bengaluru, 560103,<br />
               Karnataka, India</p>
            <div className="social-links-footer">
              <span>Social:</span>
              <div className="icons">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Registered Office Address:</h4>
            <p>Snapdeal Private Limited,<br />
               Buildings Alyssa, Begonia &<br />
               Clove Embassy Tech Village,<br />
               Outer Ring Road, Devarabeesanahalli Village,<br />
               Bengaluru, 560103,<br />
               Karnataka, India<br />
               CIN : U51109KA2012PTC066107<br />
               Telephone: <span className="highlight">044-45614700</span> / <span className="highlight">044-67415800</span></p>
          </div>
        </div>

        <div className="footer-bottom-strip">
          <div className="bottom-links">
            <a href="#"><i className="fas fa-briefcase"></i> Become a Seller</a>
            <a href="#"><i className="fas fa-star"></i> Advertise</a>
            <a href="#"><i className="fas fa-gift"></i> Gift Cards</a>
            <a href="#"><i className="fas fa-question-circle"></i> Help Center</a>
          </div>
          <div className="copyright-text">
            © 2007-2026 Snapdeal.com
          </div>
          <div className="payment-methods">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c4544e.svg" alt="Payments" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
