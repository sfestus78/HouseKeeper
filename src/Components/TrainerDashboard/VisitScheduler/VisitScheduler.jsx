import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import VisitConfirmationModal from './VisitConfirmationModal';
import './VisitScheduler.css';

const VisitScheduler = ({ 
  propertyName = "Prime Estate",
  propertyAddress = "Flat 4, 24 Castle Street, Perth, PH1 3JY",
  propertyImage = "https://api.builder.io/api/v1/image/assets/TEMP/eaa65aeec5e47ab6d5c948fe0e8a588e9f0b6e07?width=192",
  onScheduleVisit,
  onClose 
}) => {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
    visitType: '',
    time: '',
    notes: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleVisitTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      visitType: type
    }));
    
    if (errors.visitType) {
      setErrors(prev => ({
        ...prev,
        visitType: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.day || formData.day < 1 || formData.day > 31) {
      newErrors.day = 'Valid day required';
    }
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Valid month required';
    }
    if (!formData.year || formData.year < new Date().getFullYear()) {
      newErrors.year = 'Valid year required';
    }
    if (!formData.visitType) {
      newErrors.visitType = 'Visit type required';
    }
    if (!formData.time) {
      newErrors.time = 'Time required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleScheduleVisit = () => {
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirmSchedule = () => {
    const visitData = {
      propertyName,
      propertyAddress,
      date: `${formData.day.padStart(2, '0')}/${formData.month.padStart(2, '0')}/${formData.year}`,
      visitType: formData.visitType,
      time: formData.time,
      notes: formData.notes
    };
    
    if (onScheduleVisit) {
      onScheduleVisit(visitData);
    }
    
    setShowModal(false);
    
    // Reset form
    setFormData({
      day: '',
      month: '',
      year: '',
      visitType: '',
      time: '',
      notes: ''
    });
  };

  return (
    <div className="visitscheduler-container">
      <div className="visitscheduler-content">
        {/* Header */}
        <div className="visitscheduler-header">
          <button className="visitscheduler-back-btn" onClick={onClose}>
            <ArrowLeft size={24} />
          </button>
          <div className="visitscheduler-title-section">
            <h1 className="visitscheduler-title">Visit Scheduler</h1>
            <p className="visitscheduler-subtitle">Schedule property visit</p>
          </div>
        </div>

        {/* Property Info */}
        <div className="visitscheduler-property-info">
          <img 
            src={propertyImage} 
            alt={propertyName}
            className="visitscheduler-property-image"
          />
          <div className="visitscheduler-property-details">
            <h2 className="visitscheduler-property-name">{propertyName}</h2>
            <p className="visitscheduler-property-address">{propertyAddress}</p>
            <span className="visitscheduler-property-distance">4 KM away</span>
          </div>
          <button className="visitscheduler-contact-creator">
            Contact Creator
          </button>
        </div>

        {/* Form */}
        <div className="visitscheduler-form-container">
          <div className="visitscheduler-separator"></div>
          
          {/* Visit Date */}
          <div className="visitscheduler-field">
            <label className="visitscheduler-label">Visit Date</label>
            <div className="visitscheduler-date-inputs">
              <input
                type="number"
                placeholder="DD"
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                className={`visitscheduler-date-input ${errors.day ? 'visitscheduler-input-error' : ''}`}
                min="1"
                max="31"
              />
              <span className="visitscheduler-date-separator">/</span>
              <input
                type="number"
                placeholder="MM"
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                className={`visitscheduler-date-input ${errors.month ? 'visitscheduler-input-error' : ''}`}
                min="1"
                max="12"
              />
              <span className="visitscheduler-date-separator">/</span>
              <input
                type="number"
                placeholder="YYYY"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className={`visitscheduler-date-input ${errors.year ? 'visitscheduler-input-error' : ''}`}
                min={new Date().getFullYear()}
              />
            </div>
            {(errors.day || errors.month || errors.year) && (
              <span className="visitscheduler-error-text">Please enter a valid date</span>
            )}
          </div>

          {/* Visit Type */}
          <div className="visitscheduler-field">
            <label className="visitscheduler-label">Visit Type</label>
            <div className="visitscheduler-visit-type">
              <button
                type="button"
                className={`visitscheduler-type-btn ${formData.visitType === 'Day' ? 'visitscheduler-type-btn-active' : ''}`}
                onClick={() => handleVisitTypeSelect('Day')}
              >
                <Sun size={24} className="visitscheduler-type-icon" />
                <span>Day</span>
              </button>
              <button
                type="button"
                className={`visitscheduler-type-btn ${formData.visitType === 'Night' ? 'visitscheduler-type-btn-active' : ''}`}
                onClick={() => handleVisitTypeSelect('Night')}
              >
                <Moon size={24} className="visitscheduler-type-icon" />
                <span>Night</span>
              </button>
            </div>
            {errors.visitType && (
              <span className="visitscheduler-error-text">{errors.visitType}</span>
            )}
          </div>

          {/* Visit Time */}
          <div className="visitscheduler-field">
            <label className="visitscheduler-label">Visit Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`visitscheduler-time-input ${errors.time ? 'visitscheduler-input-error' : ''}`}
            />
            {errors.time && (
              <span className="visitscheduler-error-text">{errors.time}</span>
            )}
          </div>

          {/* Additional Notes */}
          <div className="visitscheduler-field">
            <label className="visitscheduler-label">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Write a brief description on the property."
              className="visitscheduler-textarea"
              rows={5}
            />
          </div>

          <div className="visitscheduler-separator"></div>

          {/* Submit Button */}
          <button 
            className="visitscheduler-submit-btn"
            onClick={handleScheduleVisit}
          >
            Schedule Visit
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <VisitConfirmationModal
          propertyName={propertyName}
          propertyAddress={propertyAddress}
          visitData={formData}
          onConfirm={handleConfirmSchedule}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default VisitScheduler;
