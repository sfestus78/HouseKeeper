import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreatorDashboard from '../CreatorDashboard/CreatorDashboard';
import TrainerDashboard from '../TrainerDashboard/TrainerDashboard';
import { TrainBot } from '../TrainerDashboard/TrainBot';
import './UnifiedDashboard.css';

const UnifiedDashboard = () => {
  const [accountType, setAccountType] = useState('creator'); // 'creator' or 'trainer'
  const [showTrainBot, setShowTrainBot] = useState(false);
  const [selectedPropertyForBot, setSelectedPropertyForBot] = useState(null);

  // Handle account type toggle
  const handleAccountTypeToggle = () => {
    setAccountType(prev => prev === 'creator' ? 'trainer' : 'creator');
    // Reset TrainBot view when switching account types
    setShowTrainBot(false);
    setSelectedPropertyForBot(null);
  };

  // Handle opening TrainBot from PropertyDetailsAfterAcceptance
  const handleStartBotTraining = (property) => {
    setSelectedPropertyForBot(property);
    setShowTrainBot(true);
  };

  // Handle closing TrainBot and returning to dashboard
  const handleCloseTrainBot = () => {
    setShowTrainBot(false);
    setSelectedPropertyForBot(null);
  };

  // Enhanced navigation handler for both dashboards
  const handleNavigate = (destination, data = null) => {
    switch (destination) {
      case 'trainBot':
        setShowTrainBot(true);
        if (data) {
          setSelectedPropertyForBot(data);
        }
        break;
      case 'closeBotTraining':
        handleCloseTrainBot();
        break;
      case 'switchToCreator':
        setAccountType('creator');
        setShowTrainBot(false);
        setSelectedPropertyForBot(null);
        break;
      case 'switchToTrainer':
        setAccountType('trainer');
        setShowTrainBot(false);
        setSelectedPropertyForBot(null);
        break;
      default:
        // Handle other navigation cases
        break;
    }
  };

  // Clone the dashboard components with additional props
  const renderCurrentDashboard = () => {
    const dashboardProps = {
      onNavigate: handleNavigate,
      onStartBotTraining: handleStartBotTraining,
      accountType: accountType,
      onAccountTypeToggle: handleAccountTypeToggle
    };

    if (accountType === 'creator') {
      return React.cloneElement(<CreatorDashboard />, dashboardProps);
    } else {
      return React.cloneElement(<TrainerDashboard />, dashboardProps);
    }
  };

  return (
    <div className="unified-dashboard-container">
      {showTrainBot ? (
        <div className="unified-dashboard-trainbot-overlay">
          <TrainBot
            selectedPropertyForBot={selectedPropertyForBot}
            onClose={handleCloseTrainBot}
            onBack={handleCloseTrainBot}
          />
        </div>
      ) : (
        <div className="unified-dashboard-content">
          {renderCurrentDashboard()}
        </div>
      )}
    </div>
  );
};

export default UnifiedDashboard;
