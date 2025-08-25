import React, { useState, useEffect } from 'react'; // ADDED: useEffect import
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
import SettingsPageDemo from './Components/SettingsPageDemo';

import './Components/Authshared/generalstyles.css';
import TrainerDashboard from './Components/TrainerDashboard/TrainerDashboard';
import TrainerNotificationDropdownDemo from './Components/TrainerDashboard/TrainerNotificationDropdownDemo';
import Notifications from './Components/Notifications/Notifications';
import ErrorPage from './Components/ErrorPage/ErrorPage';

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
           page === 'settings' ? 'Settings' :
           page === 'errorPage' ? 'Error Page' :
           page.charAt(0).toUpperCase() + page.slice(1)}
        </button>
      ))}
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [accountType, setAccountType] = useState('Creator');
  const [currentPage, setCurrentPage] = useState('login');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);

  // Track onboarding completion status
  const [onboardingStatus, setOnboardingStatus] = useState({
    creator: {
      step1: false,
      step2: false,
      step3: false,
      completed: false
    },
    trainer: {
      step1: false,
      step2: false,
      completed: false
    }
  });

  // ADDED: Load onboarding status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('onboardingStatus');
    if (savedStatus) {
      setOnboardingStatus(JSON.parse(savedStatus));
    }
  }, []);

  // ADDED: Save onboarding status to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('onboardingStatus', JSON.stringify(onboardingStatus));
  }, [onboardingStatus]);

  // Helper functions to determine which dashboard based on acct type and onboarding status
  const getDashboardForAccountType = () => {
    const type = accountType.toLowerCase();
    const status = onboardingStatus[type];
    
    if (type === 'creator') {
      return status.completed ? 'creatorDashboard' : 'onboardingCreator';
    } else if (type === 'trainer') {
      return status.completed ? 'trainerDashboard' : 'onboardingTrainer';
    }
    return 'login'; //fallback
  };

  //check if user should be redirected to onboarding
  const shouldRedirectToOnboarding = () => {
    const type = accountType.toLowerCase();
    const status = onboardingStatus[type];
    return !status.completed;
  }

  const toggleAccountType = () => {
    setAccountType(prev => prev === 'Creator' ? 'Trainer' : 'Creator');
  };

  const navigateToPage = (page) => {
    if (page === 'showCongratulations') {
      setShowCongratulationsModal(true);
    } else if (page === 'profile' || page === 'dashboard') {
      //redirect to appropriate page based on onboarding status
      const targetPage = getDashboardForAccountType();
      setCurrentPage(targetPage);
    } else {
      // Auto-set accountType when navigating to specific dashboards
      if (page === 'trainerDashboard') {
        setAccountType('Trainer');
      } else if (page === 'creatorDashboard') {
        setAccountType('Creator');
      }
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

  // FIXED: Handle Welcome Modal flow - after onboarding is complete
  const handleWelcomeGetStarted = () => {
    setShowWelcomeModal(false);
    // Navigate to appropriate dashboard after onboarding completion
    const targetPage = getDashboardForAccountType();
    setCurrentPage(targetPage); // FIXED: Removed quotes around targetPage
  };

  const showWelcomeModalHandler = () => {
    setShowWelcomeModal(true);
  };

  const showCongratulationsModalHandler = () => {
    setShowCongratulationsModal(true);
  };

  // ADDED: Reset onboarding status function
  const resetOnboarding = () => {
    setOnboardingStatus({
      creator: {
        step1: false,
        step2: false,
        step3: false,
        completed: false
      },
      trainer: {
        step1: false,
        step2: false,
        completed: false
      }
    });
    setCurrentPage('login');
    localStorage.removeItem('onboardingStatus');
  };

  // Enhanced navigation logic for onboarding flows
  const handleOnboardingNavigation = (targetPage, stepCompleted = null) => {
    // Update onboarding status if a step was completed
    if (stepCompleted) {
      setOnboardingStatus(prev => {
        const type = accountType.toLowerCase();
        return {
          ...prev,
          [type]: {
            ...prev[type],
            [stepCompleted]: true
          }
        };
      });
    }

    // Handle navigation targets
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
        // Mark onboarding as completed and show welcome modal
        setOnboardingStatus(prev => {
          const type = accountType.toLowerCase();
          return {
            ...prev,
            [type]: {
              ...prev[type],
              completed: true
            }
          };
        });
        // Show welcome modal instead of going directly to dashboard
        setShowWelcomeModal(true);
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
          if (page === 'profile' || page === 'dashboard') {
            // After login, check onboarding status and redirect accordingly
            if (shouldRedirectToOnboarding()) {
              // Redirect to first onboarding step
              const firstOnboardingStep = accountType === 'Creator' 
                ? 'onboardingCreator' 
                : 'onboardingTrainer';
              setCurrentPage(firstOnboardingStep);
            } else {
              // Redirect to appropriate dashboard
              const targetPage = getDashboardForAccountType();
              setCurrentPage(targetPage);
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
        onNavigate={(targetPage) => handleOnboardingNavigation(targetPage, 'step1')}
      />
    ),
    onboardingCreatorStep2: (
      <OnboardingCreatorStep2
        accountType={accountType}
        onNavigate={(targetPage) => handleOnboardingNavigation(targetPage, 'step2')}
      />
    ),
    onboardingCreatorStep3: (
      <OnboardingCreatorStep3
        accountType={accountType}
        onNavigate={(targetPage) => handleOnboardingNavigation(targetPage, 'step3')}
      />
    ),
    onboardingTrainer: (
      <OnboardingTrainer
        accountType={accountType}
        onNavigate={(targetPage) => handleOnboardingNavigation(targetPage, 'step1')}
      />
    ),
    onboardingTrainerStep2: (
      <OnboardingTrainerStep2
        accountType={accountType}
        onNavigate={(targetPage) => handleOnboardingNavigation(targetPage, 'step2')}
      />
    ),
    creatorDashboard: (
      <CreatorDashboard onNavigate={navigateToPage} />
    ),
    trainerDashboard: (
      <TrainerDashboard
        onNavigate={navigateToPage}
        accountType={accountType.toLowerCase()}
        onAccountTypeToggle={toggleAccountType}
        onStartBotTraining={() => console.log('Starting bot training')}
      />
    ),
    settings: (
      <SettingsPageDemo />
    ),
    errorPage: (
      <ErrorPage onNavigate={navigateToPage} />
    ),
    // ... other commented out components
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
          onResetOnboarding={resetOnboarding} // ADDED: Reset onboarding handler
        /> */}

        {/* Current Page Content */}
        {Authpages[currentPage] || <ErrorPage onNavigate={navigateToPage} message={`Unknown page: ${currentPage}`} />}

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
