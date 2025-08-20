import React from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property, onAccept, onReject, acceptedProperties }) => {
  if (!property) {
    return (
      <div className="assignednotificationpropertycard-empty-state">
        
      </div>
    );
  }

  const isAccepted = acceptedProperties.includes(property.id);

  return (
    <div className="assignednotificationpropertycard-container">
      <div className="assignednotificationpropertycard-card">
        <div className="assignednotificationpropertycard-content">
          <div className="assignednotificationpropertycard-header">
            <img
              src={property.image}
              alt={property.name}
              className="assignednotificationpropertycard-image"
            />
          </div>
          <div className="assignednotificationpropertycard-info">
            <div className="assignednotificationpropertycard-title-wrapper">
              <div className="assignednotificationpropertycard-title">
                {property.name}
              </div>
            </div>
            <div className="assignednotificationpropertycard-address">
              {property.address}
            </div>
          </div>
        </div>
      </div>

      {!isAccepted && (
        <div className="assignednotificationpropertycard-actions">
          {isAccepted ? (
            <button
              className="assignednotificationpropertycard-accepted-btn"
              disabled
            >
              ACCEPTED
            </button>
          ) : (
            <>
              <button
                className="assignednotificationpropertycard-accept-btn"
                onClick={() => onAccept(property.id)}
              >
                Accept
              </button>
              <button
                className="assignednotificationpropertycard-reject-btn"
                onClick={() => onReject(property.id)}
              >
                Reject
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};



export default PropertyCard;
