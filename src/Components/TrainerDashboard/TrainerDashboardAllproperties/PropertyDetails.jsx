import React, { useState } from 'react';
import { ArrowLeft, MapPin, Home, Bath, Square } from 'lucide-react';
import AcceptModal from './AcceptModal';
import RejectModal from './RejectModal';
import './TrainerDashboardAllproperties.css';

const PropertyDetails = ({ property, onBack, onAccept, onReject }) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAcceptClick = () => {
    setShowAcceptModal(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleAcceptConfirm = () => {
    onAccept(property.id);
    setShowAcceptModal(false);
  };

  const handleRejectConfirm = (reason) => {
    onReject(property.id, reason);
    setShowRejectModal(false);
  };

  const handleModalClose = () => {
    setShowAcceptModal(false);
    setShowRejectModal(false);
  };

  return (
    <div className="trainerproperties-details-container">
      <div className="trainerproperties-details-header">
        <button className="trainerproperties-back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Properties
        </button>
      </div>

      <div className="trainerproperties-details-content">
        <div className="trainerproperties-details-main">
          <div className="trainerproperties-details-image-section">
            <img
              src={property.image}
              alt={property.name}
              className="trainerproperties-details-image"
            />
            <div className="trainerproperties-details-image-gallery">
              {/* Additional images would go here */}
              <div className="trainerproperties-gallery-item">
                <img src={property.image} alt="Gallery 1" />
              </div>
              <div className="trainerproperties-gallery-item">
                <img src={property.image} alt="Gallery 2" />
              </div>
              <div className="trainerproperties-gallery-item">
                <img src={property.image} alt="Gallery 3" />
              </div>
            </div>
          </div>

          <div className="trainerproperties-details-info">
            <div className="trainerproperties-details-distance">
              {property.distance}
            </div>

            <h1 className="trainerproperties-details-title">
              {property.name}
            </h1>

            <div className="trainerproperties-details-location">
              <MapPin size={16} />
              <span>{property.address}</span>
            </div>

            <div className="trainerproperties-details-stats">
              <div className="trainerproperties-stat-item">
                <Home size={16} />
                <span>{property.rooms} Rooms</span>
              </div>
              <div className="trainerproperties-stat-item">
                <Bath size={16} />
                <span>{property.bathrooms} Bathrooms</span>
              </div>
              <div className="trainerproperties-stat-item">
                <Square size={16} />
                <span>{property.area} sqft</span>
              </div>
            </div>

            <div className="trainerproperties-details-description">
              <h3>Description</h3>
              <p>{property.description}</p>
            </div>

            <div className="trainerproperties-details-amenities">
              <h3>Amenities</h3>
              <div className="trainerproperties-amenities-list">
                {property.amenities.map((amenity, index) => (
                  <span key={index} className="trainerproperties-amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="trainerproperties-details-sidebar">
          <div className="trainerproperties-creator-info">
            <h3>Property Creator</h3>
            <div className="trainerproperties-creator-details">
              <div className="trainerproperties-creator-avatar">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=50&h=50&fit=crop&crop=center"
                  alt="Creator"
                />
              </div>
              <div className="trainerproperties-creator-text">
                <h4>{property.creator.name}</h4>
                <p>{property.creator.email}</p>
                <p>{property.creator.phone}</p>
              </div>
            </div>
          </div>

          <div className="trainerproperties-action-buttons">
            <button
              className="trainerproperties-accept-btn"
              onClick={handleAcceptClick}
            >
              Accept Property
            </button>
            <button
              className="trainerproperties-reject-btn"
              onClick={handleRejectClick}
            >
              Reject Property
            </button>
          </div>
        </div>
      </div>

      {showAcceptModal && (
        <AcceptModal
          property={property}
          onConfirm={handleAcceptConfirm}
          onCancel={handleModalClose}
        />
      )}

      {showRejectModal && (
        <RejectModal
          property={property}
          onConfirm={handleRejectConfirm}
          onCancel={handleModalClose}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
