import React from 'react';
import './AccountStatusPill.css';

const AccountStatusPill = ({ accountType, text }) => {
  const displayText = text || (accountType === 'trainer' ? 'Trainer Onboarding' : 'Creator Onboarding');
  
  return (
    <div className="accountStatus-content-section">
      <div className="accountStatus-pill">
        <div className="accountStatus-pill-dot" />
        <div className="accountStatus-pill-text">
          {displayText}
        </div>
      </div>
    </div>
  );
};

export default AccountStatusPill;

