import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({ title, message }) => {
  return (
    <div data-name="Error Modal" className="error-modal-container">
      <div className="error-modal-content">
        <img
          src="https://api.builder.io/api/v1/image/assets/4f5ddbfbfbad493b8599ec48d3c9d9d7/27e47a9ef9e3a286b9e7c0ba1a1bf76886f9a49b?placeholderIfAbsent=true"
          alt="Error illustration"
          className="error-modal-image"
        />
      </div>
      <div className="error-modal-text-section">
        <div data-name="Text" className="error-modal-title">
          {title || "Opps!!! Page not found"}
        </div>
        <div className="error-modal-message">
          <div data-name="Supporting text">
            {message || "Sorry, the page you are looking for does not exist or some other error occured."}
          </div>
        </div>
      </div>
      <div className="error-modal-divider"></div>
    </div>
  );
};

export default ErrorModal;
