import React from 'react';
import PropertyAssignmentNotification from './PropertyAssignmentNotification';

const PropertyAssignmentNotificationDemo = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Lato, -apple-system, Roboto, Helvetica, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      <h1 style={{ 
        marginBottom: '20px', 
        color: '#2b2d42',
        textAlign: 'center' 
      }}>
        Property Assignment Notification Demo
      </h1>
      <p style={{ 
        marginBottom: '30px', 
        color: '#6b7280',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto 30px'
      }}>
        This demo shows the Property Assignment Notification component with the new confirmation modal. 
        Try clicking Accept or Reject to see the confirmation dialog in action.
      </p>
      <PropertyAssignmentNotification />
    </div>
  );
};

export default PropertyAssignmentNotificationDemo;
