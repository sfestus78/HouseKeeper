import React, { useEffect } from 'react';
import './ErrorModal.css';

const ErrorModal = ({ isOpen, onClose, title, message }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="error-modal-overlay" onClick={onClose}>
      <div 
        className="error-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="error-modal-content">
          <img
            src="https://api.builder.io/api/v1/image/assets/4f5ddbfbfbad493b8599ec48d3c9d9d7/27e47a9ef9e3a286b9e7c0ba1a1bf76886f9a49b?placeholderIfAbsent=true"
            alt="Error illustration"
            className="error-modal-image"
          />
        </div>
        <div className="error-modal-text-section">
          <div className="error-modal-title">
            {title || "Opps!!! Page not found"}
          </div>
          <div className="error-modal-message">
            {message || "Sorry, the page you are looking for does not exist or some other error occured."}
          </div>
        </div>
        <div className="error-modal-divider"></div>
      </div>
    </div>
  );
};

export default ErrorModal;
