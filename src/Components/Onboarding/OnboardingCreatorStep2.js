import React, { useState } from 'react';
import './OnboardingCreatorStep2.css';

const OnboardingCreatorStep2 = ({accountType, onNavigate }) => {
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

  const handleAssignTrainer = (trainerName) => {
    setAssignmentMessage(`Property successfully assigned to ${trainerName}`);
    setTimeout(() => {
      setAssignmentMessage('');
    }, 3000);
  };

  return (
    <div className="OnboardingCreatorStep2-container">
      {/* Main Content */}
      <div className="OnboardingCreatorStep2-mainContent">
        <div className="OnboardingCreatorStep2-contentContainer">
          <div className="OnboardingCreatorStep2-columns">
            <div className="OnboardingCreatorStep2-leftColumn">
              <div className="OnboardingCreatorStep2-leftContent">
                <div className="OnboardingCreatorStep2-statusPill">
                  <div className="OnboardingCreatorStep2-pillDot" />
                  <div className="OnboardingCreatorStep2-pillText">
                    Creator Onboarding
                  </div>
                </div>
                <div className="OnboardingCreatorStep2-contentSection">
                  <div className="OnboardingCreatorStep2-mainTitle">
                    Become a creator by following a few steps
                  </div>
                  <div className="OnboardingCreatorStep2-descriptionSection">
                    <div className="OnboardingCreatorStep2-descriptionText">
                      As a creator, you would be able to list properties and assign them to trainers.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="OnboardingCreatorStep2-rightColumn">
              <div className="OnboardingCreatorStep2-rightContent">
                <div className="OnboardingCreatorStep2-stepNumber">
                  2
                </div>
                <div className="OnboardingCreatorStep2-stepContent">
                  <div className="OnboardingCreatorStep2-stepTitle">
                    Assign to Trainers
                  </div>
                  <div className="OnboardingCreatorStep2-stepDescription">
                    From a wide database of trainers in our system, select and assign a trainer to your property.
                  </div>

                  {/* List of Trainers */}
                  <div className="OnboardingCreatorStep2-trainersSection">
                    <div className="OnboardingCreatorStep2-trainersTitle">
                      List of Trainers
                    </div>

                    {assignmentMessage && (
                      <div className="OnboardingCreatorStep2-assignmentMessage">
                        {assignmentMessage}
                      </div>
                    )}

                    <div className="OnboardingCreatorStep2-trainersList">
                      {trainersList.map((trainer) => (
                        <div key={trainer.id} className="OnboardingCreatorStep2-trainerItem">
                          <div className="OnboardingCreatorStep2-trainerInfo">
                            <img
                              src={trainer.image}
                              alt={trainer.name}
                              className="OnboardingCreatorStep2-trainerImage"
                            />
                            <span className="OnboardingCreatorStep2-trainerName">
                              {trainer.name}
                            </span>
                          </div>
                          <button
                            onClick={() => handleAssignTrainer(trainer.name)}
                            className="OnboardingCreatorStep2-assignButton"
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
          <div className="OnboardingCreatorStep2-bottomSection">
            <div className="OnboardingCreatorStep2-progressContainer">
              <div className="OnboardingCreatorStep2-progressBar">
                <div className="OnboardingCreatorStep2-progressFill" />
              </div>
            </div>
            <div className="OnboardingCreatorStep2-navigationButtons">
              <button className="OnboardingCreatorStep2-backButton" onClick={handleBackClick}>
                Back
              </button>
              <button className="OnboardingCreatorStep2-nextButton" onClick={handleNextClick}>
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
