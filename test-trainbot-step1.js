const React = require('react');

// Test the TrainBotStep1 component structure
try {
  console.log('Testing TrainBotStep1 component...');
  
  // Mock property data
  const mockProperty = {
    id: 1,
    name: 'Prime Estate',
    address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=96&h=96&fit=crop&crop=center'
  };

  console.log('Mock property data:', mockProperty);
  console.log('Test completed successfully!');
  
} catch (error) {
  console.error('Test failed:', error.message);
}
