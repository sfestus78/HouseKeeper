import React, { useState } from 'react';
import AccountStatusPill from '../AccountStatusPill';
import './OnboardingCreator.css';

const OnboardingCreator = ({accountType, onNavigate }) => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [isEditingProperty, setIsEditingProperty] = useState(false);
  const [propertyData, setPropertyData] = useState({
    name: '',
    address: '',
    image: null,
    imagePreview: null
  });
  const [savedProperty, setSavedProperty] = useState(null);

  const handleNextClick = () => {
    // Navigate to the next step in the onboarding process
    if (onNavigate) {
      onNavigate('onboardingCreatorStep2');
    }
  };

  const handleToggleToTrainer = () => {
    if (onNavigate) {
      onNavigate('toggleToTrainer');
    }
  };

  const handleAddPropertyClick = () => {
    setIsEditingProperty(false);
    setPropertyData({
      name: '',
      address: '',
      image: null,
      imagePreview: null
    });
    setShowPropertyForm(true);
  };

  const handleEditPropertyClick = () => {
    setIsEditingProperty(true);
    setPropertyData({
      name: savedProperty.name,
      address: savedProperty.address,
      image: savedProperty.image,
      imagePreview: savedProperty.imagePreview
    });
    setShowPropertyForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPropertyData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleInputChange = (field, value) => {
    setPropertyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProperty = () => {
    if (propertyData.name && propertyData.address) {
      console.log('Property saved:', propertyData);
      // Save the property data
      setSavedProperty({
        name: propertyData.name,
        address: propertyData.address,
        image: propertyData.image,
        imagePreview: propertyData.imagePreview
      });
      // Hide the form
      setShowPropertyForm(false);
      setIsEditingProperty(false);
      // Reset form data
      setPropertyData({ name: '', address: '', image: null, imagePreview: null });
    } else {
      alert('Please fill in all required fields');
    }
  };

  const handleCancelForm = () => {
    setShowPropertyForm(false);
    setIsEditingProperty(false);
    setPropertyData({ name: '', address: '', image: null, imagePreview: null });
  };

  return (
    <div className="onboarding-creator">

      {/* Main Content */}
      <div className="onboarding-main-content">
        <div className="onboarding-left-content">
          <AccountStatusPill accountType={accountType} />

          <div className="onboarding-content-section">
            <div className="onboarding-title">
              Become a creator by following a few steps
            </div>
            <div className="onboarding-description-section">
              <div className="onboarding-description">
                As a creator, you would be able to list properties and assign them to trainers.
              </div>
            </div>
          </div>
        </div>

        <div className="onboarding-right-content">
          <div className="onboarding-step-container">
            <div className="onboarding-step-number">
              1
            </div>
            <div className="onboarding-step-content">
              <div className="onboarding-step-title">
                Add a new property
              </div>
              <div className="onboarding-step-description">
                Add details about a new property you would like to manage using our system.
              </div>
              <div className="onboarding-add-property-section">
                <div className="onboarding-add-property-title">
                  Add a new property
                </div>
                {savedProperty ? (
                  <div className="onboarding-property-display">
                    <div className="onboarding-property-card">
                      <div className="onboarding-property-image">
                        {savedProperty.imagePreview ? (
                          <img 
                            src={savedProperty.imagePreview} 
                            alt={savedProperty.name}
                            className="onboarding-property-img"
                          />
                        ) : (
                          <div className="onboarding-property-placeholder">🏠</div>
                        )}
                      </div>
                      <div className="onboarding-property-info">
                        <div className="onboarding-property-name">
                          {savedProperty.name}
                        </div>
                        <div className="onboarding-property-separator">|</div>
                        <div className="onboarding-property-address">
                          {savedProperty.address}
                        </div>
                      </div>
                      <button 
                        onClick={handleEditPropertyClick}
                        className="onboarding-property-edit-button"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={handleAddPropertyClick}
                    className="onboarding-add-property-button"
                  >
                    <div className="onboarding-add-property-icon">+</div>
                    <span>Create a new property</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Form Modal */}
      {showPropertyForm && (
        <div className="onboarding-modal-overlay">
          <div className="onboarding-modal">
            <div className="onboarding-modal-header">
              <h2 className="onboarding-modal-title">
                {isEditingProperty ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button 
                onClick={handleCancelForm}
                className="onboarding-modal-close"
              >
                ×
              </button>
            </div>

            <div className="onboarding-modal-content">
              {/* Property Name */}
              <div className="onboarding-form-group">
                <label className="onboarding-form-label">
                  Property Name *
                </label>
                <input
                  type="text"
                  value={propertyData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter property name"
                  className="onboarding-form-input"
                />
              </div>

              {/* Property Address */}
              <div className="onboarding-form-group">
                <label className="onboarding-form-label">
                  Property Address *
                </label>
                <textarea
                  value={propertyData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full property address"
                  rows={3}
                  className="onboarding-form-textarea"
                />
              </div>

              {/* Property Image */}
              <div className="onboarding-form-group">
                <label className="onboarding-form-label">
                  Property Image
                </label>
                <div className="onboarding-upload-area">
                  {propertyData.imagePreview ? (
                    <div className="onboarding-image-preview">
                      <img 
                        src={propertyData.imagePreview} 
                        alt="Property preview" 
                        className="onboarding-preview-image"
                      />
                      <div className="onboarding-image-name">
                        {propertyData.image?.name}
                      </div>
                      <button
                        onClick={() => document.getElementById('onboarding-image-upload').click()}
                        className="onboarding-change-image-button"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <div className="onboarding-upload-placeholder">
                      <div className="onboarding-upload-icon">📷</div>
                      <div>
                        <button
                          onClick={() => document.getElementById('onboarding-image-upload').click()}
                          className="onboarding-upload-button"
                        >
                          Upload Image
                        </button>
                      </div>
                      <div className="onboarding-upload-text">
                        Click to upload or drag and drop<br />
                        PNG, JPG, GIF up to 10MB
                      </div>
                    </div>
                  )}
                  <input
                    id="onboarding-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="onboarding-hidden-input"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="onboarding-form-actions">
                <button
                  onClick={handleCancelForm}
                  className="onboarding-cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProperty}
                  className="onboarding-save-button"
                >
                  {isEditingProperty ? 'Update Property' : 'Save Property'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Progress and Button */}
      <div className="onboarding-bottom-section">
        <div className="onboarding-progress-bar">
          <div className="onboarding-progress-track" />
          <div className="onboarding-progress-fill" />
        </div>
        <div className="onboarding-next-button" onClick={handleNextClick}>
          <div className="onboarding-button-content">
            Next
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCreator;