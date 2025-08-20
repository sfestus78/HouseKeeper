import React, { useState } from 'react';
import { ArrowLeft, Calendar, CheckSquare, Bot, AlertCircle } from 'lucide-react';
import AcceptModal from './AcceptModal';
import RejectModal from './RejectModal';
import './PropertyDetailsAfterAcceptance.css';

const PropertyDetailsAfterAcceptance = ({ 
  property, 
  onBack, 
  onScheduleVisit, 
  onStartChecklist, 
  onReschedule, 
  onCancel,
  onStartBotTraining 
}) => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [isAccepted, setIsAccepted] = useState(property?.status === 'accepted');

  // Mock additional images for gallery
  const galleryImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/46110a34a5006edb3d138d52b7e3ac5410ed7f66?width=360",
    "https://api.builder.io/api/v1/image/assets/TEMP/0962fd89e2c4195d7f1ceca8ea6a7bafa7d37d19?width=360",
    "https://api.builder.io/api/v1/image/assets/TEMP/be14af6f50eeabafffaab5f1f9a7884cb8f9fd61?width=360",
    "https://api.builder.io/api/v1/image/assets/TEMP/6216a0eec3f571e147e6a128dfee82932aa38103?width=360",
    "https://api.builder.io/api/v1/image/assets/TEMP/0962fd89e2c4195d7f1ceca8ea6a7bafa7d37d19?width=360",
    "https://api.builder.io/api/v1/image/assets/TEMP/1a0da22b7eb1a0ca2ef536dc4100c1fd8ed4d0bd?width=360"
  ];

  // Mock creator details
  const creator = property?.creator || {
    name: "Lois Lane",
    email: "loislane44@gmail.com",
    phone: "+995-445-551-4048",
    avatar: "https://api.builder.io/api/v1/image/assets/TEMP/e1f21848c3acc63fb623a536ea7425afa859ef6d?width=80",
    status: "online"
  };

  const handleAcceptConfirm = () => {
    setIsAccepted(true);
    setShowAcceptModal(false);
    console.log('Property accepted:', property.id);
  };

  const handleRejectConfirm = (reason) => {
    setShowRejectModal(false);
    console.log('Property rejected:', property.id, 'Reason:', reason);
    if (onBack) onBack();
  };

  const handleScheduleVisit = () => {
    console.log('Schedule visit for property:', property.id);
    if (onScheduleVisit) onScheduleVisit(property.id);
  };

  const handleStartChecklist = () => {
    console.log('Start checklist for property:', property.id);
    if (onStartChecklist) onStartChecklist(property.id);
  };

  const handleReschedule = () => {
    console.log('Reschedule visit for property:', property.id);
    if (onReschedule) onReschedule(property.id);
  };

  const handleCancel = () => {
    console.log('Cancel visit for property:', property.id);
    if (onCancel) onCancel(property.id);
  };

  const handleStartBotTraining = () => {
    console.log('Start bot training for property:', property.id);
    if (onStartBotTraining) onStartBotTraining(property.id);
  };

  const handleContactCreator = () => {
    console.log('Contact creator:', creator.email);
  };

  return (
    <div className="propertiesdetailsafteracceptance-container">
      <div className="propertiesdetailsafteracceptance-content">
        {/* Header Section */}
        <div className="propertiesdetailsafteracceptance-header-section">
          <button 
            className="propertiesdetailsafteracceptance-back-btn" 
            onClick={onBack}
          >
            <ArrowLeft size={24} />
          </button>
          
          {!isAccepted && (
            <div className="propertiesdetailsafteracceptance-actions">
              <button 
                className="propertiesdetailsafteracceptance-accept-btn"
                onClick={() => setShowAcceptModal(true)}
              >
                Accept Property
              </button>
              <button 
                className="propertiesdetailsafteracceptance-reject-btn"
                onClick={() => setShowRejectModal(true)}
              >
                Reject Property
              </button>
            </div>
          )}
        </div>

        {/* Property Info Header */}
        <div className="propertiesdetailsafteracceptance-info-header">
          <div className="propertiesdetailsafteracceptance-type-pill">
            <span className="propertiesdetailsafteracceptance-status-dot"></span>
            <span className="propertiesdetailsafteracceptance-type-text">Estate</span>
          </div>
          <div className="propertiesdetailsafteracceptance-title-section">
            <h1 className="propertiesdetailsafteracceptance-title">
              {property?.name || "Prime Estate"}
            </h1>
          </div>
          <div className="propertiesdetailsafteracceptance-address-section">
            <p className="propertiesdetailsafteracceptance-address">
              {property?.address || "Flat 4, 24 Castle Street, Perth, PH1 3JY"}
            </p>
            <p className="propertiesdetailsafteracceptance-distance">
              {property?.distance || "4 KM away"}
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="propertiesdetailsafteracceptance-content-grid">
          {/* Main Content */}
          <div className="propertiesdetailsafteracceptance-main-content">
            {/* Hero Image */}
            <div className="propertiesdetailsafteracceptance-hero-container">
              <img
                src={property?.image || "https://api.builder.io/api/v1/image/assets/TEMP/cf2717bc7432d2097671f901a700f00b385a4c42?width=1441"}
                alt={property?.name || "Property"}
                className="propertiesdetailsafteracceptance-hero-image"
              />
            </div>

            {/* Description Section */}
            <div className="propertiesdetailsafteracceptance-separator-top"></div>
            <div className="propertiesdetailsafteracceptance-description-section">
              <div className="propertiesdetailsafteracceptance-description-header">
                <h3 className="propertiesdetailsafteracceptance-description-title">Description</h3>
              </div>
              <p className="propertiesdetailsafteracceptance-description-text">
                {property?.description || "Prime Estate offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. The home features four bedrooms conveniently situated upstairs and three bathrooms. The thoughtful design extends to the upstairs laundry room, ensuring practicality. The Lowe also features plenty of storage space."}
              </p>
            </div>
            <div className="propertiesdetailsafteracceptance-separator-bottom"></div>

            {/* Action Items Section */}
            {isAccepted && (
              <div className="propertiesdetailsafteracceptance-actions-section">
                {/* Visit Schedule */}
                <div className="propertiesdetailsafteracceptance-action-item">
                  <div className="propertiesdetailsafteracceptance-action-icon">
                    <Calendar size={40} />
                  </div>
                  <div className="propertiesdetailsafteracceptance-action-content">
                    <div className="propertiesdetailsafteracceptance-action-header">
                      <button
                        className="propertiesdetailsafteracceptance-action-title"
                        onClick={handleScheduleVisit}
                      >
                        Visit Schedule
                      </button>
                      <span className="propertiesdetailsafteracceptance-status-pending">Pending</span>
                    </div>
                    <div className="propertiesdetailsafteracceptance-action-buttons">
                      <button 
                        className="propertiesdetailsafteracceptance-reschedule-btn"
                        onClick={handleReschedule}
                      >
                        Reschedule
                      </button>
                      <button 
                        className="propertiesdetailsafteracceptance-cancel-btn"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visit Inspection Checklist */}
                <div className="propertiesdetailsafteracceptance-action-item">
                  <div className="propertiesdetailsafteracceptance-action-icon">
                    <CheckSquare size={40} />
                  </div>
                  <div className="propertiesdetailsafteracceptance-action-content">
                    <div className="propertiesdetailsafteracceptance-action-header">
                      <h4 className="propertiesdetailsafteracceptance-action-title">Visit Inspection Checklist</h4>
                    </div>
                    <button 
                      className="propertiesdetailsafteracceptance-start-btn"
                      onClick={handleStartChecklist}
                    >
                      Start
                    </button>
                  </div>
                </div>

                {/* AI Bot Training */}
                <div className="propertiesdetailsafteracceptance-action-item">
                  <div className="propertiesdetailsafteracceptance-action-icon">
                    <Bot size={40} />
                  </div>
                  <div className="propertiesdetailsafteracceptance-action-content">
                    <div className="propertiesdetailsafteracceptance-action-header">
                      <h4 className="propertiesdetailsafteracceptance-action-title">AI Bot Training Status</h4>
                    </div>
                    <button 
                      className="propertiesdetailsafteracceptance-start-btn"
                      onClick={handleStartBotTraining}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="propertiesdetailsafteracceptance-separator-bottom"></div>
          </div>

          {/* Sidebar */}
          <div className="propertiesdetailsafteracceptance-sidebar">
            {/* Image Gallery */}
            <div className="propertiesdetailsafteracceptance-gallery">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="propertiesdetailsafteracceptance-gallery-image"
                />
              ))}
            </div>
            
            {/* Creator Details */}
            <div className="propertiesdetailsafteracceptance-creator-section">
              <h3 className="propertiesdetailsafteracceptance-creator-title">Creator Details</h3>
              <div className="propertiesdetailsafteracceptance-creator-profile">
                <div className="propertiesdetailsafteracceptance-creator-avatar-container">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="propertiesdetailsafteracceptance-creator-avatar"
                  />
                  <div className="propertiesdetailsafteracceptance-creator-status-dot"></div>
                </div>
                <div className="propertiesdetailsafteracceptance-creator-info">
                  <h4 className="propertiesdetailsafteracceptance-creator-name">{creator.name}</h4>
                  <p className="propertiesdetailsafteracceptance-creator-email">{creator.email}</p>
                  <p className="propertiesdetailsafteracceptance-creator-phone">{creator.phone}</p>
                </div>
              </div>
              <button 
                className="propertiesdetailsafteracceptance-contact-btn" 
                onClick={handleContactCreator}
              >
                Contact Creator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAcceptModal && (
        <AcceptModal
          property={property}
          onConfirm={handleAcceptConfirm}
          onCancel={() => setShowAcceptModal(false)}
        />
      )}

      {showRejectModal && (
        <RejectModal
          property={property}
          onConfirm={handleRejectConfirm}
          onCancel={() => setShowRejectModal(false)}
        />
      )}
    </div>
  );
};

export default PropertyDetailsAfterAcceptance;
