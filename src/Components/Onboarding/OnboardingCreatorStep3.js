import React, { useState } from 'react';
import './OnboardingCreatorStep3.css';

const OnboardingCreatorStep3 = ({accountType, onNavigate }) => {
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [propertyData, setPropertyData] = useState({
    title: '',
    image: null
  });

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('onboardingCreatorStep2');
    }
  };

  const handleFinishClick = () => {
    // Show welcome modal after completing onboarding
    // if (onNavigate) {
    //   onNavigate('showWelcome');
    // }
    onNavigate('finish', 'step3')
  };

  const handleAddNewPropertyClick = () => {
    setShowPropertyForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Property data:', propertyData);
    setShowPropertyForm(false);
    // Reset form
    setPropertyData({ title: '', image: null });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setPropertyData(prev => ({ ...prev, image: files[0] }));
    } else {
      setPropertyData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCancelForm = () => {
    setShowPropertyForm(false);
    setPropertyData({ title: '', image: null });
  };

  return (
    <div className="OnboardingCreatorStep3">
      {/* Property Form Modal */}
      {showPropertyForm && (
        <div className="OnboardingCreatorStep3-property-form-overlay">
          <div className="OnboardingCreatorStep3-property-form-modal">
            <h2 className="OnboardingCreatorStep3-form-title">Add New Property</h2>
            <form onSubmit={handleFormSubmit} className="OnboardingCreatorStep3-property-form">
              <div className="OnboardingCreatorStep3-form-group">
                <label htmlFor="title" className="OnboardingCreatorStep3-form-label">Property Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={propertyData.title}
                  onChange={handleInputChange}
                  className="OnboardingCreatorStep3-form-input"
                  required
                />
              </div>
              <div className="OnboardingCreatorStep3-form-group">
                <label htmlFor="image" className="OnboardingCreatorStep3-form-label">Property Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleInputChange}
                  className="OnboardingCreatorStep3-form-input"
                  accept="image/*"
                  required
                />
              </div>
              <div className="OnboardingCreatorStep3-form-buttons">
                <button type="button" onClick={handleCancelForm} className="OnboardingCreatorStep3-cancel-button">
                  Cancel
                </button>
                <button type="submit" className="OnboardingCreatorStep3-submit-button">
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="OnboardingCreatorStep3-main-content">
        <div className="OnboardingCreatorStep3-left-section">
          <div className="OnboardingCreatorStep3-pill">
            <div className="OnboardingCreatorStep3-pill-dot">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="4" r="4" fill="#EF233C" />
              </svg>
            </div>
            <div className="OnboardingCreatorStep3-pill-text">
              Creator Onboarding
            </div>
          </div>
          <div className="OnboardingCreatorStep3-content-section">
            <div className="OnboardingCreatorStep3-main-title">
              Become a creator by following a few steps
            </div>
            <div className="OnboardingCreatorStep3-description-section">
              <div className="OnboardingCreatorStep3-description">
                <span className="OnboardingCreatorStep3-description-normal">As a creator, you would be able to </span>
                <span className="OnboardingCreatorStep3-description-bold">list properties</span>
                <span className="OnboardingCreatorStep3-description-normal"> and assign them to trainers.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="OnboardingCreatorStep3-right-section">
          <div className="OnboardingCreatorStep3-step-container">
              <div className="OnboardingCreatorStep3-step-number-large">
                3
              </div>
              <div className="OnboardingCreatorStep3-step-content">
                  <div className="OnboardingCreatorStep3-step-title-section">
                    <div className="OnboardingCreatorStep3-step-title">
                      Add Properties
                    </div>
                  </div>
                  <div className="OnboardingCreatorStep3-step-description-section">
                    Add details about a new property you would like to manage using our system.
                  </div>
              </div>
            
            <div className="OnboardingCreatorStep3-property-card" onClick={handleAddNewPropertyClick}>
              <div className="OnboardingCreatorStep3-card-header">
                <div className="OnboardingCreatorStep3-card-title">
                  Add a new property
                </div>
              </div>
              <div className="OnboardingCreatorStep3-card-divider"></div>
              <div className="OnboardingCreatorStep3-card-content">
                <div className="OnboardingCreatorStep3-home-icon">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M17 14.6665C17 14.4013 16.8946 14.1469 16.7071 13.9594C16.5196 13.7719 16.2652 13.6665 16 13.6665C15.7348 13.6665 15.4804 13.7719 15.2929 13.9594C15.1054 14.1469 15 14.4013 15 14.6665V17.6665H12C11.7348 17.6665 11.4804 17.7719 11.2929 17.9594C11.1054 18.1469 11 18.4013 11 18.6665C11 18.9317 11.1054 19.1861 11.2929 19.3736C11.4804 19.5611 11.7348 19.6665 12 19.6665H15V22.6665C15 22.9317 15.1054 23.1861 15.2929 23.3736C15.4804 23.5611 15.7348 23.6665 16 23.6665C16.2652 23.6665 16.5196 23.5611 16.7071 23.3736C16.8946 23.1861 17 22.9317 17 22.6665V19.6665H20C20.2652 19.6665 20.5196 19.5611 20.7071 19.3736C20.8946 19.1861 21 18.9317 21 18.6665C21 18.4013 20.8946 18.1469 20.7071 17.9594C20.5196 17.7719 20.2652 17.6665 20 17.6665H17V14.6665Z" fill="#2B2D42" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.9998 1.6665C15.0558 1.6665 14.1985 1.93717 13.2665 2.38917C12.3678 2.8265 11.3278 3.47184 10.0305 4.27717L7.2745 5.98784C6.04784 6.7505 5.0625 7.36117 4.30517 7.94117C3.51984 8.54117 2.91717 9.1545 2.48117 9.9505C2.0465 10.7438 1.85184 11.5892 1.75717 12.5878C1.6665 13.5545 1.6665 14.7385 1.6665 16.2225V18.3732C1.6665 20.9118 1.6665 22.9158 1.8705 24.4825C2.0785 26.0892 2.5185 27.3865 3.5105 28.4118C4.5065 29.4425 5.77317 29.9038 7.34384 30.1212C8.86384 30.3332 10.8078 30.3332 13.2558 30.3332H18.7438C21.1918 30.3332 23.1358 30.3332 24.6558 30.1212C26.2252 29.9038 27.4932 29.4425 28.4905 28.4118C29.4812 27.3865 29.9212 26.0892 30.1305 24.4825C30.3332 22.9158 30.3332 20.9118 30.3332 18.3732V16.2225C30.3332 14.7385 30.3332 13.5558 30.2425 12.5878C30.1492 11.5878 29.9532 10.7438 29.5185 9.9505C29.0825 9.1545 28.4785 8.5425 27.6945 7.94117C26.9372 7.35984 25.9532 6.7505 24.7252 5.98784L21.9692 4.27717C20.6718 3.47184 19.6318 2.8265 18.7318 2.38917C17.8025 1.93584 16.9452 1.6665 15.9998 1.6665ZM11.0398 6.00517C12.3932 5.16517 13.3465 4.57584 14.1425 4.18784C14.9172 3.8105 15.4665 3.6665 15.9998 3.6665C16.5332 3.6665 17.0825 3.8105 17.8572 4.18784C18.6545 4.5745 19.6065 5.16517 20.9598 6.00517L23.6265 7.65984C24.9078 8.45584 25.8078 9.0145 26.4798 9.52917C27.1318 10.0292 27.5065 10.4412 27.7638 10.9105C28.0212 11.3812 28.1718 11.9318 28.2505 12.7745C28.3318 13.6385 28.3332 14.7278 28.3332 16.2718V18.2998C28.3332 20.9265 28.3305 22.8012 28.1465 24.2238C27.9652 25.6212 27.6225 26.4318 27.0532 27.0225C26.4865 27.6078 25.7158 27.9558 24.3812 28.1412C23.0132 28.3305 21.2092 28.3332 18.6665 28.3332H13.3332C10.7892 28.3332 8.9865 28.3305 7.6185 28.1412C6.28384 27.9545 5.51317 27.6078 4.94784 27.0212C4.37717 26.4318 4.0345 25.6212 3.8545 24.2238C3.66784 22.8012 3.6665 20.9278 3.6665 18.2998V16.2718C3.6665 14.7278 3.6665 13.6385 3.74917 12.7745C3.82784 11.9318 3.9785 11.3812 4.23584 10.9105C4.49317 10.4412 4.86784 10.0292 5.52117 9.52917C6.19184 9.0145 7.09184 8.45584 8.37317 7.65984L11.0398 6.00517Z" fill="#2B2D42" />
                  </svg>
                </div>
                <div className="OnboardingCreatorStep3-card-text">
                  Create a new property
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress and Navigation */}
      <div className="OnboardingCreatorStep3-bottom-section">
        <div className="OnboardingCreatorStep3-progress-container">
          <div className="OnboardingCreatorStep3-progress-bar-bg"></div>
          <div className="OnboardingCreatorStep3-progress-bar-fill"></div>
        </div>
        <div className="OnboardingCreatorStep3-navigation-buttons">
          <div className="OnboardingCreatorStep3-back-button" onClick={handleBackClick}>
            Back
          </div>
          <div className="OnboardingCreatorStep3-finish-button" onClick={handleFinishClick}>
            <div className="OnboardingCreatorStep3-finish-button-content">
              Finish
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCreatorStep3;