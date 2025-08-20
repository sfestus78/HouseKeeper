import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, FileText, ChevronDown } from 'lucide-react';
import './TrainBotStep4.css';
import BotTrainingProgressModal from './BotTrainingProgressModal';

const TrainBotStep4 = ({ selectedProperty, onNext, onBack, onChangeProperty }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState([
    // { id: 1, name: 'Document 1', subtitle: 'Keys Questions', type: 'pdf' },
    // { id: 2, name: 'Document 2', subtitle: 'Keys Questions', type: 'pdf' },
    // { id: 3, name: 'Document 3', subtitle: 'Keys Questions', type: 'pdf' },
    // { id: 4, name: 'Document 1', subtitle: 'Keys Questions', type: 'pdf' },
    // { id: 5, name: 'Document 1', subtitle: 'Keys Questions', type: 'pdf' },
    // { id: 6, name: 'Document 1', subtitle: 'Keys Questions', type: 'pdf' }
  ]);
  const [dragOver, setDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trainingStage, setTrainingStage] = useState('Uploading Data');
  const fileInputRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      if (file.type === 'application/pdf' && file.size <= 10 * 1024 * 1024) {
        const newDoc = {
          id: Date.now() + Math.random(),
          name: file.name.replace('.pdf', ''),
          subtitle: 'Keys Questions',
          type: 'pdf'
        };
        setUploadedDocuments(prev => [...prev, newDoc]);
      } else {
        alert('Please upload PDF files only, maximum 10MB size.');
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDeleteDocument = (docId) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== docId));
  };

  const handleDone = () => {
    setShowModal(true);
    simulateTraining();
  };

  const simulateTraining = () => {
    const stages = [
      { stage: 'Uploading Data', duration: 2000 },
      { stage: 'Processing Documents', duration: 3000 },
      { stage: 'Training Model', duration: 4000 },
      { stage: 'Finalizing Bot', duration: 2000 }
    ];

    let currentProgress = 0;
    let stageIndex = 0;

    const updateProgress = () => {
      if (stageIndex < stages.length) {
        const stage = stages[stageIndex];
        setTrainingStage(stage.stage);

        const progressPerStage = 100 / stages.length;
        const targetProgress = (stageIndex + 1) * progressPerStage;

        const incrementProgress = () => {
          currentProgress += 2;
          if (currentProgress >= targetProgress) {
            currentProgress = targetProgress;
            setProgress(currentProgress);
            stageIndex++;
            setTimeout(updateProgress, 500);
          } else {
            setProgress(currentProgress);
            setTimeout(incrementProgress, 100);
          }
        };

        incrementProgress();
      }
    };

    updateProgress();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProgress(0);
    setTrainingStage('Uploading Data');
  };

  const handleViewBot = () => {
    // Navigate to bot details page or handle as needed
    console.log('Navigating to bot details page');
    alert('Navigating to bot details page...');
  };

  return (
    <div className="trainbotStep4-container">
      <div className="trainbotStep4-content-grid">
        {/* Main Content Section */}
        <div className="trainbotStep4-main-content">
          {/* Header */}
          <div className="trainbotStep4-header">
            <h1 className="trainbotStep4-title">Bot Training</h1>
            <p className="trainbotStep4-subtitle">Select a property and train its bot.</p>
          </div>

          {/* Property Information Section */}
          <div className="trainbotStep4-property-section">
            <div className="trainbotStep4-property-info">
              <img
                src={selectedProperty?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=67&h=67&fit=crop&crop=center'}
                alt={selectedProperty?.name || 'Prime Estate'}
                className="trainbotStep4-property-image"
              />
              <div className="trainbotStep4-property-details">
                <h2 className="trainbotStep4-property-name">
                  {selectedProperty?.name || 'Prime Estate'}
                </h2>
                <p className="trainbotStep4-property-address">
                  {selectedProperty?.address || 'Flat 4, 24 Castle Street, Perth, PH1 3JY'}
                </p>
              </div>
            </div>
            <button className="trainbotStep4-change-property-btn" onClick={onChangeProperty}>
              Change Property
            </button>
          </div>

          {/* Step Title Section */}
          <div className="trainbotStep4-step-header">
            <div className="trainbotStep4-step-title-wrapper">
              <div className="trainbotStep4-step-title-content">
                <span className="trainbotStep4-step-number">STEP 4:</span>
                <span className="trainbotStep4-step-description">Upload Relevant Documents</span>
              </div>
              <ChevronDown size={16} className="trainbotStep4-chevron-icon" />
            </div>
            <button className="trainbotStep4-sample-doc-btn">
              Sample Document
            </button>
          </div>

          {/* Divider */}
          <div className="trainbotStep4-divider" />

          {/* Upload Section */}
          <div 
            className={`trainbotStep4-upload-section ${dragOver ? 'trainbotStep4-drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="trainbotStep4-upload-content">
              <Upload size={32} className="trainbotStep4-upload-icon" />
              <div className="trainbotStep4-upload-text">
                <h3>Select a file or drag and drop here</h3>
                <p>PDF, file size no more than 10MB</p>
              </div>
              <button className="trainbotStep4-select-file-btn" onClick={handleFileSelect}>
                SELECT FILE
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* Uploaded Documents Section */}
          <div className="trainbotStep4-documents-section">
            <div className="trainbotStep4-documents-header">
              <h3>Uploaded Documents</h3>
              <p>Here are the documents you uploaded</p>
            </div>

            <div className="trainbotStep4-documents-grid">
              {uploadedDocuments.map((document) => (
                <div key={document.id} className="trainbotStep4-document-card">
                  <div className="trainbotStep4-document-preview">
                    <FileText size={64} className="trainbotStep4-document-icon" />
                    <button 
                      className="trainbotStep4-delete-btn"
                      onClick={() => handleDeleteDocument(document.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="trainbotStep4-document-info">
                    <h4>{document.name}</h4>
                    <p>{document.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="trainbotStep4-progress-section">
            <div className="trainbotStep4-progress-bar">
              <div className="trainbotStep4-progress-fill" />
            </div>
          </div>

          {/* Navigation */}
          <div className="trainbotStep4-navigation">
            <button className="trainbotStep4-back-btn" onClick={onBack}>
              Back
            </button>
            <button className="trainbotStep4-done-btn" onClick={handleDone}>
              Done
            </button>
          </div>
        </div>

        {/* Bot Preview Section */}
        <div className="trainbotStep4-preview-section">
          <div className="trainbotStep4-preview-content">
            <div className="trainbotStep4-phone-mockup">
              <div className="trainbotStep4-phone-header">
                <div className="trainbotStep4-phone-status">
                  <span className="trainbotStep4-time">9:41</span>
                  <div className="trainbotStep4-phone-indicators">
                    <div className="trainbotStep4-signal-icon" />
                    <div className="trainbotStep4-wifi-icon" />
                  </div>
                </div>

                <div className="trainbotStep4-app-header">
                  <div className="trainbotStep4-app-back-btn" />
                  <div className="trainbotStep4-font-controls">
                    <div className="trainbotStep4-font-control">
                      <ChevronDown size={7} className="trainbotStep4-font-arrow" />
                      <span>Aa</span>
                    </div>
                    <div className="trainbotStep4-font-control trainbotStep4-font-active">
                      <span>Aa</span>
                    </div>
                    <div className="trainbotStep4-font-control">
                      <span>Aa</span>
                      <ChevronDown size={7} className="trainbotStep4-font-arrow trainbotStep4-font-arrow-up" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="trainbotStep4-chat-content">
                <div className="trainbotStep4-user-message">
                  <div className="trainbotStep4-message-bubble trainbotStep4-user-bubble">
                    Where is the key?
                  </div>
                </div>

                <div className="trainbotStep4-bot-response">
                  <div className="trainbotStep4-bot-avatar" />
                  <div className="trainbotStep4-bot-messages">
                    <div className="trainbotStep4-message-bubble trainbotStep4-bot-bubble">
                      Welcome!<br /><br />
                      To retrieve the key, you'll find a key box just outside the front door.<br /><br />
                      Simply enter the code provided and you'll be able to access the key. Enjoy your stay!
                    </div>
                    
                    <div className="trainbotStep4-suggestion-buttons">
                      <button className="trainbotStep4-suggestion-btn">
                        How do I get food around here?
                      </button>
                      <button className="trainbotStep4-suggestion-btn">
                        What fun activities are nearby?
                      </button>
                    </div>
                  </div>
                </div>

                <div className="trainbotStep4-typing-indicator" />
              </div>

              <div className="trainbotStep4-chat-input">
                <div className="trainbotStep4-input-container">
                  <input 
                    type="text" 
                    placeholder="Type your message...." 
                    className="trainbotStep4-text-input"
                  />
                  <div className="trainbotStep4-send-btn" />
                </div>
              </div>

              <div className="trainbotStep4-home-indicator" />
            </div>

            <div className="trainbotStep4-version-info">
              <div className="trainbotStep4-version-header">
                <span className="trainbotStep4-version-number">Version 2.0</span>
                <span className="trainbotStep4-version-date">Released: 24/09/2024</span>
              </div>
              <div className="trainbotStep4-version-dots">
                <div className="trainbotStep4-dot" />
                <div className="trainbotStep4-dot" />
                <div className="trainbotStep4-dot" />
                <div className="trainbotStep4-dot trainbotStep4-dot-active" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bot Training Progress Modal */}
      <BotTrainingProgressModal
        showModal={showModal}
        onClose={handleCloseModal}
        progress={progress}
        trainingStage={trainingStage}
        onViewBot={handleViewBot}
      />
    </div>
  );
};

export default TrainBotStep4;
