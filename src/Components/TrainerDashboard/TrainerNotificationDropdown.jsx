import React, { useState } from 'react';
import './TrainerNotificationDropdown.css';

const TrainerNotificationDropdown = ({ isVisible, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      userImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/e3ad368fd93d0065359bd1d4a2572df1a0952665?placeholderIfAbsent=true',
      userName: 'Lois Lane',
      action: 'accepted',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/af2c36a5b9beaffb31f20e9a6006e0665434031b?placeholderIfAbsent=true',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      isRead: false,
      category: 'Today'
    },
    {
      id: 2,
      userImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/a51b37d15904bf91eb33915995554e5fe52045a5?placeholderIfAbsent=true',
      userName: 'Alan Carrington',
      action: 'completed',
      actionType: 'bot training for',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/4418e37139e571ecaaa570920894b0be530020be?placeholderIfAbsent=true',
      time: 'Monday, 1:40 PM',
      timeAgo: '2 hours ago',
      isRead: false,
      category: 'Today'
    },
    {
      id: 3,
      userImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true',
      actionText: 'Property listing complete for',
      property: 'Prime Estate',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      isRead: false,
      category: 'Yesterday'
    },
    {
      id: 4,
      userImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/adf9173bf636621bc4232ab26dca53c1aa4d4186?placeholderIfAbsent=true',
      userName: 'Natasha Romanoff',
      action: 'accepted',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/6dd052ebd884e711e87632f406a06977ad26641b?placeholderIfAbsent=true',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      isRead: true,
      category: 'Yesterday'
    },
    {
      id: 5,
      userImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true',
      actionText: 'Property listing complete for',
      property: 'Prime Estate',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      isRead: true,
      category: 'Yesterday'
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleNotificationClick = (notification) => {
    // Mark as read when clicked
    setNotifications(prev => 
      prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
    );
    
    // Navigate to relevant screen based on notification type
    if (notification.action === 'accepted') {
      // Navigate to assignment details
      console.log('Navigate to assignment details');
    } else if (notification.actionType === 'bot training for') {
      // Navigate to bot training progress
      console.log('Navigate to bot training progress');
    } else if (notification.actionText?.includes('Property listing')) {
      // Navigate to property listing
      console.log('Navigate to property listing');
    }
  };

  const getFilteredNotifications = () => {
    switch (activeFilter) {
      case 'Unread':
        return notifications.filter(n => !n.isRead);
      case 'Read':
        return notifications.filter(n => n.isRead);
      default:
        return notifications;
    }
  };

  const groupNotificationsByCategory = () => {
    const filtered = getFilteredNotifications();
    const grouped = {};
    
    filtered.forEach(notification => {
      if (!grouped[notification.category]) {
        grouped[notification.category] = [];
      }
      grouped[notification.category].push(notification);
    });
    
    return grouped;
  };

  const renderNotificationMessage = (notification) => {
    if (notification.actionText) {
      return (
        <div className="TrainerNotification-message">
          <span className="TrainerNotification-action-text">Property listing </span>
          <span className="TrainerNotification-action-complete">complete</span>
          <span className="TrainerNotification-action-text"> for</span>
          <span className="TrainerNotification-property-name">{notification.property}</span>
        </div>
      );
    }

    return (
      <div className="TrainerNotification-message">
        <span className="TrainerNotification-user-name">{notification.userName}</span>
        <span className="TrainerNotification-action-text"> </span>
        <span className="TrainerNotification-action-highlight">{notification.action}</span>
        <span className="TrainerNotification-action-text"> {notification.actionType || 'assignment to'}</span>
        <span className="TrainerNotification-property-name">{notification.property}</span>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="TrainerNotification-container">
      <div className="TrainerNotification-dropdown" onClick={(e) => e.stopPropagation()}>
        <div className="TrainerNotification-header">
          <div className="TrainerNotification-title">
            <span>Notifications</span>
          </div>
          <button className="TrainerNotification-markAll" onClick={handleMarkAllAsRead}>
            <div className="TrainerNotification-markAll-icon"></div>
            <span>Mark all as read</span>
          </button>
        </div>
        
        <div className="TrainerNotification-divider"></div>
        
        <div className="TrainerNotification-tabs">
          {['All', 'Unread', 'Read'].map(filter => (
            <button
              key={filter}
              className={`TrainerNotification-tab ${activeFilter === filter ? 'TrainerNotification-tab-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="TrainerNotification-content">
          {Object.entries(groupNotificationsByCategory()).map(([category, categoryNotifications]) => (
            <div key={category} className="TrainerNotification-category">
              <div className="TrainerNotification-category-title">{category}</div>
              
              {categoryNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`TrainerNotification-item ${notification.isRead ? 'TrainerNotification-read' : 'TrainerNotification-unread'}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="TrainerNotification-item-main">
                    <div className="TrainerNotification-content-wrapper">
                      <img 
                        src={notification.userImage} 
                        alt="User"
                        className="TrainerNotification-avatar"
                      />
                      <div className="TrainerNotification-details">
                        {renderNotificationMessage(notification)}
                        <div className="TrainerNotification-time">
                          <span className="TrainerNotification-time-absolute">{notification.time}</span>
                          <span className="TrainerNotification-time-relative">{notification.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    {notification.propertyImage && (
                      <img 
                        src={notification.propertyImage} 
                        alt="Property"
                        className="TrainerNotification-propertyThumb"
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {category !== Object.keys(groupNotificationsByCategory()).slice(-1)[0] && (
                <div className="TrainerNotification-divider"></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="TrainerNotification-divider"></div>
        
        <button className="TrainerNotification-viewAll">
          View all
        </button>
      </div>
    </div>
  );
};

export default TrainerNotificationDropdown;
