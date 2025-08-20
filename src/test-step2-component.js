// Simple test file to verify TrainBotStep2 loads correctly
import React from 'react';
import TrainBotStep2 from './Components/TrainerDashboard/TrainBot/TrainBotStep2';

const TestComponent = () => {
  const mockProperty = {
    id: 1,
    name: 'Test Property',
    address: 'Test Address',
    image: 'https://via.placeholder.com/100'
  };

  return (
    <div>
      <h1>Testing TrainBotStep2</h1>
      <TrainBotStep2
        selectedProperty={mockProperty}
        onNext={() => console.log('Next clicked')}
        onBack={() => console.log('Back clicked')}
        onChangeProperty={() => console.log('Change property clicked')}
      />
    </div>
  );
};

export default TestComponent;
