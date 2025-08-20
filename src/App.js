import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Components/Authshared/general';
import {
  CreateAccountPage,
  LoginPage,
  OTPPage,
  ProfilePage,
  ResetPasswordPage,
  ChangePasswordPage,
  WelcomeModal,
  CongratulationsModal
} from './Components/Authpages';

import {
  OnboardingCreator,
  OnboardingCreatorStep2,
  OnboardingCreatorStep3,
  OnboardingTrainer,
  OnboardingTrainerStep2
} from './Components/Onboarding';

import {
  CreatorDashboard,
  CreatorNewProperty
} from './Components/Dashboard';

import CreatePropertyFormDemo from './Components/CreatePropertyFormDemo';
import TrainerListSimple from './Components/TrainerListSimple';
import { AllPropertiesPage } from './Components/AllProperties';
import AssignPropertyPage from './Components/AssignProperty/AssignPropertyPage';
import { TrainersPage } from './Components/Trainers';

import './Components/Authshared/generalstyles.css';
import TrainerDashboard from './Components/TrainerDashboard/TrainerDashboard';

// Demo Navigation Component
const DemoNavigation = ({ currentPage, onNavigate, pages, onShowWelcome, onShowCongratulations }) => (
  <div className="demo-nav">
    <div className="demo-nav-container">
      <button
        onClick={onShowCongratulations}
        className="demo-nav-button inactive"
      >
        Congratulations
      </button>
      <button
        onClick={onShowWelcome}
        className="demo-nav-button inactive"
      >
        Welcome
      </button>
      {Object.keys(pages).map((page) => (
        <button
          key={page}
          onClick={() => onNavigate(page)}
          className={`demo-nav-button ${currentPage === page ? 'active' : 'inactive'}`}
        >
          {page === 'createAccount' ? 'Create' :
           page === 'changePassword' ? 'Change Pwd' :
           page === 'onboardingCreator' ? 'Creator Step 1' :
           page === 'onboardingCreatorStep2' ? 'Creator Step 2' :
           page === 'onboardingCreatorStep3' ? 'Creator Step 3' :
           page === 'onboardingTrainer' ? 'Trainer Step 1' :
           page === 'onboardingTrainerStep2' ? 'Trainer Step 2' :
           page === 'creatorDashboard' ? 'Dashboard' :
           page === 'creatorNewProperty' ? 'New Property' :
           page === 'allProperties' ? 'All Properties' :
           page === 'trainerList' ? 'Trainers' :
           page === 'trainerListAvailable' ? 'Available Trainers' :
           page === 'trainers' ? 'Trainers Page' :
           page === 'assignProperty' ? 'Assign Property' :
           page === 'trainerDashboard' ? 'Trainer Dashboard' :
           page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [accountType, setAccountType] = useState('Creator');
  const [currentPage, setCurrentPage] = useState('trainerDashboard');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);

  const toggleAccountType = () => {
    setAccountType(prev => prev === 'Creator' ? 'Trainer' : 'Creator');
  };

  const navigateToPage = (page) => {
    if (page === 'showCongratulations') {
      setShowCongratulationsModal(true);
    } else {
      setCurrentPage(page);
    }
  };

  // Handle Congratulations Modal flow - go directly to onboarding
  const handleCongratulationsStartOnboarding = () => {
    setShowCongratulationsModal(false);
    // Navigate directly to onboarding based on account type
    if (accountType === 'Creator') {
      setCurrentPage('onboardingCreator');
    } else {
      setCurrentPage('onboardingTrainer');
    }
  };

  // Handle Welcome Modal flow - after onboarding is complete
  const handleWelcomeGetStarted = () => {
    setShowWelcomeModal(false);
    // Navigate to profile or dashboard after onboarding completion
    setCurrentPage('profile');
  };

  const showWelcomeModalHandler = () => {
    setShowWelcomeModal(true);
  };

  const showCongratulationsModalHandler = () => {
    setShowCongratulationsModal(true);
  };

  // Enhanced navigation logic for onboarding flows
  const handleOnboardingNavigation = (targetPage) => {
    // Handle special navigation cases
    switch (targetPage) {
      case 'onboardingCreatorStep2':
        setCurrentPage('onboardingCreatorStep2');
        break;
      case 'onboardingCreatorStep3':
        setCurrentPage('onboardingCreatorStep3');
        break;
      case 'onboardingTrainerStep2':
        setCurrentPage('onboardingTrainerStep2');
        break;
      case 'finish':
        setCurrentPage('profile');
        break;
      case 'showWelcome':
        setShowWelcomeModal(true);
        break;
      case 'onboardingCreator':
        setCurrentPage('onboardingCreator');
        break;
      case 'onboardingTrainer':
        setCurrentPage('onboardingTrainer');
        break;
      case 'toggleToCreator':
        setAccountType('Creator');
        setCurrentPage('onboardingCreator');
        break;
      case 'toggleToTrainer':
        setAccountType('Trainer');
        setCurrentPage('onboardingTrainer');
        break;
      default:
        setCurrentPage(targetPage);
    }
  };

  // Page components mapping
  const Authpages = {
    createAccount: (
      <CreateAccountPage
        accountType={accountType}
        onNavigate={navigateToPage}
      />
    ),
    otp: (
      <OTPPage
        accountType={accountType}
        onNavigate={navigateToPage}
      />
    ),
    login: (
      <LoginPage
        accountType={accountType}
        onNavigate={(page) => {
          // After login, redirect to appropriate onboarding
          if (page === 'profile') {
            if (accountType === 'Creator') {
              setCurrentPage('onboardingCreator');
            } else {
              setCurrentPage('onboardingTrainer');
            }
          } else {
            navigateToPage(page);
          }
        }}
      />
    ),
    profile: (
      <ProfilePage
        accountType={accountType}
        onNavigate={navigateToPage}
      />
    ),
    reset: (
      <ResetPasswordPage
        accountType={accountType}
        onNavigate={navigateToPage}
      />
    ),
    changePassword: (
      <ChangePasswordPage
        accountType={accountType}
        onNavigate={navigateToPage}
      />
    ),
    onboardingCreator: (
      <OnboardingCreator
        accountType={accountType}
        onNavigate={handleOnboardingNavigation}
      />
    ),
    onboardingCreatorStep2: (
      <OnboardingCreatorStep2
        accountType={accountType}
        onNavigate={handleOnboardingNavigation}
      />
    ),
    onboardingCreatorStep3: (
      <OnboardingCreatorStep3
        accountType={accountType}
        onNavigate={handleOnboardingNavigation}
      />
    ),
    onboardingTrainer: (
      <OnboardingTrainer
        accountType={accountType}
        onNavigate={handleOnboardingNavigation}
      />
    ),
    onboardingTrainerStep2: (
      <OnboardingTrainerStep2
        accountType={accountType}
        onNavigate={handleOnboardingNavigation}
      />
    ),
    creatorDashboard: (
      <CreatorDashboard onNavigate={navigateToPage} />
    ),
    trainerDashboard: (
      <TrainerDashboard onNavigate={navigateToPage} />
    ),
    // creatorNewProperty: (
    //   <CreatorNewProperty />
    // ),
    // Make sure both keys point to the same TrainersPage component
    // trainerList: (
    //   <TrainersPage onNavigate={navigateToPage} />
    // ),
    // trainers: (
    //   <TrainersPage onNavigate={navigateToPage} />
    // ),
    // trainerListAvailable: (
    //   <TrainerListSimple />
    // ),
    // trainerListDemo: (
    //   <CreatePropertyFormDemo />
    // ),
    // allProperties: (
    //   <AllPropertiesPage
    //     onNavigate={navigateToPage}
    //   />
    // ),
    // assignProperty: (
    //   <AssignPropertyPage />
    // )
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Shared Header Component */}
        <Header
          accountType={accountType}
          onToggle={toggleAccountType}
        />

        {/* Demo Navigation Controls */}
        {/* <DemoNavigation
          currentPage={currentPage}
          onNavigate={navigateToPage}
          pages={Authpages}
          onShowWelcome={showWelcomeModalHandler}
          onShowCongratulations={showCongratulationsModalHandler}
        /> */}

        {/* Current Page Content */}
        {Authpages[currentPage]}

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={showWelcomeModal}
          onClose={() => setShowWelcomeModal(false)}
          onGetStarted={handleWelcomeGetStarted}
          accountType={accountType.toLowerCase()}
        />

        {/* Congratulations Modal */}
        <CongratulationsModal
          isOpen={showCongratulationsModal}
          onClose={() => setShowCongratulationsModal(false)}
          onStartOnboarding={handleCongratulationsStartOnboarding}
          accountType={accountType.toLowerCase()}
        />
      </div>
    </Router>
  );
};

export default App;
