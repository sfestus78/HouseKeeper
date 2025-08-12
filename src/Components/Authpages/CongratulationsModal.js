import React, { useEffect } from 'react'; // CHANGED: Added useEffect import
import './CongratulationsModal.css';
import congratsImage from '../../Assets/fist-bump.png'

const CongratulationsModal = ({ isOpen, onClose, onStartOnboarding, accountType = 'creator' }) => {
  // CHANGED: Added useEffect to handle body scroll
  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the body
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scroll is re-enabled if component unmounts
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

  const handleStartOnboarding = () => {
    onStartOnboarding();
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="congratulations-modal-backdrop" onClick={handleBackdropClick}>
      <div className="congratulations-modal">
        <div className="congratulations-modal-container">
          <div className="congratulations-modal-image-section">
            <img
              src={congratsImage}
              alt="Congratulations illustration"
              className="congratulations-modal-image"
            />
          </div>
          
          <div className="congratulations-modal-text-section">
            <div className="congratulations-modal-title">
              Congratulations you are now a {accountType.charAt(0).toUpperCase() + accountType.slice(1)}!
            </div>
            <div className="congratulations-modal-description">
              Your account has been created successfully. Learn more about the
              next steps via the onboarding steps.
            </div>
          </div>

          <div className="congratulations-modal-divider"></div>

          <div className="congratulations-modal-actions">
            <button className="congratulations-modal-skip" onClick={handleSkip}>
              Skip
            </button>
            <button className="congratulations-modal-button" onClick={handleStartOnboarding}>
              Start Onboarding
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;