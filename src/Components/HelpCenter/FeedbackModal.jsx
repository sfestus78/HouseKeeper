import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';
import './FeedbackModal.css';

const FeedbackModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    rating: 0,
    feedbackType: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feedbackTypes = [
    { id: 'bug', label: 'Bug' },
    { id: 'feature', label: 'Feature request' },
    { id: 'general', label: 'General feedback' }
  ];

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
    
    if (errors.rating) {
      setErrors(prev => ({
        ...prev,
        rating: ''
      }));
    }
  };

  const handleFeedbackTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      feedbackType: type
    }));
    
    if (errors.feedbackType) {
      setErrors(prev => ({
        ...prev,
        feedbackType: ''
      }));
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      message: value
    }));
    
    if (errors.message) {
      setErrors(prev => ({
        ...prev,
        message: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.feedbackType) {
      newErrors.feedbackType = 'Please select a feedback type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your feedback message';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally send the data to your backend
      console.log('Feedback submitted:', formData);
      
      alert('Thank you for your feedback! We appreciate your input and will review it carefully.');
      onClose();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="helpcenter-modal-overlay" onClick={handleOverlayClick}>
      <div className="helpcenter-modal-container helpcenter-feedback-modal">
        <div className="helpcenter-modal-header">
          <h2 className="helpcenter-modal-title">Send Feedback</h2>
          <button 
            className="helpcenter-modal-close"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="helpcenter-feedback-content">
          <div className="helpcenter-feedback-intro">
            <p>We value your feedback and use it to improve our platform. Please share your thoughts with us.</p>
          </div>

          <form onSubmit={handleSubmit} className="helpcenter-feedback-form">
            {/* Rating Section */}
            <div className="helpcenter-feedback-section">
              <h3 className="helpcenter-section-title">How would you rate your experience?</h3>
              <div className="helpcenter-rating-container">
                <div className="helpcenter-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`helpcenter-star-button ${star <= formData.rating ? 'helpcenter-star-filled' : 'helpcenter-star-empty'}`}
                      onClick={() => handleRatingChange(star)}
                    >
                      <Star size={32} />
                    </button>
                  ))}
                </div>
                <div className="helpcenter-rating-labels">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              {errors.rating && (
                <span className="helpcenter-error-message">{errors.rating}</span>
              )}
            </div>

            {/* Feedback Type Section */}
            <div className="helpcenter-feedback-section">
              <h3 className="helpcenter-section-title">What type of feedback is this?</h3>
              <div className="helpcenter-feedback-types-grid">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    className={`helpcenter-feedback-type-btn ${formData.feedbackType === type.id ? 'helpcenter-active' : ''}`}
                    onClick={() => handleFeedbackTypeChange(type.id)}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {errors.feedbackType && (
                <span className="helpcenter-error-message">{errors.feedbackType}</span>
              )}
            </div>

            {/* Message Section */}
            <div className="helpcenter-feedback-section">
              <h3 className="helpcenter-section-title">Tell us more about your experience</h3>
              <textarea
                value={formData.message}
                onChange={handleMessageChange}
                className={`helpcenter-feedback-textarea ${errors.message ? 'helpcenter-error' : ''}`}
                placeholder="Please describe your feedback in detail. The more information you provide, the better we can understand and address your concerns."
                rows="6"
              />
              <div className="helpcenter-character-count">
                {formData.message.length}/1000
              </div>
              {errors.message && (
                <span className="helpcenter-error-message">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="helpcenter-feedback-actions">
              <button 
                type="button" 
                className="helpcenter-cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="helpcenter-submit-feedback-button"
                disabled={isSubmitting}
              >
                <Send size={16} />
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="helpcenter-feedback-footer">
            <p className="helpcenter-feedback-note">
              Your feedback is important to us. We review all submissions and use them to improve our platform. 
              Response times may vary based on the type of feedback.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
