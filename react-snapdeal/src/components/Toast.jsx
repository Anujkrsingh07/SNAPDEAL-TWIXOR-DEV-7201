import React, { useEffect, useState } from 'react';

const Toast = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show after mount
    requestAnimationFrame(() => setShow(true));
    
    const timer = setTimeout(() => {
      setShow(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${show ? 'show' : ''}`}>
      <div className="toast-content">
        <i className="fas fa-check-circle"></i>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
