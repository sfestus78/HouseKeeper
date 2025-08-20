import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './TrainBot.css';
import TrainBotStep1 from './TrainBotStep1';
import TrainBotStep2 from './TrainBotStep2';
import TrainBotStep3 from './TrainBotStep3';
import TrainBotStep4 from './TrainBotStep4';

const TrainBot = () => {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedFromGrid, setSelectedFromGrid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('selection'); // 'selection', 'step1', 'step2', 'step3', 'step4', etc.
  const [selectedPropertyObj, setSelectedPropertyObj] = useState(null);
  const [step1Data, setStep1Data] = useState(null);
  const [step2Data, setStep2Data] = useState(null);
  const [step3Data, setStep3Data] = useState(null);

  // Property data with sample images and addresses
  const properties = [
    {
      id: 1,
      name: 'Prime Estate',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'The Oxford Residences',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'Greenwich Park Apartments',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'The Stratford Apartments',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 5,
      name: 'Cambridge Gardens',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 6,
      name: 'The Chesterfield Lofts',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 7,
      name: 'Somerset House Apartments',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=96&h=96&fit=crop&crop=center'
    },
    {
      id: 8,
      name: 'The Regent Residences',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=96&h=96&fit=crop&crop=center'
    }
  ];

  const handleDropdownSelect = (propertyName) => {
    setSelectedProperty(propertyName);
    // Sync with grid selection
    const property = properties.find(p => p.name === propertyName);
    setSelectedFromGrid(property?.id || null);
  };

  const handleGridSelect = (property) => {
    setSelectedFromGrid(property.id);
    setSelectedProperty(property.name);
    setSelectedPropertyObj(property);
  };

  const handleNext = () => {
    if (!selectedProperty && !selectedFromGrid) {
      alert('Please select a property to continue.');
      return;
    }

    // Get the selected property object
    let propertyObj = selectedPropertyObj;
    if (!propertyObj) {
      propertyObj = properties.find(p => p.name === selectedProperty || p.id === selectedFromGrid);
    }

    if (!propertyObj) {
      alert('Please select a valid property to continue.');
      return;
    }

    setSelectedPropertyObj(propertyObj);
    setCurrentStep('step1');
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  const handleStep1Next = (faqData) => {
    console.log('Step 1 completed with data:', faqData);
    setStep1Data(faqData);
    setCurrentStep('step2');
  };

  const handleStep1Back = () => {
    setCurrentStep('selection');
  };

  const handleStep2Next = (serviceContactsData) => {
    console.log('Step 2 completed with data:', serviceContactsData);
    setStep2Data(serviceContactsData);
    setCurrentStep('step3');
  };

  const handleStep2Back = () => {
    setCurrentStep('step1');
  };

  const handleStep3Next = (questionsData) => {
    console.log('Step 3 completed with data:', questionsData);
    setStep3Data(questionsData);
    setCurrentStep('step4');
  };

  const handleStep3Back = () => {
    setCurrentStep('step2');
  };

  const handleStep4Next = (documentsData) => {
    console.log('Step 4 completed with data:', documentsData);
    // The modal will handle the training process completion
    // This function can be used for any additional logic after training
  };

  const handleStep4Back = () => {
    setCurrentStep('step3');
  };

  // Render Step 1 if we're in that step
  if (currentStep === 'step1') {
    return (
      <TrainBotStep1
        selectedProperty={selectedPropertyObj}
        onNext={handleStep1Next}
        onChangeProperty={handleBackToSelection}
      />
    );
  }

  // Render Step 2 if we're in that step
  if (currentStep === 'step2') {
    return (
      <TrainBotStep2
        selectedProperty={selectedPropertyObj}
        onNext={handleStep2Next}
        onBack={handleStep2Back}
        onChangeProperty={handleBackToSelection}
      />
    );
  }

  // Render Step 3 if we're in that step
  if (currentStep === 'step3') {
    return (
      <TrainBotStep3
        selectedProperty={selectedPropertyObj}
        onNext={handleStep3Next}
        onBack={handleStep3Back}
        onChangeProperty={handleBackToSelection}
      />
    );
  }

  // Render Step 4 if we're in that step
  if (currentStep === 'step4') {
    return (
      <TrainBotStep4
        selectedProperty={selectedPropertyObj}
        onNext={handleStep4Next}
        onBack={handleStep4Back}
        onChangeProperty={handleBackToSelection}
      />
    );
  }

  // Render property selection screen (default)
  return (
    <div className="trainbot-container">
      {/* Header Section */}
      <div className="trainbot-header">
        <h1 className="trainbot-title">Bot Training</h1>
        <p className="trainbot-subtitle">Select a property and train its bot.</p>
      </div>

      {/* Property Selection Section */}
      <div className="trainbot-section">
        <div className="trainbot-section-header">
          <h2 className="trainbot-section-title">Choose Property</h2>
        </div>
        
        <div className="trainbot-section-divider" />

        <div className="trainbot-form-section">
          <label className="trainbot-label">Select Property:</label>
          
          <div className="trainbot-dropdown-container">
            <div className="trainbot-dropdown">
              <input
                type="text"
                value={selectedProperty}
                placeholder="Prime Estate"
                readOnly
                className="trainbot-dropdown-input"
                onClick={() => {
                  // Simple dropdown implementation - in real app you'd use a proper dropdown
                  const firstProperty = properties[0].name;
                  handleDropdownSelect(firstProperty);
                }}
              />
              <ChevronDown size={20} className="trainbot-dropdown-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid Section */}
      <div className="trainbot-section">
        <div className="trainbot-section-text">
          <span className="trainbot-section-text-normal">Or Pick from your list of </span>
          <span className="trainbot-section-text-highlight">Assigned Properties</span>
        </div>

        <div className="trainbot-properties-grid">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`trainbot-property-card ${
                selectedFromGrid === property.id ? 'trainbot-property-card-selected' : ''
              }`}
            >
              <div className="trainbot-property-content">
                <div className="trainbot-property-info">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="trainbot-property-image"
                  />
                  <div className="trainbot-property-details">
                    <h3 className="trainbot-property-name">{property.name}</h3>
                    <p className="trainbot-property-address">{property.address}</p>
                  </div>
                </div>
                
                <button
                  className="trainbot-select-button"
                  onClick={() => handleGridSelect(property)}
                >
                  Select Property
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Section */}
      <div className="trainbot-navigation">
        <button
          className="trainbot-next-button"
          onClick={handleNext}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default TrainBot;
