import React from 'react';
import { HelpCenter } from './HelpCenter';

const HelpCenterDemo = () => {
  const handleNavigate = (section) => {
    console.log('Navigate to:', section);
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      fontFamily: 'Lato, -apple-system, Roboto, Helvetica, sans-serif'
    }}>
      <HelpCenter onNavigate={handleNavigate} />
    </div>
  );
};

export default HelpCenterDemo;
