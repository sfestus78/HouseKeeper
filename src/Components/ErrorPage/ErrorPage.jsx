import React from 'react';
import './ErrorPage.css';

const ErrorPage = ({ onNavigate, message = "Page not found" }) => {
  return (
    <div className="404page-main-container">
      <div className="404page-content-wrapper">
        <div className="404page-image-container">
          <img
            src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/27e47a9ef9e3a286b9e7c0ba1a1bf76886f9a49b?placeholderIfAbsent=true"
            alt="Error illustration"
            className="404page-error-image"
          />
        </div>
        
        <div className="404page-text-section">
          <div className="404page-title">
            Opps!!! Page not found
          </div>
          <div className="404page-description-container">
            <div className="404page-description">
              Sorry, the page you are looking for does not exist or some other
              error occured.
            </div>
          </div>
        </div>

        <div className="404page-divider"></div>

        <div className="404page-actions">
          <button
            onClick={() => onNavigate && onNavigate('login')}
            className="404page-button 404page-button-primary"
          >
            Go to Login
          </button>
          <button
            onClick={() => onNavigate && onNavigate('creatorDashboard')}
            className="404page-button 404page-button-secondary"
          >
            Creator Dashboard
          </button>
          <button
            onClick={() => onNavigate && onNavigate('trainerDashboard')}
            className="404page-button 404page-button-secondary"
          >
            Trainer Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
