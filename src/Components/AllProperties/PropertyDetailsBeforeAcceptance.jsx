import React, { useState } from 'react';
import './PropertyDetailsBeforeAcceptance.css';

const PropertyDetailsBeforeAcceptance = ({ property, onBack, onAccept, onReject }) => {
  const [currentMainImage, setCurrentMainImage] = useState(
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7e50e04937ce3ebe7cdc90433bb1155f2c7055ae?placeholderIfAbsent=true"
  );

  // Mock data to match the design
  const propertyData = {
    name: "Prime Estate",
    address: "Flat 4, 24 Castle Street, Perth, PH1 3JY",
    distance: "4 KM away",
    description: "Prime Estate offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. The home features four bedrooms conveniently situated upstairs and three bathrooms. The thoughtful design extends to the upstairs laundry room, ensuring practicality. The Lowe also features plenty of storage space."
  };

  const creatorData = {
    name: "Lois Lane",
    email: "loislane44@gmail.com",
    phone: "+995-445-551-4048",
    avatar: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/c67d26702247ddd302d18806025258eedb83580d?placeholderIfAbsent=true"
  };

  const galleryImages = [
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/150210b5a5e3deab82ae2b0ad07c9310fb05e683?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/6c05a2dd8249e61fe3c17aa4394a8a41e6cde75f?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/ec67b56c0a72e74873f5302458df17f38aa8891c?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/1458de6fc6965a02987d0aaf523e5537079dafc0?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/6c05a2dd8249e61fe3c17aa4394a8a41e6cde75f?placeholderIfAbsent=true",
    "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a6875e2203f25e709ceda843030ec34b3d806e3d?placeholderIfAbsent=true"
  ];

  const sidebarMenuItems = [
    { id: 'overview', label: 'Overview', active: false },
    { id: 'properties', label: 'All Properties', active: true },
    { id: 'notifications', label: 'Properties Notifications', active: false },
    { id: 'visits', label: 'Scheduled Visits', active: false },
    { id: 'logs', label: 'Visit Logs', active: false },
    { id: 'trainbots', label: 'Train Bots', active: false },
    { id: 'settings', label: 'Settings', active: false },
    { id: 'help', label: 'Help Center', active: false },
  ];

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject();
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="property-details-before-acceptance">
      {/* Browser-like header */}
      <div className="browser-header">
        <div className="browser-controls">
          <img
            src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/e71dc262b006089798db2062a87eba7df0a53713?placeholderIfAbsent=true"
            alt="Back"
            className="browser-back-icon"
          />
          <div className="browser-url-bar">
            <div className="url-content">
              <span className="url-text">https://housekeepers.com</span>
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/5811df6839b774d8ae783b17408d13d7497d2c19?placeholderIfAbsent=true"
              alt="Reload"
              className="browser-reload-icon"
            />
          </div>
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7759087292dfb8e59cee6050c6d510a2b43e713a?placeholderIfAbsent=true"
          alt="Window controls"
          className="window-controls"
        />
      </div>

      {/* Main layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo-section">
              <img
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f59cfd379b0660c1dc6b0e7ac118e100d0156d3d?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className="logo-icon"
              />
              <span className="logo-text">Housekeepers</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {sidebarMenuItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${item.active ? 'nav-item-active' : ''}`}
              >
                <div className="nav-icon"></div>
                <span className="nav-label">{item.label}</span>
              </div>
            ))}
          </nav>

          <div className="sidebar-divider"></div>

          <div className="user-profile">
            <div className="user-avatar">
              <img
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true"
                alt="Anthony Bridge"
                className="avatar-image"
              />
            </div>
            <div className="user-info">
              <div className="user-name">Anthony Bridge</div>
              <div className="user-email">a.bridge@gmail.com</div>
              <div className="logout-link">Log out</div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content">
          {/* Top section with back button and search */}
          <div className="top-section">
            <button className="back-button" onClick={handleBack}>
              <div className="back-icon"></div>
            </button>

            <div className="search-and-notifications">
              <div className="search-section">
                <div className="search-bar">
                  <span className="search-placeholder">Enter Property Name</span>
                  <div className="search-icon"></div>
                </div>
                <div className="notifications-bell">
                  <div className="notification-dot"></div>
                </div>
              </div>

              <div className="account-switch">
                <div className="switch-label">Switch account type</div>
                <div className="switch-controls">
                  <span className="switch-text">Creator</span>
                  <div className="toggle-switch">
                    <div className="toggle-button"></div>
                  </div>
                  <span className="switch-text">Trainer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Property header */}
          <div className="property-header">
            <div className="property-header-left">
              <div className="estate-pill">
                <div className="estate-dot"></div>
                <span className="estate-text">Estate</span>
              </div>
              <h1 className="property-title">{propertyData.name}</h1>
              <div className="property-address">{propertyData.address}</div>
              <div className="property-distance">{propertyData.distance}</div>
            </div>

            <div className="action-buttons">
              <button className="accept-button" onClick={handleAccept}>
                Accept Property
              </button>
              <button className="reject-button" onClick={handleReject}>
                Reject Property
              </button>
            </div>
          </div>

          {/* Content area */}
          <div className="content-area">
            <div className="main-content-section">
              {/* Hero image */}
              <div className="hero-image-container">
                <img
                  src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7e50e04937ce3ebe7cdc90433bb1155f2c7055ae?placeholderIfAbsent=true"
                  alt={propertyData.name}
                  className="hero-image"
                />
              </div>

              {/* Dashed divider */}
              <div className="dashed-divider"></div>

              {/* Description section */}
              <div className="description-section">
                <h3 className="description-title">Description</h3>
                <p className="description-text">{propertyData.description}</p>
              </div>

              {/* Bottom dashed divider */}
              <div className="dashed-divider"></div>
            </div>

            <div className="sidebar-content">
              {/* Image gallery */}
              <div className="image-gallery">
                {galleryImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="gallery-image"
                  />
                ))}
              </div>

              {/* Creator details */}
              <div className="creator-details">
                <h3 className="creator-title">Creator Details</h3>
                <div className="creator-info">
                  <img
                    src={creatorData.avatar}
                    alt={creatorData.name}
                    className="creator-avatar"
                  />
                  <div className="creator-text">
                    <div className="creator-name">{creatorData.name}</div>
                    <div className="creator-email">{creatorData.email}</div>
                    <div className="creator-phone">{creatorData.phone}</div>
                  </div>
                </div>
                <div className="contact-creator-link">Contact Creator</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsBeforeAcceptance;
