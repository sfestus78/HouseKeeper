import React, { useState } from 'react';
import { XCircle, X } from 'lucide-react';
import './TrainerDashboardAllproperties.css';

const RejectModal = ({ property, onConfirm, onCancel }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason.trim()) {
      onConfirm(reason);
    }
  };

  return (
    <div className="trainerproperties-modal-overlay">
      <div className="trainerproperties-modal">
        <div className="trainerproperties-modal-header">
          <button className="trainerproperties-modal-close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="trainerproperties-modal-content">
          <div className="trainerproperties-modal-icon trainerproperties-reject-icon">
            <XCircle size={48} />
          </div>

          <h2 className="trainerproperties-modal-title">Decline Property Assignment</h2>
          
          <p className="trainerproperties-modal-message">
            Are you sure you want to decline the <b>"{property.name}"</b> ?. 
            <span className='trainerproperties-modal-message-warning'>This action cannot be undone.</span>
          </p>

          {/* <div className="trainerproperties-property-summary">
            <img 
              src={property.image} 
              alt={property.name}
              className="trainerproperties-summary-image"
            />
            <div className="trainerproperties-summary-details">
              <h4>{property.name}</h4>
              <p>{property.address}</p>
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="trainerproperties-reject-form">
            <label className="trainerproperties-form-label">
              Reason for rejection:
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please explain why you are rejecting this property..."
              className="trainerproperties-reject-textarea"
              rows={4}
              required
            />
          </form>
        </div>

        <div className="trainerproperties-modal-actions">
          <button 
            className="trainerproperties-modal-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="trainerproperties-modal-confirm trainerproperties-reject-confirm"
            onClick={handleSubmit}
            disabled={!reason.trim()}
          >
            Reject Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
