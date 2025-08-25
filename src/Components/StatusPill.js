import React from 'react';
import './StatusPill.css';

const StatusPill = ({ accountType, text }) => {
  const displayText = text || (accountType === 'trainer' ? 'Trainer' : 'Creator');
  
  return (
    <div className="status-pill">
      <div className="status-pill-dot" />
      <div className="status-pill-text">
        {displayText}
      </div>
    </div>
  );
};

export default StatusPill;