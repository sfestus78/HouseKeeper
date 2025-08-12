import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import AssignTrainerModal from './AssignTrainerModal';
import { mockTrainers } from '../shared/trainersData';
import './PropertyDetailsView.css';

const PropertyDetailsView = ({ 
  property, 
  onBack, 
  onAssignTrainer, 
  onReassignTrainer 
}) => {
  const [currentMainImage, setCurrentMainImage] = useState(property.image);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock additional images for the gallery
  const galleryImages = [
    property.image,
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/34ab7288d58c6901d30ca5206b63114908666887?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/b7d3e1a3bed60050981448266609ebd7b5f348b2?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a7157538c60aea6c9aedebb40d666f31fc6b4bd6?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/6b3601b1982c33d7a56ff4051131d583ee28708b?placeholderIfAbsent=true"
  ];

  const handleThumbnailClick = (imageUrl) => {
    setCurrentMainImage(imageUrl);
  };

  const handleAssignTrainer = (trainerId) => {
    onAssignTrainer(trainerId);
    setShowAssignModal(false);
  };

  const getBotStatusColor = (status) => {
    switch (status) {
      case 'trained':
        return 'rgba(45, 159, 70, 1)';
      case 'pending':
        return 'rgba(255, 193, 7, 1)';
      default:
        return 'rgba(239, 35, 60, 1)';
    }
  };

  const getBotStatusText = (status) => {
    switch (status) {
      case 'trained':
        return 'Trained & Available';
      case 'pending':
        return 'Training in Progress';
      default:
        return 'Not Trained';
    }
  };

  return (
    <div className="property-details-container">
      {/* Header with back button */}
      <div className="property-details-header">
        <button 
          onClick={onBack}
          className="property-details-back-btn"
        >
          <ArrowLeft size={20} />
          Back to Properties
        </button>
        <h1 className="property-details-title">{property.name}</h1>
        <p className="property-details-address">{property.address}</p>
      </div>

      <div className="property-details-content">
        {/* Left side - Image Gallery */}
        <div className="property-details-gallery">
          {/* Main Image */}
          <div className="property-details-main-image-container">
            <img
              src={currentMainImage}
              alt={property.name}
              className="property-details-main-image"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="property-details-thumbnail-gallery">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className={`property-details-thumbnail ${currentMainImage === image ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  src={image}
                  alt={`${property.name} view ${index + 1}`}
                  className="property-details-thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Property Info and Trainer Details */}
        <div className="property-details-info">
          {/* Property Description */}
          <div className="property-details-description">
            <h3 className="property-details-section-title">Property Description</h3>
            <p className="property-details-description-text">
              This beautiful property features modern amenities and excellent location. 
              Perfect for residents looking for comfort and convenience. The property 
              includes spacious rooms, updated fixtures, and access to premium facilities.
            </p>
          </div>

          {/* Trainer Status Section */}
          <div className="property-details-trainer-section">
            <h3 className="property-details-section-title">Trainer Status</h3>
            
            {property.trainerStatus === 'assigned' && property.assignedTrainer ? (
              <div className="property-details-trainer-assigned">
                <div className="property-details-trainer-info">
                  <img
                    src={property.assignedTrainer.avatar}
                    alt={property.assignedTrainer.name}
                    className="property-details-trainer-avatar"
                  />
                  <div className="property-details-trainer-details">
                    <h4 className="property-details-trainer-name">
                      {property.assignedTrainer.name}
                    </h4>
                    <div className="property-details-trainer-contact">
                      <div className="property-details-contact-item">
                        <Mail size={16} />
                        <span>{property.assignedTrainer.email}</span>
                      </div>
                      <div className="property-details-contact-item">
                        <Phone size={16} />
                        <span>{property.assignedTrainer.phone}</span>
                      </div>
                    </div>
                    <div className="property-details-trainer-level">
                      Level: {property.assignedTrainer.level}
                    </div>
                  </div>
                </div>
                <button 
                  className="property-details-reassign-btn"
                  onClick={() => setShowAssignModal(true)}
                >
                  Reassign Property
                </button>
              </div>
            ) : (
              <div className="property-details-trainer-unassigned">
                <div className="property-details-no-trainer">
                  <div className="property-details-no-trainer-placeholder">
                    <div className="property-details-no-trainer-icon">?</div>
                  </div>
                  <div className="property-details-no-trainer-text">
                    <h4>No trainer assigned yet</h4>
                    <p>This property is available for trainer assignment</p>
                  </div>
                </div>
                <button 
                  className="property-details-assign-btn"
                  onClick={() => setShowAssignModal(true)}
                >
                  Assign Property
                </button>
              </div>
            )}
          </div>

          {/* AI Bot Training Status */}
          <div className="property-details-bot-section">
            <h3 className="property-details-section-title">AI Bot Training Status & Availability</h3>
            <div className="property-details-bot-status">
              <div className="property-details-bot-status-indicator">
                <div 
                  className="property-details-bot-status-dot"
                  style={{ backgroundColor: getBotStatusColor(property.botStatus) }}
                />
                <span className="property-details-bot-status-text">
                  {getBotStatusText(property.botStatus)}
                </span>
              </div>
              <div className="property-details-bot-description">
                {property.botStatus === 'trained' && (
                  <p>The AI bot has been successfully trained for this property and is ready to assist residents.</p>
                )}
                {property.botStatus === 'pending' && (
                  <p>The AI bot is currently being trained with property-specific information.</p>
                )}
                {property.botStatus === 'untrained' && (
                  <p>The AI bot has not been trained for this property yet. Training will begin once a trainer is assigned.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Trainer Modal */}
      <AssignTrainerModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignTrainer}
        property={property}
        trainers={mockTrainers}
      />
    </div>
  );
};

export default PropertyDetailsView;
