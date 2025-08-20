import React from 'react';
import './ConfirmationModal.css';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  action, 
  propertyName,
  loading = false 
}) => {
  if (!isOpen) return null;

  const isAccept = action === 'accept';
  const actionText = isAccept ? 'Accept' : 'Reject';
  const actionColor = isAccept ? 'accept' : 'reject';

  return (
    <div className="confirmation-modal-overlay" onClick={onClose}>
      <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-modal-header">
          <h3 className="confirmation-modal-title">
            Confirm {actionText}
          </h3>
          <button 
            className="confirmation-modal-close" 
            onClick={onClose}
            disabled={loading}
          >
            ✕
          </button>
        </div>

        <div className="confirmation-modal-body">
          <div className={`confirmation-modal-icon confirmation-modal-icon-${actionColor}`}>
            {isAccept ? '✓' : '✕'}
          </div>
          <p className="confirmation-modal-message">
            Are you sure you want to <strong>{actionText.toLowerCase()}</strong> the property assignment for{' '}
            <strong>"{propertyName}"</strong>?
          </p>
          {!isAccept && (
            <p className="confirmation-modal-warning">
              This property will be removed from your list and cannot be undone.
            </p>
          )}
        </div>

        <div className="confirmation-modal-actions">
          <button 
            className="confirmation-modal-btn confirmation-modal-btn-cancel"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            className={`confirmation-modal-btn confirmation-modal-btn-${actionColor}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="confirmation-modal-loading">
                <span className="confirmation-modal-spinner"></span>
                Processing...
              </span>
            ) : (
              `Yes, ${actionText}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
