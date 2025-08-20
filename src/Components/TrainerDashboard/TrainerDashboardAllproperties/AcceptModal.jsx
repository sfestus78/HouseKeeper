import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import './TrainerDashboardAllproperties.css';

const AcceptModal = ({ property, onConfirm, onCancel }) => {
  return (
    <div className="trainerproperties-modal-overlay">
      <div className="trainerproperties-modal">
        <div className="trainerproperties-modal-header">
          <button className="trainerproperties-modal-close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <div className="trainerproperties-modal-content">
          <div className="trainerproperties-modal-icon trainerproperties-accept-icon">
            <CheckCircle size={48} />
          </div>

          <h2 className="trainerproperties-modal-title">Accept Property Assignment</h2>
          
          <p className="trainerproperties-modal-message">
            Are you sure you want to accept the property "{property.name}"? 
          </p>

          <div className="trainerproperties-property-summary">
            <img 
              src={property.image} 
              alt={property.name}
              className="trainerproperties-summary-image"
            />
            <div className="trainerproperties-summary-details">
              <h4>{property.name}</h4>
              <p>{property.address}</p>
            </div>
          </div>
        </div>

        <div className="trainerproperties-modal-actions">
          <button 
            className="trainerproperties-modal-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className="trainerproperties-modal-confirm trainerproperties-accept-confirm"
            onClick={onConfirm}
          >
            Accept Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptModal;
