import React, { useState } from 'react';
import SettingsPage from './Settings/SettingsPage';

function SettingsPageDemo() {
  const [accountType, setAccountType] = useState('Creator');

  const handleAccountTypeChange = (newType) => {
    setAccountType(newType);
    console.log('Account type changed to:', newType);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <SettingsPage 
        accountType={accountType}
        onAccountTypeChange={handleAccountTypeChange}
      />
    </div>
  );
}

export default SettingsPageDemo;
