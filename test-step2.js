const React = require('react');

// Simple test to see if the component file loads
try {
  console.log('Testing TrainBotStep2 component...');
  // We can't actually import JSX in Node.js without Babel, but we can check file existence
  const fs = require('fs');
  const path = './src/Components/TrainerDashboard/TrainBot/TrainBotStep2.jsx';
  if (fs.existsSync(path)) {
    console.log('✓ TrainBotStep2.jsx file exists');
    const content = fs.readFileSync(path, 'utf8');
    // Basic syntax checks
    if (content.includes('export default TrainBotStep2')) {
      console.log('✓ Component exports correctly');
    } else {
      console.log('✗ Component export not found');
    }
    if (content.includes('const TrainBotStep2 = ')) {
      console.log('✓ Component definition found');
    } else {
      console.log('✗ Component definition not found');
    }
  } else {
    console.log('✗ TrainBotStep2.jsx file not found');
  }
} catch (error) {
  console.error('Error:', error.message);
}
