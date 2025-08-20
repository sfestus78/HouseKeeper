import React, { useState } from 'react';
import './TrainBotStep1.css';
import { saveFAQs } from './api';

const TrainBotStep1 = ({ selectedProperty, onNext, onChangeProperty }) => {
  const [questions, setQuestions] = useState([
    { id: 1, label: 'Question 1', value: '', placeholder: 'E.g Where is the key?' },
    { id: 2, label: 'Question 2', value: '', placeholder: 'E.g How do I connect to Wi-fi?' },
    { id: 3, label: 'Question 3', value: '', placeholder: 'E.g How do I contact maintenance?' },
    { id: 4, label: 'Question 4', value: '', placeholder: 'What fun activities are nearby?' },
    { id: 5, label: 'Question 5', value: '', placeholder: 'Where do I get food around here?' }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (id, value) => {
    setQuestions(prev => 
      prev.map(q => q.id === id ? { ...q, value } : q)
    );
  };

  const handleNext = async () => {
    // Get all non-empty questions
    const filledQuestions = questions.filter(q => q.value.trim());
    
    if (filledQuestions.length === 0) {
      alert('Please add at least one question to continue.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Save FAQs via dummy API
      const response = await saveFAQs({
        propertyId: selectedProperty.id,
        questions: filledQuestions.map(q => ({
          question: q.value.trim(),
          order: q.id
        }))
      });

      if (response.status === 'success') {
        onNext(filledQuestions);
      } else {
        throw new Error('Failed to save questions');
      }
    } catch (error) {
      console.error('Error saving FAQs:', error);
      alert('Failed to save questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress (based on filled questions)
  const filledCount = questions.filter(q => q.value.trim()).length;
  const progressPercentage = (filledCount / questions.length) * 100;

  if (!selectedProperty) {
    return (
      <div className="trainbotstep1-container">
        <div className="trainbotstep1-error">
          <h2>No Property Selected</h2>
          <p>Please go back and select a property first.</p>
          <button 
            className="trainbotstep1-change-property-btn"
            onClick={onChangeProperty}
          >
            Select Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trainbotstep1-container">
      <div className="trainbotstep1-layout">
        {/* Main Content */}
        <div className="trainbotstep1-main-content">
          {/* Header */}
          <div className="trainbotstep1-header">
            <h1 className="trainbotstep1-title">Bot Training</h1>
            <p className="trainbotstep1-subtitle">Select a property and train it's bot.</p>
          </div>

          {/* Property Section */}
          <div className="trainbotstep1-property-section">
            <div className="trainbotstep1-property-info">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.name}
                className="trainbotstep1-property-image"
              />
              <div className="trainbotstep1-property-details">
                <h2 className="trainbotstep1-property-name">{selectedProperty.name}</h2>
                <p className="trainbotstep1-property-address">{selectedProperty.address}</p>
              </div>
            </div>
            <button 
              className="trainbotstep1-change-property-btn"
              onClick={onChangeProperty}
            >
              Change Property
            </button>
          </div>

          {/* Step 1 Section */}
          <div className="trainbotstep1-step-section">
            <div className="trainbotstep1-step-header">
              <span className="trainbotstep1-step-number">STEP 1: </span>
              <span className="trainbotstep1-step-title">FAQs</span>
            </div>

            <div className="trainbotstep1-step-divider" />

            {/* FAQ Form */}
            <div className="trainbotstep1-form">
              {questions.map((question) => (
                <div key={question.id} className="trainbotstep1-input-field">
                  <label className="trainbotstep1-label">{question.label}</label>
                  <div className="trainbotstep1-input-container">
                    <input
                      type="text"
                      value={question.value}
                      placeholder={question.placeholder}
                      onChange={(e) => handleQuestionChange(question.id, e.target.value)}
                      className="trainbotstep1-input"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Progress and Navigation */}
            <div className="trainbotstep1-progress-section">
              <div className="trainbotstep1-progress-container">
                <div className="trainbotstep1-progress-bar">
                  <div 
                    className="trainbotstep1-progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="trainbotstep1-navigation">
                <button
                  className="trainbotstep1-next-button"
                  onClick={handleNext}
                  disabled={isLoading || filledCount === 0}
                >
                  {isLoading ? 'Saving...' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="trainbotstep1-preview-section">
          <div className="trainbotstep1-preview-container">
            <div className="trainbotstep1-preview-header">
              <img 
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/bde368f09ff4f197d24edead00ae02d8ecca495e?placeholderIfAbsent=true"
                alt="Bot Icon"
                className="trainbotstep1-bot-icon"
              />
              <div className="trainbotstep1-preview-info">
                <div className="trainbotstep1-version">Version 2.0</div>
                <div className="trainbotstep1-release-date">Released: 24/09/2024</div>
              </div>
            </div>

            <div className="trainbotstep1-preview-content">
              <img 
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/81772ff259453f0cd7146537818689da0cf8ad2a?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className="trainbotstep1-preview-logo"
              />
              
              <div className="trainbotstep1-chat-preview">
                <div className="trainbotstep1-status-bar">
                  <span className="trainbotstep1-time">9:41</span>
                  <div className="trainbotstep1-status-icons">
                    <img src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/632bd992502652de39e1feb289b3f709c39958a6?placeholderIfAbsent=true" alt="Signal" />
                    <img src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/40f37c56c4cf359fa0440c5d74590ab232c15c6a?placeholderIfAbsent=true" alt="Battery" />
                  </div>
                </div>

                <div className="trainbotstep1-font-controls">
                  <button className="trainbotstep1-font-btn trainbotstep1-font-smaller">
                    <span>Aa</span>
                    <span className="trainbotstep1-arrow-down">↓</span>
                  </button>
                  <button className="trainbotstep1-font-btn trainbotstep1-font-active">Aa</button>
                  <button className="trainbotstep1-font-btn trainbotstep1-font-larger">
                    <span>Aa</span>
                    <span className="trainbotstep1-arrow-up">↑</span>
                  </button>
                </div>

                <div className="trainbotstep1-bot-content">
                  <img 
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/66500fe76c8e40ce9e5eb4a04453b9c147346d0a?placeholderIfAbsent=true"
                    alt="Guest Bot"
                    className="trainbotstep1-bot-avatar"
                  />
                  <h3 className="trainbotstep1-welcome-text">Welcome to Guest Bot</h3>

                  <div className="trainbotstep1-question-preview">
                    {questions.filter(q => q.value.trim()).slice(0, 2).map((question, index) => (
                      <div key={index} className="trainbotstep1-question-bubble">
                        {question.value}
                      </div>
                    ))}
                    <div className="trainbotstep1-question-bubble">
                      <span>Privacy Policy</span>
                      <span className="trainbotstep1-info-icon">ⓘ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBotStep1;
