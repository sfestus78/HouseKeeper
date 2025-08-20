import React from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import './BotTrainingProgressModal.css';

const BotTrainingProgressModal = ({ 
  showModal, 
  onClose, 
  progress = 0, 
  trainingStage = "Uploading Data",
  onViewBot 
}) => {
  if (!showModal) return null;

  const isComplete = progress === 100;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && isComplete) {
      onClose();
    }
  };

  const handleViewBot = () => {
    if (onViewBot) onViewBot();
    onClose();
  };

  return (
    <div 
      className="botTrainingProgress-overlay" 
      onClick={handleBackdropClick}
    >
      <div className="botTrainingProgress-modal">
        {/* Close button - only show when complete */}
        {isComplete && (
          <button 
            className="botTrainingProgress-close-btn"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        )}

        <div className="botTrainingProgress-content">
          {/* Featured icon */}
          <div className="botTrainingProgress-icon-container">
            {isComplete ? (
              <div className="botTrainingProgress-success-icon">
                <CheckCircle size={24} className="botTrainingProgress-check-icon" />
              </div>
            ) : (
              <div className="botTrainingProgress-warning-icon">
                <AlertTriangle size={24} className="botTrainingProgress-alert-icon" />
              </div>
            )}
          </div>

          {/* Title and description */}
          <div className="botTrainingProgress-text-content">
            <div className="botTrainingProgress-title">
              {isComplete ? "Training Complete!" : "Bot Training in Progress"}
            </div>
            <div className="botTrainingProgress-description">
              {isComplete 
                ? "Your bot has been successfully trained and is now ready to use. You can start deploying it to handle conversations."
                : "Please do not exit the screen. Bot training is currently in progress and may take a few minutes to complete."
              }
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="botTrainingProgress-progress-section">
          {!isComplete && (
            <div className="botTrainingProgress-stage">
              {trainingStage} - {progress}%
            </div>
          )}
          <div className="botTrainingProgress-bar-container">
            <div 
              className="botTrainingProgress-bar-fill"
              style={{ 
                width: `${progress}%`,
                backgroundColor: isComplete ? '#10B981' : '#FFBD2E'
              }}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="botTrainingProgress-actions">
          {isComplete ? (
            <>
              <button 
                className="botTrainingProgress-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
              <button 
                className="botTrainingProgress-primary-btn"
                onClick={handleViewBot}
              >
                View Bot
              </button>
            </>
          ) : (
            <button 
              className="botTrainingProgress-disabled-btn"
              disabled
            >
              Please Wait...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotTrainingProgressModal;
