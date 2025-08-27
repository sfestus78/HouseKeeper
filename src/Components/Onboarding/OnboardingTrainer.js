import React, { useState } from 'react';
import AccountStatusPill from '../AccountStatusPill'
import './OnboardingTrainer.css';

const OnboardingTrainer = ({accountType, onNavigate }) => {
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);

  const handleNextClick = () => {
    // Navigate to the next step in the trainer onboarding process
    
      onNavigate('onboardingTrainerStep2');
    
  };

  // const handleFinishClick = () => {
  //   // Navigate to the profile page
  //   if (onNavigate) {
  //     onNavigate('finish');
  //   }
  // };

  const handlePropertyDetailsClick = () => {
    setShowPropertyDetails(!showPropertyDetails);
  };

  // const handleToggleToCreator = () => {
  //   if (onNavigate) {
  //     onNavigate('toggleToCreator');
  //   }
  // };

  return (
    <div className="onboarding-trainer-container">
      {/* Header Navigation */}
      {/* <div className="dropdown-header-navigation">
        <div className="header">
          <div className="container">
            <div className="logo-section">
              <img
                src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/1b07415251257f9cbdba4253d4c490836c5be0b8?placeholderIfAbsent=true"
                alt="Logo"
                className="logo"
              />
            </div>
            <div className="account-switch-section">
              <div className="switch-supporting-text">
                Switch account type
              </div>
              <div className="toggle-container">
                <div className="toggle-text" onClick={handleToggleToCreator}>
                  Creator
                </div>
                <div className="toggle" onClick={handleToggleToCreator}>
                  <div className="toggle-track">
                    <div className="toggle-circle" />
                  </div>
                </div>
                <div className="toggle-text active">
                  Trainer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <div className="left-column">
            <div className="content-section">
              < AccountStatusPill accountType= "trainer"/>
              <div className="heading-wrapper">
                <div className="main-title">
                  Become a trainer with just a few steps
                </div>
                <div className="description-wrapper">
                  <div className="supporting-text">
                    As a trainer, you{" "}
                    <span className="brand-highlight">
                      Housekeep
                    </span>{" "}
                    by training AI bots and ensuring guests have the required help.
                  </div>
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
                      Get assigned a property
                    </div>
                    <div className="onboarding-step-description">
                      Add details about a new property you would like to
                      manage using our system.
                    </div>
                  </div>
            </div>

            {/* Property Details Notification */}
            <div className="property-notification" onClick={handlePropertyDetailsClick}>
              <div className="notification-header">
                <div className="notification-icon">🏠</div>
                <div className="notification-content">
                  <div className="notification-title">Property Assignment Available</div>
                  <div className="notification-subtitle">Click to view details</div>
                </div>
                <div className="notification-arrow">{showPropertyDetails ? '▼' : '▶'}</div>
              </div>

              {showPropertyDetails && (
                <div className="property-details">
                  <div className="property-info">
                    <h4>Luxury Beach Villa</h4>
                    <p className="property-location">📍 Miami Beach, FL</p>
                    <p className="property-description">
                      A beautiful beachfront property with 4 bedrooms, 3 bathrooms, and stunning ocean views.
                    </p>
                    <div className="property-features">
                      <span className="feature-tag">4 Bedrooms</span>
                      <span className="feature-tag">3 Bathrooms</span>
                      <span className="feature-tag">Ocean View</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Progress and Button Section */}
        <div className="bottom-section">
          <div className="progress-container">
            <div className="progress-bar" />
          </div>
          <div className="navigation-buttons">
            {/* <button className="finish-button" onClick={handleFinishClick}>
              Finish
            </button> */}
            <button className="next-button" onClick={handleNextClick}>
              <div className="button-base">
                <div className="button-text">
                  Next
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTrainer;
