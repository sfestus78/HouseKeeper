import React, { useState } from 'react';
import './OnboardingTrainerStep2.css';

const OnboardingTrainerStep2 = ({ onNavigate }) => {
  const [propertyStatus, setPropertyStatus] = useState(null);

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('onboardingTrainer');
    }
  };

  const handleAcceptClick = () => {
    setPropertyStatus('accepted');
    // Add any accept logic here
    console.log('Property assignment accepted');
  };

  const handleRejectClick = () => {
    setPropertyStatus('rejected');
    // Add any reject logic here
    console.log('Property assignment rejected');
    // Could show rejection confirmation or go back
  };

  const handleNextClick = () => {
    // Show welcome modal after completing trainer onboarding
    if (onNavigate) {
      onNavigate('showWelcome');
    }
  };

  const handleToggleToCreator = () => {
    if (onNavigate) {
      onNavigate('toggleToCreator');
    }
  };

  return (
    <div className="trainer-step2-container">
      {/* Header Navigation */}
      <div className="trainer-step2-header-navigation">
        <div className="trainer-step2-header">
          <div className="trainer-step2-header-container">
            <div className="trainer-step2-logo-section">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/fd2e76c2b4620a710f8884d9852c589d61caab4d?width=80"
                alt="Logo"
                className="trainer-step2-logo"
              />
            </div>
            <div className="trainer-step2-account-switch">
              <div className="trainer-step2-switch-label">
                Switch account type
              </div>
              <div className="trainer-step2-toggle-container">
                <div
                  className="trainer-step2-toggle-text"
                  onClick={handleToggleToCreator}
                >
                  Creator
                </div>
                <div
                  className="trainer-step2-toggle-switch"
                  onClick={handleToggleToCreator}
                >
                  <div className="trainer-step2-toggle-track">
                    <div className="trainer-step2-toggle-circle" />
                  </div>
                </div>
                <div className="trainer-step2-toggle-text active">Trainer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="trainer-step2-main-content">
        <div className="trainer-step2-content-wrapper">
          <div className="trainer-step2-left-column">
            <div className="trainer-step2-content-section">
              <div className="trainer-step2-pill">
                <div className="trainer-step2-pill-dot" />
                <div className="trainer-step2-pill-text">
                  Trainer Onboarding
                </div>
              </div>
              <div className="trainer-step2-heading-section">
                <div className="trainer-step2-main-title">
                  Accept property assignment
                </div>
                <div className="trainer-step2-description-section">
                  <div className="trainer-step2-description">
                    Review the property details and decide if you want to{" "}
                    <span className="trainer-step2-brand-highlight">
                      accept
                    </span>{" "}
                    or{" "}
                    <span className="trainer-step2-brand-highlight">
                      reject
                    </span>{" "}
                    this assignment.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="trainer-step2-right-column">
            <div className="trainer-step2-step-section">
              <div className="trainer-step2-step-wrapper">
                <div className="trainer-step2-step-number-column">
                  <div className="trainer-step2-step-number">2</div>
                </div>
                <div className="trainer-step2-step-content-column">
                  <div className="trainer-step2-step-content">
                    <div className="trainer-step2-step-title">
                      Accept property assignment
                    </div>
                    <div className="trainer-step2-step-description">
                      Review and accept or reject the property assignment to
                      complete your onboarding.
                    </div>
                    {/* Property Assignment Card */}
                    <div className="trainer-step2-property-card">
                      <div className="trainer-step2-property-details">
                        <div className="trainer-step2-property-icon">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                              stroke="#6B7280"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9 22V12H15V22"
                              stroke="#6B7280"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="trainer-step2-property-info">
                          <h3 className="trainer-step2-property-title">
                            Dream Homes
                          </h3>
                          <p className="trainer-step2-property-location">
                            12 Falcon St, Newstead EC1A 1BB
                          </p>
                        </div>
                      </div>

                      {/* Accept/Reject Buttons */}
                      <div className="trainer-step2-action-buttons">
                        <button
                          className="trainer-step2-accept-button"
                          onClick={handleAcceptClick}
                          disabled={propertyStatus !== null}
                        >
                          Accept
                        </button>
                        <button
                          className="trainer-step2-reject-button"
                          onClick={handleRejectClick}
                          disabled={propertyStatus !== null}
                        >
                          Decline
                        </button>
                      </div>

                      {propertyStatus && (
                        <div
                          className={`trainer-step2-status-message ${propertyStatus}`}
                        >
                          {propertyStatus === "accepted"
                            ? "✓ Property assignment accepted successfully!"
                            : "✗ Property assignment rejected."}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Progress and Button Section */}
        <div className="trainer-step2-bottom-section">
          <div className="trainer-step2-progress-container">
            <div className="trainer-step2-progress-bar">
              <div className="trainer-step2-progress-fill" />
            </div>
          </div>
          <div className="trainer-step2-navigation-buttons">
            <div
              className="trainer-step2-back-button"
              onClick={handleBackClick}
            >
              Back
            </div>
            <div
              className="trainer-step2-next-button"
              onClick={handleNextClick}
            >
              <div className="trainer-step2-button-base">
                <div className="trainer-step2-button-text">Finish</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTrainerStep2;