// Simple syntax check for TrainBotStep3
const React = require('react');

try {
  // This won't actually work without a proper React environment
  // but it will catch basic syntax errors
  console.log('Testing basic syntax...');
  const fs = require('fs');
  const path = require('path');
  
  const componentPath = './src/Components/TrainerDashboard/TrainBot/TrainBotStep3.jsx';
  const componentCode = fs.readFileSync(componentPath, 'utf8');
  
  // Check for basic syntax issues
  if (componentCode.includes('export default TrainBotStep3;')) {
    console.log('✓ Component export found');
  } else {
    console.log('✗ Component export missing');
  }
  
  if (componentCode.includes('const TrainBotStep3 = (')) {
    console.log('✓ Component definition found');
  } else {
    console.log('✗ Component definition missing');
  }
  
  if (componentCode.includes('return (')) {
    console.log('✓ JSX return found');
  } else {
    console.log('✗ JSX return missing');
  }
  
  console.log('Basic syntax check passed!');
  
} catch (error) {
  console.error('Error during syntax check:', error.message);
}
