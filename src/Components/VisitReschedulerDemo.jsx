import React, { useState } from 'react';
import { VisitRescheduler, VisitReschedulerScreen } from './TrainerDashboard/VisitScheduler';

const VisitReschedulerDemo = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showComponent, setShowComponent] = useState(false);

  const mockVisitData = {
    id: 1,
    date: '17/06/2025',
    visitType: 'Day',
    time: '10:00',
    notes: 'The Lowe offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. '
  };

  const mockPropertyData = {
    name: 'Prime Estate',
    address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
    distance: '4 KM away',
    image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/acad46bb8776960d4ce3e6d1a891f26949292547?placeholderIfAbsent=true'
  };

  const handleSave = (updatedVisitData) => {
    console.log('Visit rescheduled:', updatedVisitData);
    alert('Visit rescheduled successfully!');
    setShowComponent(false);
    setShowFullScreen(false);
  };

  const handleCancel = () => {
    setShowComponent(false);
    setShowFullScreen(false);
  };

  if (showFullScreen) {
    return (
      <VisitReschedulerScreen
        visitData={mockVisitData}
        propertyData={mockPropertyData}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  if (showComponent) {
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <VisitRescheduler
          visitData={mockVisitData}
          propertyData={mockPropertyData}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Visit Rescheduler Demo</h1>
      <p>Choose how you want to view the Visit Rescheduler component:</p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <button
          onClick={() => setShowComponent(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2B2D42',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          View Component Only
        </button>
        
        <button
          onClick={() => setShowFullScreen(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#EF233C',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          View Full Screen Design
        </button>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'left', maxWidth: '600px', margin: '40px auto' }}>
        <h3>Component Features:</h3>
        <ul>
          <li>✅ Pre-populated form with existing visit data</li>
          <li>✅ Date validation (future dates only)</li>
          <li>✅ Visit type selection (Day/Night)</li>
          <li>✅ Time input with HH:MM format</li>
          <li>✅ Additional notes textarea</li>
          <li>✅ Loading states and error handling</li>
          <li>✅ Responsive design for mobile and desktop</li>
          <li>✅ Accessibility features (ARIA labels, keyboard navigation)</li>
          <li>✅ Integration with trainer dashboard</li>
          <li>✅ Full screen design matching provided mockup</li>
        </ul>
      </div>
    </div>
  );
};

export default VisitReschedulerDemo;
