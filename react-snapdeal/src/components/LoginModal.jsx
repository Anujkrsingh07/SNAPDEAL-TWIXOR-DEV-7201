import React, { useState } from 'react';

const LoginModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-modal-overlay active" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        <div className="login-modal-logo">Snapdeal</div>

        <div className="login-modal-tabs">
          <div 
            className={`login-modal-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </div>
          <div 
            className={`login-modal-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </div>
        </div>

        {activeTab === 'login' ? (
          <form className="login-modal-form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-modal-field">
              <label>Mobile Number/Email ID</label>
              <input type="text" placeholder="Enter Mobile Number or Email" required />
            </div>
            <div className="login-modal-field">
              <label>Password</label>
              <div className="login-modal-password-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Enter Password" 
                  required 
                />
                <i 
                  className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} login-modal-eye`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className="login-modal-btn">LOGIN</button>
            <div className="login-modal-forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
        ) : (
          <form className="login-modal-form" onSubmit={(e) => e.preventDefault()}>
            <div className="login-modal-field">
              <label>Mobile Number</label>
              <input type="text" placeholder="Enter Mobile Number" required />
            </div>
            <div className="login-modal-field">
              <label>Email ID (Optional)</label>
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="login-modal-field">
              <label>Create Password</label>
              <div className="login-modal-password-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Create Password" 
                  required 
                />
                <i 
                  className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'} login-modal-eye`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <button type="submit" className="login-modal-btn">CONTINUE</button>
          </form>
        )}

        <div className="login-modal-social">
          <div className="login-modal-divider"><span>or continue with</span></div>
          <div className="login-modal-social-btns">
            <button className="login-modal-social-btn facebook">
              <i className="fab fa-facebook"></i> Facebook
            </button>
            <button className="login-modal-social-btn google">
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>

        <div className="login-modal-terms">
          By continuing, you agree to Snapdeal's <br />
          <a href="#">Terms of Use</a> & <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
