import React from 'react';
import './PropertyCardModal.css';

const PropertyCardModal = ({ property, isOpen, onClose }) => {
  if (!isOpen || !property) return null;

  return (
    <div className="property-modal-overlay" onClick={onClose}>
      <div className="property-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="property-modal-header">
          <button className="property-modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="property-card-container">
          <div className="property-card-inner">
            <div className="property-card-content">
              <div className="property-image-section">
                <img
                  src={property.image}
                  alt={property.name}
                  className="property-card-image"
                />
              </div>
              <div className="property-info-section">
                <div className="property-content">
                  <div className="property-title">
                    {property.name}
                  </div>
                </div>
                <div className="property-address">
                  {property.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardModal;
