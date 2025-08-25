import React, { useState } from 'react';
import { HelpCenter, ContactPage, FeedbackPage } from './index';

const HelpCenterDemo = () => {
  const [currentPage, setCurrentPage] = useState('help');

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('help');
  };

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'help':
        return <HelpCenter onNavigate={handleNavigate} />;
      case 'helpCenterContact':
        return <ContactPage onBack={handleBack} />;
      case 'helpCenterFeedback':
        return <FeedbackPage onBack={handleBack} />;
      default:
        return <HelpCenter onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {renderCurrentPage()}
    </div>
  );
};

export default HelpCenterDemo;
