import React from 'react';
import { TriangleAlert, X } from 'lucide-react';
import './VisitConfirmationModal.css';

const VisitConfirmationModal = ({
  propertyName,
  propertyAddress,
  visitData,
  onConfirm,
  onCancel
}) => {
  const formatDate = () => {
    if (visitData.day && visitData.month && visitData.year) {
      return `${visitData.day.padStart(2, '0')}/${visitData.month.padStart(2, '0')}/${visitData.year}`;
    }
    return 'Not specified';
  };

  const formatTime = () => {
    if (visitData.time) {
      return visitData.time;
    }
    return 'Not specified';
  };

  return (
    <div className="visitschedulermodal-overlay">
      <div className="visitschedulermodal-container">
        <div className="visitschedulermodal-header">
          <TriangleAlert size={32} color='yellow'back  strokeWidth={3}/>
          <h2 className="visitschedulermodal-title">Visit Schedule Confirmation</h2>
          <button 
            className="visitschedulermodal-close-btn"
            onClick={onCancel}
          >
            <X size={24} />
          </button>

        
            <p className="visitschedulermodal-ptag">Please confirm the following details and click on the <b>Accept Button</b> when you are sure</p>
         
        </div>

       

        <div className="visitschedulermodal-content">

        <div className="visitschedulermodal-visit-details">
          <div className="visitschedulermodal-detail-row">
              <span className="visitschedulermodal-property-name"> Property Name:</span>
              <span className="visitschedulermodal-detail-value" >{propertyName}</span>
          </div>
          <div className="visitschedulermodal-detail-row">
              <span className="visitschedulermodal-property-address"> Location:</span>
              <span className="visitschedulermodal-detail-value">{propertyAddress}</span>
          </div>
        </div>

          <div className="visitschedulermodal-visit-details">
            <div className="visitschedulermodal-detail-row">
              <span className="visitschedulermodal-detail-label">Visit Date:</span>
              <span className="visitschedulermodal-detail-value">{formatDate()}</span>
            </div>
            
            <div className="visitschedulermodal-detail-row">
              <span className="visitschedulermodal-detail-label">Visit Time:</span>
              <span className="visitschedulermodal-detail-value">{formatTime()} ({visitData.visitType || 'Not specified'})</span>
            </div>

            {/* {visitData.notes && (
              <div className="visitschedulermodal-detail-row">
                <span className="visitschedulermodal-detail-label">Notes:</span>
                <span className="visitschedulermodal-detail-value visitschedulermodal-notes">{visitData.notes}</span>
              </div>
            )} */}
          </div>

          <div className="visitschedulermodal-actions">
            <button 
              className="visitschedulermodal-cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              className="visitschedulermodal-confirm-btn"
              onClick={onConfirm}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitConfirmationModal;
