import React, { useState } from 'react';
import { Check } from 'lucide-react';
import './Notifications.css';

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      date: 'Today',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      type: 'acceptance',
      user: 'Lois Lane',
      userAvatar: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/e3ad368fd93d0065359bd1d4a2572df1a0952665?placeholderIfAbsent=true',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/af2c36a5b9beaffb31f20e9a6006e0665434031b?placeholderIfAbsent=true',
      action: 'accepted',
      actionText: 'assignment to',
      isRead: false
    },
    {
      id: 2,
      date: 'Today',
      time: 'Monday, 1:40 PM',
      timeAgo: '2 hours ago',
      type: 'completion',
      user: 'Alan Carrington',
      userAvatar: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/a51b37d15904bf91eb33915995554e5fe52045a5?placeholderIfAbsent=true',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/4418e37139e571ecaaa570920894b0be530020be?placeholderIfAbsent=true',
      action: 'completed',
      actionText: 'bot training for',
      isRead: false
    },
    {
      id: 3,
      date: 'Yesterday',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      type: 'listing',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true',
      message: 'Property listing complete for',
      isRead: true
    },
    {
      id: 4,
      date: 'Yesterday',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      type: 'acceptance',
      user: 'Natasha Romanoff',
      userAvatar: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/adf9173bf636621bc4232ab26dca53c1aa4d4186?placeholderIfAbsent=true',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/6dd052ebd884e711e87632f406a06977ad26641b?placeholderIfAbsent=true',
      action: 'accepted',
      actionText: 'assignment to',
      isRead: true
    },
    {
      id: 5,
      date: 'Yesterday',
      time: 'Monday, 2:00 PM',
      timeAgo: '2 hours ago',
      type: 'listing',
      property: 'Prime Estate',
      propertyImage: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true',
      message: 'Property listing complete for',
      isRead: true
    }
  ];

  const filterNotifications = (notifications, filter) => {
    switch (filter) {
      case 'unread':
        return notifications.filter(n => !n.isRead);
      case 'read':
        return notifications.filter(n => n.isRead);
      default:
        return notifications;
    }
  };

  const groupedNotifications = filterNotifications(notifications, activeFilter).reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  const handleMarkAllAsRead = () => {
    console.log('Mark all notifications as read');
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const renderNotification = (notification) => {
    if (notification.type === 'listing') {
      return (
        <div key={notification.id} className="notifications-item">
          <div className="notifications-content">
            <img
              src={notification.propertyImage}
              alt="Property"
              className="notifications-property-image-large"
            />
            <div className="notifications-details">
              <div className="notifications-message">
                <span className="notifications-text-grey">Property listing</span>{' '}
                <span className="notifications-text-green">complete</span>{' '}
                <span className="notifications-text-grey">for</span>{' '}
                <span className="notifications-text-bold">{notification.property}</span>
              </div>
              <div className="notifications-timestamp">
                <span className="notifications-time">{notification.time}</span>
                <span className="notifications-time-ago">{notification.timeAgo}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={notification.id} className="notifications-item">
        <div className="notifications-content">
          <img
            src={notification.userAvatar}
            alt={notification.user}
            className="notifications-user-avatar"
          />
          <div className="notifications-details">
            <div className="notifications-message">
              <span className="notifications-text-bold">{notification.user}</span>{' '}
              <span className="notifications-text-green">{notification.action}</span>{' '}
              <span className="notifications-text-grey">{notification.actionText}</span>{' '}
              <span className="notifications-text-bold">{notification.property}</span>
            </div>
            <div className="notifications-timestamp">
              <span className="notifications-time">{notification.time}</span>
              <span className="notifications-time-ago">{notification.timeAgo}</span>
            </div>
          </div>
          <img
            src={notification.propertyImage}
            alt="Property"
            className="notifications-property-image"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="notifications-container">
      <div className="notifications-card">
        <div className="notifications-header">
          <div className="notifications-title-section">
            <h2 className="notifications-title">Notifications</h2>
          </div>
          <button className="notifications-mark-read" onClick={handleMarkAllAsRead}>
            <Check size={24} />
            <span>Mark all as read</span>
          </button>
        </div>

        <div className="notifications-divider"></div>

        <div className="notifications-filters">
          <button
            className={`notifications-filter ${activeFilter === 'all' ? 'notifications-filter-active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`notifications-filter ${activeFilter === 'unread' ? 'notifications-filter-active' : ''}`}
            onClick={() => handleFilterChange('unread')}
          >
            Unread
          </button>
          <button
            className={`notifications-filter ${activeFilter === 'read' ? 'notifications-filter-active' : ''}`}
            onClick={() => handleFilterChange('read')}
          >
            Read
          </button>
        </div>

        <div className="notifications-list">
          {Object.entries(groupedNotifications).map(([date, notifications], index) => (
            <div key={date} className="notifications-date-group">
              <div className="notifications-date-label">{date}</div>
              <div className="notifications-date-items">
                {notifications.map(renderNotification)}
              </div>
              {index < Object.entries(groupedNotifications).length - 1 && (
                <div className="notifications-divider"></div>
              )}
            </div>
          ))}
        </div>

        <div className="notifications-divider"></div>

        <button className="notifications-view-all">
          View all
        </button>
      </div>
    </div>
  );
};

export default Notifications;
