import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';
import './CongratulationsModal.css';

const CongratulationsModal = ({ isOpen, onClose, trainer, property }) => {
  // Auto-close modal after 5 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="congratulations-modal-overlay">
      <div className="congratulations-modal-container">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="congratulations-modal-close-btn"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="congratulations-modal-icon">
          <CheckCircle size={64} className="congratulations-success-icon" />
        </div>

        {/* Content */}
        <div className="congratulations-modal-content">
          <h2 className="congratulations-modal-title">
            Congratulations!
          </h2>
          <p className="congratulations-modal-message">
            You have successfully assigned <strong>{trainer?.name}</strong> to{' '}
            <strong>{property?.name}</strong>.
          </p>
          
          {/* Trainer Info Summary */}
          {trainer && (
            <div className="congratulations-trainer-summary">
              <img
                src={trainer.avatar}
                alt={trainer.name}
                className="congratulations-trainer-avatar"
              />
              <div className="congratulations-trainer-info">
                <h3 className="congratulations-trainer-name">{trainer.name}</h3>
                <p className="congratulations-trainer-email">{trainer.email}</p>
                <p className="congratulations-trainer-level">Level: {trainer.level}</p>
              </div>
            </div>
          )}

          <div className="congratulations-next-steps">
            <h4 className="congratulations-next-steps-title">What happens next?</h4>
            <ul className="congratulations-next-steps-list">
              <li>The trainer will be notified of the assignment</li>
              <li>Property-specific training materials will be provided</li>
              <li>AI bot training will begin automatically</li>
              <li>You'll receive updates on training progress</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="congratulations-modal-footer">
          <button 
            onClick={onClose}
            className="congratulations-modal-close-btn-text"
          >
            Close
          </button>
        </div>

        {/* Auto-close indicator */}
        <div className="congratulations-auto-close">
          <div className="congratulations-auto-close-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
