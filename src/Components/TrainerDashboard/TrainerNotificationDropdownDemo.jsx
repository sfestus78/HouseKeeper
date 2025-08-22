import React, { useState } from 'react';
import { BellIcon } from 'lucide-react';
import TrainerNotificationDropdown from './TrainerNotificationDropdown';
import './TrainerDashboard.css';

const TrainerNotificationDropdownDemo = () => {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(prev => !prev);
  };

  const closeNotificationDropdown = () => {
    setShowNotificationDropdown(false);
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Lato, -apple-system, Roboto, Helvetica, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f9f8fc'
    }}>
      <h1>Trainer Notification Dropdown Demo</h1>
      
      <div style={{ 
        position: 'relative', 
        display: 'inline-block',
        marginTop: '20px'
      }}>
        <div 
          className="trainerDashboardnew-notifications"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="trainerDashboardnew-notification-dot"
            onClick={toggleNotificationDropdown}
            style={{ cursor: 'pointer' }}
          >
            <BellIcon size={20} />
          </div>
          <TrainerNotificationDropdown 
            isVisible={showNotificationDropdown}
            onClose={closeNotificationDropdown}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '40px' }}>
        <h2>Instructions:</h2>
        <ul>
          <li>Click the bell icon to toggle the notifications dropdown</li>
          <li>Use the tabs (All, Unread, Read) to filter notifications</li>
          <li>Click "Mark all as read" to mark all notifications as read</li>
          <li>Click on individual notifications to mark them as read</li>
          <li>Click "View all" to see all notifications</li>
        </ul>
      </div>
    </div>
  );
};

export default TrainerNotificationDropdownDemo;
