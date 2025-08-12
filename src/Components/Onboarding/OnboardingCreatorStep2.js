import React, { useState } from 'react';
import './OnboardingCreatorStep2.css';

const OnboardingCreatorStep2 = ({ onNavigate }) => {
  const [trainersList] = useState([
    {
      id: 1,
      name: "Arlene McCoy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Darlene Robertson",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Guy Hawkins",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const [assignmentMessage, setAssignmentMessage] = useState('');

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('onboardingCreator');
    }
  };

  const handleNextClick = () => {
    if (onNavigate) {
      onNavigate('onboardingCreatorStep3');
    }
  };

  // const handleToggleToTrainer = () => {
  //   if (onNavigate) {
  //     onNavigate('toggleToTrainer');
  //   }
  // };

  const handleAssignTrainer = (trainerName) => {
    setAssignmentMessage(`Property successfully assigned to ${trainerName}`);
    setTimeout(() => {
      setAssignmentMessage('');
    }, 3000);
  };

  return (
    <div className="onboarding-creator-step2">

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <div className="content-columns">
            <div className="left-column">
              <div className="left-content">
                <div className="status-pill">
                  <div className="pill-dot" />
                  <div className="pill-text">
                    Creator Onboarding
                  </div>
                </div>
                <div className="content-section">
                  <div className="main-title">
                    Become a creator by following a few steps
                  </div>
                  <div className="description-section">
                    <div className="description-text">
                      As a creator, you would be able to list properties and assign them to trainers.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="onboarding-right-content">
              <div className="onboarding-step-container">
                <div className="onboarding-step-number">
                  2
                </div>
                <div className="onboarding-step-content">
                  <div className="onboarding-step-title">
                    Assign to Trainers
                  </div>
                  <div className="onboarding-step-description">
                    From a wide database of trainers in our system, select and assign a trainer to your property.
                  </div>

                  {/* List of Trainers */}
                  <div className="trainers-section">
                    <div className="trainers-title">
                      List of Trainers
                    </div>

                    {assignmentMessage && (
                      <div className="assignment-message">
                        {assignmentMessage}
                      </div>
                    )}

                    <div className="trainers-list">
                      {trainersList.map((trainer) => (
                        <div key={trainer.id} className="trainer-item">
                          <div className="trainer-info">
                            <img
                              src={trainer.image}
                              alt={trainer.name}
                              className="trainer-image"
                            />
                            <span className="trainer-name">
                              {trainer.name}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAssignTrainer(trainer.name)}
                            className="assign-button"
                          >
                            Assign
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Progress and Navigation */}
          <div className="bottom-section">
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" />
              </div>
            </div>
            <div className="navigation-buttons">
              <button className="back-button" onClick={handleBackClick}>
                Back
              </button>
              <button className="next-button" onClick={handleNextClick}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCreatorStep2;
