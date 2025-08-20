import React from 'react';
import './TrainerDashboardAllproperties.css';

const PropertyCard = ({ property, onViewDetails }) => {
  return (
    <div className="trainerproperties-card">
      <div className="trainerproperties-card-content">
        <div className="trainerproperties-card-image-section">
          <img
            src={property.image}
            alt={property.name}
            className="trainerproperties-card-image"
          />
        </div>

        <div className="trainerproperties-card-details">
          <div className="trainerproperties-card-distance">
            {property.distance}
          </div>
          
          <h3 className="trainerproperties-card-title">
            {property.name}
          </h3>
          
          <p className="trainerproperties-card-address">
            {property.address}
          </p>
        </div>

        <button
          className="trainerproperties-card-view-btn"
          onClick={() => onViewDetails(property)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
