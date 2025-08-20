import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import './TrainBotStep3.css';
import { saveStep3Data } from './api';

const TrainBotStep3 = ({ selectedProperty, onNext, onBack, onChangeProperty }) => {
  const [editingId, setEditingId] = useState(null);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'Which Tourist spots are close by?',
      answer: '',
      placeholder: 'Write something....'
    },
    {
      id: 2,
      question: 'Is there a Hospital closeby?',
      answer: '',
      placeholder: 'Write something....'
    },
    {
      id: 3,
      question: 'What fun activities are nearby?',
      answer: '',
      placeholder: 'Write something....'
    },
    {
      id: 4,
      question: 'Is there a mall closeby?',
      answer: '',
      placeholder: 'Write something....'
    },
    {
      id: 5,
      question: 'Where do I get food around here?',
      answer: '',
      placeholder: 'Write something....'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (id, newQuestion) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, question: newQuestion } : q
    ));
  };

  const handleAnswerChange = (id, newAnswer) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, answer: newAnswer } : q
    ));
  };

  const handleAddMore = () => {
    const newQuestion = {
      id: Date.now(),
      question: 'New Question',
      answer: '',
      placeholder: 'Write something....'
    };
    setQuestions(prev => [...prev, newQuestion]);
  };

  const handleNext = async () => {
    // Validate that at least some questions have answers
    const questionsWithAnswers = questions.filter(q => q.answer.trim());

    if (questionsWithAnswers.length === 0) {
      alert('Please provide answers to at least one question to continue.');
      return;
    }

    setIsLoading(true);

    try {
      // Save the questions and answers using the API
      const result = await saveStep3Data({
        propertyId: selectedProperty.id.toString(),
        questions: questions
      });

      if (result.status === 'success') {
        console.log('Step 3 data saved successfully:', result);
        onNext(questions);
      } else {
        console.error('Failed to save Step 3 data:', result);
        alert('Failed to save data: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving Step 3 data:', error);
      alert('An error occurred while saving data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress based on answered questions
  const answeredQuestions = questions.filter(q => q.answer.trim()).length;
  const progressPercentage = questions.length > 0 ? (answeredQuestions / questions.length) * 100 : 0;

  if (!selectedProperty) {
    return (
      <div className="trainbotStep3-container">
        <div className="trainbotStep3-error">
          <h2>No Property Selected</h2>
          <p>Please go back and select a property first.</p>
          <button 
            className="trainbotStep3-change-property-btn"
            onClick={onChangeProperty}
          >
            Select Property
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trainbotStep3-container">
      <div className="trainbotStep3-layout">
        {/* Main Content */}
        <div className="trainbotStep3-main-content">
          {/* Header */}
          <div className="trainbotStep3-header">
            <h1 className="trainbotStep3-title">Bot Training</h1>
            <p className="trainbotStep3-subtitle">
              Select a property and train it's bot.
            </p>
          </div>

          {/* Property Section */}
          <div className="trainbotStep3-property-section">
            <div className="trainbotStep3-property-info">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.name}
                className="trainbotStep3-property-image"
              />
              <div className="trainbotStep3-property-details">
                <h2 className="trainbotStep3-property-name">
                  {selectedProperty.name}
                </h2>
                <p className="trainbotStep3-property-address">
                  {selectedProperty.address}
                </p>
              </div>
            </div>
            <button
              className="trainbotStep3-change-property-btn"
              onClick={onChangeProperty}
            >
              Change Property
            </button>
          </div>

          {/* Step 3 Section */}
          <div className="trainbotStep3-step-section">
            <div className="trainbotStep3-step-header">
              <span className="trainbotStep3-step-number">STEP 3: </span>
              <span className="trainbotStep3-step-title">
                Environment Information
              </span>
            </div>

            <div className="trainbotStep3-step-divider" />

            {/* Environmental Questions */}
            <div className="trainbotStep3-questions-container">
              {questions.map((q) => (
                <div key={q.id} className="trainbotStep3-input-field">
                  <div className="trainbotStep3-question-header">
                    {editingId === q.id ? (
                      <input
                        type="text"
                        value={q.question}
                        onChange={(e) =>
                          handleQuestionChange(q.id, e.target.value)
                        }
                        onBlur={() => setEditingId(null)} // exit edit mode when unfocused
                        autoFocus
                        className="trainbotStep3-question-input"
                      />
                    ) : (
                      <span className="trainbotStep3-question-text">
                        {q.question}
                      </span>
                    )}

                    <Edit
                      size={16}
                      className="trainbotStep3-edit-icon"
                      onClick={() => setEditingId(q.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="trainbotStep3-answer-container">
                    <input
                      type="text"
                      value={q.answer}
                      placeholder={q.placeholder}
                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                      className="trainbotStep3-answer-input"
                    />
                  </div>
                </div>
              ))}

              <button
                className="trainbotStep3-add-more-btn"
                onClick={handleAddMore}
              >
                Add more
              </button>
            </div>

            {/* Progress and Navigation */}
            <div className="trainbotStep3-progress-section">
              <div className="trainbotStep3-progress-container">
                <div className="trainbotStep3-progress-bar">
                  <div
                    className="trainbotStep3-progress-fill"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="trainbotStep3-navigation">
                <button className="trainbotStep3-back-button" onClick={onBack}>
                  Back
                </button>
                <button
                  className="trainbotStep3-next-button"
                  onClick={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="trainbotStep3-preview-section">
          <div className="trainbotStep3-preview-container">
            <div className="trainbotStep3-preview-header">
              <img
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/82c8e37b2141bc82f5953296a20966f4564e2940?placeholderIfAbsent=true"
                alt="Bot Icon"
                className="trainbotStep3-bot-icon"
              />
              <div className="trainbotStep3-preview-info">
                <div className="trainbotStep3-version">Version 2.0</div>
                <div className="trainbotStep3-release-date">
                  Released: 24/09/2024
                </div>
              </div>
            </div>

            <div className="trainbotStep3-preview-content">
              <img
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/4807e7f98684571336b2fd4311816d766308f3b8?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className="trainbotStep3-preview-logo"
              />

              <div className="trainbotStep3-chat-preview">
                <div className="trainbotStep3-chat-header">
                  <div className="trainbotStep3-status-bar">
                    <span className="trainbotStep3-time">9:41</span>
                    <div className="trainbotStep3-status-icons">
                      <img
                        src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/984260519096b1a3b0b0e800bba0aa3bda0a63e7?placeholderIfAbsent=true"
                        alt="Signal"
                      />
                      <img
                        src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a1b4442a8a6d8301c691cf3c5a61ea33b621df9e?placeholderIfAbsent=true"
                        alt="Battery"
                      />
                    </div>
                  </div>

                  <div className="trainbotStep3-chat-controls">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/2ca2bb7264b1efcd3fbd5a89018d50af308382e2?placeholderIfAbsent=true"
                      alt="Back"
                      className="trainbotStep3-back-icon"
                    />
                    <div className="trainbotStep3-font-controls">
                      <button className="trainbotStep3-font-btn">
                        <span className="trainbotStep3-arrow-down">↓</span>
                        <span>Aa</span>
                      </button>
                      <button className="trainbotStep3-font-btn trainbotStep3-font-active">
                        Aa
                      </button>
                      <button className="trainbotStep3-font-btn">
                        <span>Aa</span>
                        <span className="trainbotStep3-arrow-up">↑</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="trainbotStep3-chat-messages">
                  <div className="trainbotStep3-user-message">
                    Where is the key?
                  </div>

                  <div className="trainbotStep3-bot-response">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f153faf83973f5b3a49fa5ed8748fdcfc88a25e5?placeholderIfAbsent=true"
                      alt="Bot Avatar"
                      className="trainbotStep3-bot-avatar"
                    />
                    <div className="trainbotStep3-response-bubble">
                      Welcome!
                      <br />
                      <br />
                      To retrieve the key, you'll find a key box just outside
                      the front door.
                      <br />
                      <br />
                      Simply enter the code provided and you'll be able to
                      access the key. Enjoy your stay!
                    </div>
                  </div>

                  <div className="trainbotStep3-suggestion-buttons">
                    {questions.slice(0, 2).map((q) => (
                      <button
                        key={q.id}
                        className="trainbotStep3-suggestion-btn"
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>

                  <div className="trainbotStep3-chat-float-btn" />
                </div>

                <div className="trainbotStep3-input-area">
                  <div className="trainbotStep3-message-input">
                    <input type="text" placeholder="Type your message...." />
                  </div>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/4635bbbbe187aaa2bfbaf1764b67f1fd9e1786d6?placeholderIfAbsent=true"
                    alt="Send"
                    className="trainbotStep3-send-icon"
                  />
                </div>

                <div className="trainbotStep3-home-indicator" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainBotStep3;
