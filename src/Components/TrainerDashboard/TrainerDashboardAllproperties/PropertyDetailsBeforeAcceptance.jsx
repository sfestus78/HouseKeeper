import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './PropertyDetailsBeforeAcceptance.css';

const PropertyDetailsBeforeAcceptance = ({ property, onBack, onAccept, onReject }) => {
  // Mock additional images for gallery
  const galleryImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&h=200&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop"
  ];

  const [selectedImage, setSelectedImage] = useState(
    property?.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop"
  );

  // Mock creator details
  const creator = property?.creator || {
    name: "Lois Lane",
    email: "loislane44@gmail.com",
    phone: "+995-445-551-4048",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c9c3c2d1?w=50&h=50&fit=crop&crop=face"
  };

  const handleAccept = () => {
    if (onAccept) {
      onAccept(property?.id);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(property?.id);
    }
  };

  const handleContactCreator = () => {
    console.log('Contact creator:', creator.email);
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="property-details-wrapper">
      {/* Header */}
      <div className="property-header">
        <div className="property-header-content">
          <div className="header-left">
            <button onClick={onBack} className="back-button">
              <ArrowLeft size={20} />
            </button>
            <div className="property-type-indicator">
              <div className="status-dot"></div>
              <span className="property-type-text">Estate</span>
            </div>
          </div>
          <div className="header-actions">
            <button onClick={handleAccept} className="action-button accept-button">
              Accept Property
            </button>
            <button onClick={handleReject} className="action-button reject-button">
              Reject Property
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="property-main-content">
        {/* Property Info */}
        <div className="property-info">
          <h1 className="property-title">
            {property?.name || "Prime Estate"}
          </h1>
          <p className="property-address">
            {property?.address || "Flat 4, 24 Castle Street, Perth, PH1 3JY"}
          </p>
          <p className="property-distance">
            {property?.distance || "4 KM away"}
          </p>
        </div>

        {/* Image Section */}
        <div className="image-section">
          {/* Hero Image - 60% width */}
          <div className="hero-image-container">
            <img
              src={selectedImage}
              alt="Property"
              className="hero-image"
            />
          </div>

          {/* Thumbnail Grid - 40% width */}
          <div className="thumbnail-grid-container">
            <div className="thumbnail-grid">
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="thumbnail-image"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Description */}
          <div className="description-section">
            <h2 className="description-title">Description</h2>
            <p className="description-text">
              {property?.description || "Prime Estate offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. The home features four bedrooms conveniently situated upstairs and three bathrooms. The thoughtful design extends to the upstairs laundry room, ensuring practicality. The Lowe also features plenty of storage space."}
            </p>
          </div>

          {/* Creator Details */}
          <div className="creator-section">
            <h3 className="creator-title">Creator Details</h3>
            
            <div className="creator-profile">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="creator-avatar"
              />
              <div className="creator-info">
                <div className="creator-name-container">
                  <h4 className="creator-name">{creator.name}</h4>
                  <div className="online-indicator"></div>
                </div>
                <p className="creator-email">{creator.email}</p>
                <p className="creator-phone">{creator.phone}</p>
              </div>
            </div>
            
            <button onClick={handleContactCreator} className="contact-button">
              Contact Creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsBeforeAcceptance;