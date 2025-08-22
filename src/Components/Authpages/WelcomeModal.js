import React, { useEffect } from 'react';
import './WelcomeModal.css';
import welcomeImage from '../../Assets/welcome.png'

const WelcomeModal = ({ isOpen, onClose, onGetStarted, accountType = 'creator' }) => {
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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <div className="welcome-modal-backdrop" onClick={handleBackdropClick}>
      <div className="welcome-modal-container">
        <div className="welcome-modal-content">
          <div className="welcome-modal-image-section">
            <img
              src={welcomeImage}
              alt="Welcome illustration"
              className="welcome-modal-image"
            />
          </div>

          <div className="welcome-modal-text-section">
            <div className="welcome-modal-title">
              Congratulations! Welcome to{" "}
              <span className="welcome-modal-title-highlight">
                Housekeepers
              </span>
            </div>
            <div className="welcome-modal-description">
              You have successfully completed your onboarding as a {accountType.charAt(0).toUpperCase() + accountType.slice(1)}. You're now ready to start using the platform!
            </div>
          </div>

          <div className="welcome-modal-divider"></div>

          <div className="welcome-modal-button-container">
            <button
              className="welcome-modal-button"
              onClick={handleGetStarted}
            >
              <div className="welcome-modal-button-content">
                Go to Dashboard
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;