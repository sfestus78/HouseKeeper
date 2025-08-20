import React from 'react';

const VisitCard = ({ visit, showTime = false }) => {
  const handleViewDetails = () => {
    console.log('Viewing details for:', visit.property);
  };

  return (
    <div className="scheduled-visits-card">
      <div className="scheduled-visits-card-content">
        <img
          src={visit.image}
          alt={visit.property}
          className="scheduled-visits-card-image"
        />
        <div className="scheduled-visits-card-details">
          <h4 className="scheduled-visits-card-title">{visit.property}</h4>
          <p className="scheduled-visits-card-address">{visit.address}</p>
          <span className="scheduled-visits-card-distance">{visit.distance}</span>
        </div>
      </div>
      
      <button 
        className="scheduled-visits-card-actions"
        onClick={handleViewDetails}
      >
        View Details
      </button>

      {showTime && (
        <div className="scheduled-visits-card-time">
          <div className="scheduled-visits-time-badge">
            <div className="scheduled-visits-time-dot"></div>
            <span className="scheduled-visits-time-text">{visit.time}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitCard;
