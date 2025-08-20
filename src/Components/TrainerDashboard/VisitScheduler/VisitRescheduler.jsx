import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sun, Moon } from 'lucide-react';
import './VisitRescheduler.css';

const VisitRescheduler = ({ 
  visitData = {},
  propertyData = {},
  onSave,
  onCancel,
  onBack
}) => {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: '',
    visitType: 'Day',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Pre-populate form with existing visit data
  useEffect(() => {
    if (visitData) {
      // Parse existing date if available
      if (visitData.date) {
        const dateParts = visitData.date.split('/');
        if (dateParts.length === 3) {
          setFormData(prev => ({
            ...prev,
            day: dateParts[0] || '17',
            month: dateParts[1] || '06',
            year: dateParts[2] || '2025'
          }));
        }
      } else {
        // Default values matching the design
        setFormData(prev => ({
          ...prev,
          day: '17',
          month: '08',
          year: '2025'
        }));
      }

      setFormData(prev => ({
        ...prev,
        visitType: visitData.visitType || 'Day',
        time: visitData.time || '10:00',
        notes: visitData.notes || ' '
      }));
    }
  }, [visitData]);

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
    const currentDate = new Date();
    const selectedDate = new Date(formData.year, formData.month - 1, formData.day);

    // Validate day
    if (!formData.day || formData.day < 1 || formData.day > 31) {
      newErrors.day = 'Valid day required';
    }

    // Validate month
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Valid month required';
    }

    // Validate year
    if (!formData.year || formData.year < currentDate.getFullYear()) {
      newErrors.year = 'Valid year required';
    }

    // Validate date is in the future
    if (selectedDate <= currentDate) {
      newErrors.date = 'Date must be in the future';
    }

    // Validate visit type
    if (!formData.visitType) {
      newErrors.visitType = 'Visit type required';
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = 'Time required';
    } else {
      // Validate time format (HH:MM)
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(formData.time)) {
        newErrors.time = 'Valid time required (HH:MM format)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const updatedVisitData = {
        ...visitData,
        date: `${formData.day.padStart(2, '0')}/${formData.month.padStart(2, '0')}/${formData.year}`,
        visitType: formData.visitType,
        time: formData.time,
        notes: formData.notes,
        propertyName: propertyData.name || 'Prime Estate',
        propertyAddress: propertyData.address || 'Flat 4, 24 Castle Street, Perth, PH1 3JY'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave(updatedVisitData);
      }
    } catch (error) {
      console.error('Error saving visit:', error);
      setErrors({ submit: 'Failed to save visit. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onBack) {
      onBack();
    }
  };

  return (
    <div className="rescheduleVisit-container">
      <div className="rescheduleVisit-content">
        {/* Header Section */}
        <div className="rescheduleVisit-header">
          <button 
            className="rescheduleVisit-back-btn" 
            onClick={handleCancel}
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="rescheduleVisit-title-section">
            <h1 className="rescheduleVisit-title">Reschedule Visit</h1>
            <p className="rescheduleVisit-subtitle">Reschedule property visit</p>
          </div>
        </div>

        {/* Property Info */}
        <div className="rescheduleVisit-property-info">
          <img 
            src={propertyData.image || "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/acad46bb8776960d4ce3e6d1a891f26949292547?placeholderIfAbsent=true"}
            alt={propertyData.name || "Prime Estate"}
            className="rescheduleVisit-property-image"
          />
          <div className="rescheduleVisit-property-details">
            <h2 className="rescheduleVisit-property-name">
              {propertyData.name || "Prime Estate"}
            </h2>
            <p className="rescheduleVisit-property-address">
              {propertyData.address || "Flat 4, 24 Castle Street, Perth, PH1 3JY"}
            </p>
            <span className="rescheduleVisit-property-distance">
              {propertyData.distance || "4 KM away"}
            </span>
          </div>
          <button className="rescheduleVisit-contact-creator">
            Contact Creator
          </button>
        </div>

        {/* Form Container */}
        <div className="rescheduleVisit-form-container">
          <div className="rescheduleVisit-separator"></div>
          
          {/* Visit Date */}
          <div className="rescheduleVisit-field">
            <label className="rescheduleVisit-label">Visit Date</label>
            <div className="rescheduleVisit-date-inputs">
              <input
                type="number"
                value={formData.day}
                onChange={(e) => handleInputChange('day', e.target.value)}
                className={`rescheduleVisit-date-input ${errors.day || errors.date ? 'rescheduleVisit-input-error' : ''}`}
                min="1"
                max="31"
                aria-label="Day"
              />
              <span className="rescheduleVisit-date-separator">/</span>
              <input
                type="number"
                value={formData.month}
                onChange={(e) => handleInputChange('month', e.target.value)}
                className={`rescheduleVisit-date-input ${errors.month || errors.date ? 'rescheduleVisit-input-error' : ''}`}
                min="1"
                max="12"
                aria-label="Month"
              />
              <span className="rescheduleVisit-date-separator">/</span>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className={`rescheduleVisit-date-input ${errors.year || errors.date ? 'rescheduleVisit-input-error' : ''}`}
                min={new Date().getFullYear()}
                aria-label="Year"
              />
            </div>
            {(errors.day || errors.month || errors.year || errors.date) && (
              <span className="rescheduleVisit-error-text">
                {errors.date || 'Please enter a valid future date'}
              </span>
            )}
          </div>

          {/* Visit Type */}
          <div className="rescheduleVisit-field">
            <label className="rescheduleVisit-label">Visit Type</label>
            <div className="rescheduleVisit-visit-type">
              <button
                type="button"
                className={`rescheduleVisit-type-btn ${formData.visitType === 'Day' ? 'rescheduleVisit-type-btn-active' : ''}`}
                onClick={() => handleVisitTypeSelect('Day')}
                aria-pressed={formData.visitType === 'Day'}
              >
                <Sun size={24} className="rescheduleVisit-type-icon" />
                <span>Day</span>
              </button>
              <button
                type="button"
                className={`rescheduleVisit-type-btn ${formData.visitType === 'Night' ? 'rescheduleVisit-type-btn-active' : ''}`}
                onClick={() => handleVisitTypeSelect('Night')}
                aria-pressed={formData.visitType === 'Night'}
              >
                <Moon size={24} className="rescheduleVisit-type-icon" />
                <span>Night</span>
              </button>
            </div>
            {errors.visitType && (
              <span className="rescheduleVisit-error-text">{errors.visitType}</span>
            )}
          </div>

          {/* Visit Time */}
          <div className="rescheduleVisit-field">
            <label className="rescheduleVisit-label">Visit Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`rescheduleVisit-time-input ${errors.time ? 'rescheduleVisit-input-error' : ''}`}
              aria-label="Visit time"
            />
            {errors.time && (
              <span className="rescheduleVisit-error-text">{errors.time}</span>
            )}
          </div>

          {/* Additional Notes */}
          <div className="rescheduleVisit-field">
            <label className="rescheduleVisit-label">Additional Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Write a brief description on the property."
              className="rescheduleVisit-textarea"
              rows={5}
              maxLength={500}
              aria-label="Additional notes"
            />
          </div>

          <div className="rescheduleVisit-separator"></div>

          {/* Error message for submission */}
          {errors.submit && (
            <div className="rescheduleVisit-submit-error">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button 
            className={`rescheduleVisit-submit-btn ${isLoading ? 'rescheduleVisit-submit-btn-loading' : ''}`}
            onClick={handleSave}
            disabled={isLoading}
            aria-label={isLoading ? 'Saving changes...' : 'Save and reschedule visit'}
          >
            {isLoading ? (
              <div className="rescheduleVisit-loading-spinner">
                <div className="rescheduleVisit-spinner"></div>
                Saving...
              </div>
            ) : (
              'Save & Reschedule Visit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisitRescheduler;
