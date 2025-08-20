import React, { useState } from 'react';
import './TrainBotStep2.css';

const TrainBotStep2 = ({ selectedProperty, onNext, onBack, onChangeProperty }) => {
  const [activeCategory, setActiveCategory] = useState('Plumber');
  const [serviceContacts, setServiceContacts] = useState({
    Plumber: {
      fullName: '',
      mobileNumber: '',
      email: '',
      servicesProvided: ''
    },
    Electrician: {
      fullName: '',
      mobileNumber: '',
      email: '',
      servicesProvided: ''
    },
    Handyman: {
      fullName: '',
      mobileNumber: '',
      email: '',
      servicesProvided: ''
    },
    Cleaner: {
      fullName: '',
      mobileNumber: '',
      email: '',
      servicesProvided: ''
    },
    Laundry: {
      fullName: '',
      mobileNumber: '',
      email: '',
      servicesProvided: ''
    }
  });
  const [customOccupations, setCustomOccupations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const serviceCategories = [
    { id: 'Plumber', label: 'Plumber', placeholder: 'e.g. Pipe drainage, leak repair...' },
    { id: 'Electrician', label: 'Electrician', placeholder: 'e.g. Wiring, lighting repair...' },
    { id: 'Handyman', label: 'Handyman', placeholder: 'e.g. General repairs, furniture setup...' },
    { id: 'Cleaner', label: 'Cleaner', placeholder: 'e.g. House cleaning, deep cleaning...' },
    { id: 'Laundry', label: 'Laundry', placeholder: 'e.g. Laundry pickup, ironing...' }
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleAddMore = () => {
    const customOccupation = prompt('Enter the occupation:');
    if (customOccupation && customOccupation.trim()) {
      const newOccupation = customOccupation.trim();
      if (!customOccupations.includes(newOccupation) && !serviceCategories.find(cat => cat.id === newOccupation)) {
        setCustomOccupations(prev => [...prev, newOccupation]);
        setServiceContacts(prev => ({
          ...prev,
          [newOccupation]: {
            fullName: '',
            mobileNumber: '',
            email: '',
            servicesProvided: ''
          }
        }));
        setActiveCategory(newOccupation);
      }
    }
  };

  const handleInputChange = (field, value) => {
    setServiceContacts(prev => ({
      ...prev,
      [activeCategory]: {
        ...prev[activeCategory],
        [field]: value
      }
    }));
  };

  const handleSaveDetails = () => {
    const currentData = serviceContacts[activeCategory];
    if (!currentData.fullName.trim()) {
      alert('Please enter the full name.');
      return;
    }
    if (!currentData.mobileNumber.trim()) {
      alert('Please enter the mobile number.');
      return;
    }
    if (!currentData.email.trim()) {
      alert('Please enter the email.');
      return;
    }
    alert(`${activeCategory} contact details saved successfully!`);
  };

  const handleNext = () => {
    // Check if at least one category has data
    const hasAnyData = Object.values(serviceContacts).some(contact => 
      contact.fullName.trim() || contact.mobileNumber.trim() || contact.email.trim() || contact.servicesProvided.trim()
    );

    if (!hasAnyData) {
      alert('Please fill out at least one service contact to continue.');
      return;
    }

    onNext(serviceContacts);
  };

  const getCurrentPlaceholder = () => {
    const category = serviceCategories.find(cat => cat.id === activeCategory);
    return category ? category.placeholder : 'e.g. Services provided...';
  };

  // Calculate progress (based on filled categories)
  const filledCategories = Object.values(serviceContacts).filter(contact =>
    contact.fullName.trim() && contact.mobileNumber.trim() && contact.email.trim()
  ).length;
  const totalCategories = Object.keys(serviceContacts).length;
  const progressPercentage = totalCategories > 0 ? (filledCategories / totalCategories) * 100 : 0;

  if (!selectedProperty) {
    return (
      <div className="trainbotStep2-container">
        <div className="trainbotStep2-error">
          <h2>No Property Selected</h2>
          <p>Please go back and select a property first.</p>
          <button 
            className="trainbotStep2-change-property-btn"
            onClick={onChangeProperty}
          >
            Select Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trainbotStep2-container">
      <div className="trainbotStep2-layout">
        {/* Main Content */}
        <div className="trainbotStep2-main-content">
          {/* Header */}
          <div className="trainbotStep2-header">
            <h1 className="trainbotStep2-title">Bot Training</h1>
            <p className="trainbotStep2-subtitle">Select a property and train it's bot.</p>
          </div>

          {/* Property Section */}
          <div className="trainbotStep2-property-section">
            <div className="trainbotStep2-property-info">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.name}
                className="trainbotStep2-property-image"
              />
              <div className="trainbotStep2-property-details">
                <h2 className="trainbotStep2-property-name">{selectedProperty.name}</h2>
                <p className="trainbotStep2-property-address">{selectedProperty.address}</p>
              </div>
            </div>
            <button 
              className="trainbotStep2-change-property-btn"
              onClick={onChangeProperty}
            >
              Change Property
            </button>
          </div>

          {/* Step 2 Section */}
          <div className="trainbotStep2-step-section">
            <div className="trainbotStep2-step-header">
              <span className="trainbotStep2-step-number">STEP 2: </span>
              <span className="trainbotStep2-step-title">Service Contacts</span>
            </div>

            <div className="trainbotStep2-step-divider" />

            {/* Service Categories */}
            <div className="trainbotStep2-categories">
              {serviceCategories.map((category) => (
                <button
                  key={category.id}
                  className={`trainbotStep2-category-btn ${
                    activeCategory === category.id ? 'trainbotStep2-category-active' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.label}
                </button>
              ))}
              {customOccupations.map((occupation) => (
                <button
                  key={occupation}
                  className={`trainbotStep2-category-btn ${
                    activeCategory === occupation ? 'trainbotStep2-category-active' : ''
                  }`}
                  onClick={() => handleCategoryClick(occupation)}
                >
                  {occupation}
                </button>
              ))}
              <button
                className="trainbotStep2-category-btn trainbotStep2-add-more-btn"
                onClick={handleAddMore}
              >
                Add more
              </button>
            </div>

            {/* Service Contact Form */}
            <div className="trainbotStep2-form-container">
              <div className="trainbotStep2-form">
                <div className="trainbotStep2-input-field">
                  <label className="trainbotStep2-label">Full Name</label>
                  <div className="trainbotStep2-input-container">
                    <input
                      type="text"
                      value={serviceContacts[activeCategory]?.fullName || ''}
                      placeholder="Jonny Smith"
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="trainbotStep2-input"
                    />
                  </div>
                </div>

                <div className="trainbotStep2-input-field">
                  <label className="trainbotStep2-label">Mobile number</label>
                  <div className="trainbotStep2-phone-container">
                    <div className="trainbotStep2-country-dropdown">
                      <span>UK</span>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={serviceContacts[activeCategory]?.mobileNumber || ''}
                      placeholder="+44 (555) 000-0000"
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      className="trainbotStep2-phone-input"
                    />
                  </div>
                </div>

                <div className="trainbotStep2-input-field">
                  <label className="trainbotStep2-label">Email</label>
                  <div className="trainbotStep2-input-container">
                    <input
                      type="email"
                      value={serviceContacts[activeCategory]?.email || ''}
                      placeholder="example@email.com"
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="trainbotStep2-input"
                    />
                  </div>
                </div>

                <div className="trainbotStep2-input-field">
                  <label className="trainbotStep2-label">Services provided</label>
                  <div className="trainbotStep2-input-container">
                    <input
                      type="text"
                      value={serviceContacts[activeCategory]?.servicesProvided || ''}
                      placeholder={getCurrentPlaceholder()}
                      onChange={(e) => handleInputChange('servicesProvided', e.target.value)}
                      className="trainbotStep2-input"
                    />
                  </div>
                </div>

                <button 
                  className="trainbotStep2-save-btn"
                  onClick={handleSaveDetails}
                >
                  Save Details
                </button>
              </div>
            </div>

            {/* Progress and Navigation */}
            <div className="trainbotStep2-progress-section">
              <div className="trainbotStep2-progress-container">
                <div className="trainbotStep2-progress-bar">
                  <div 
                    className="trainbotStep2-progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="trainbotStep2-navigation">
                <button
                  className="trainbotStep2-back-button"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  className="trainbotStep2-next-button"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="trainbotStep2-preview-section">
          <div className="trainbotStep2-preview-container">
            <div className="trainbotStep2-preview-header">
              <img 
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/82c8e37b2141bc82f5953296a20966f4564e2940?placeholderIfAbsent=true"
                alt="Bot Icon"
                className="trainbotStep2-bot-icon"
              />
              <div className="trainbotStep2-preview-info">
                <div className="trainbotStep2-version">Version 2.0</div>
                <div className="trainbotStep2-release-date">Released: 24/09/2024</div>
              </div>
            </div>

            <div className="trainbotStep2-preview-content">
              <img 
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/4807e7f98684571336b2fd4311816d766308f3b8?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className="trainbotStep2-preview-logo"
              />
              
              <div className="trainbotStep2-chat-preview">
                <div className="trainbotStep2-chat-header">
                  <div className="trainbotStep2-status-bar">
                    <span className="trainbotStep2-time">9:41</span>
                    <div className="trainbotStep2-status-icons">
                      <img src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/984260519096b1a3b0b0e800bba0aa3bda0a63e7?placeholderIfAbsent=true" alt="Signal" />
                      <img src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a1b4442a8a6d8301c691cf3c5a61ea33b621df9e?placeholderIfAbsent=true" alt="Battery" />
                    </div>
                  </div>

                  <div className="trainbotStep2-chat-controls">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/b7a37455e137d4e4e3a85e5cf8c4a44ff9f121be?placeholderIfAbsent=true"
                      alt="Back"
                      className="trainbotStep2-back-icon"
                    />
                    <div className="trainbotStep2-font-controls">
                      <button className="trainbotStep2-font-btn">
                        <span className="trainbotStep2-arrow-down">↓</span>
                        <span>Aa</span>
                      </button>
                      <button className="trainbotStep2-font-btn trainbotStep2-font-active">Aa</button>
                      <button className="trainbotStep2-font-btn">
                        <span>Aa</span>
                        <span className="trainbotStep2-arrow-up">↑</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="trainbotStep2-chat-messages">
                  <div className="trainbotStep2-user-message">
                    Where is the key?
                  </div>
                  
                  <div className="trainbotStep2-bot-response">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/9c137d9704db0130424e3d368a693a040ff3d7fa?placeholderIfAbsent=true"
                      alt="Bot Avatar"
                      className="trainbotStep2-bot-avatar"
                    />
                    <div className="trainbotStep2-response-bubble">
                      Welcome!<br/><br/>
                      To retrieve the key, you'll find a key box just outside the front door.<br/><br/>
                      Simply enter the code provided and you'll be able to access the key. Enjoy your stay!
                    </div>
                  </div>

                  <div className="trainbotStep2-suggestion-buttons">
                    <button className="trainbotStep2-suggestion-btn">
                      How do I get food around here?
                    </button>
                    <button className="trainbotStep2-suggestion-btn">
                      What fun activities are nearby?
                    </button>
                  </div>
                </div>

                <div className="trainbotStep2-input-area">
                  <div className="trainbotStep2-message-input">
                    <input type="text" placeholder="Type your message...." />
                  </div>
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/4635bbbbe187aaa2bfbaf1764b67f1fd9e1786d6?placeholderIfAbsent=true"
                    alt="Send"
                    className="trainbotStep2-send-icon"
                  />
                </div>

                <div className="trainbotStep2-home-indicator" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBotStep2;
