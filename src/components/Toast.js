import React, { useEffect, useState } from 'react';
import '../styles/Toast.css';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      const unmountTimer = setTimeout(() => {
        onClose();
      }, 400);
      return () => clearTimeout(unmountTimer);
    }, 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  if (!isVisible && message === null) {
    return null;
  }

  return (
    <div className={`toast ${type === 'success' ? 'toast-success' : 'toast-error'} ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;