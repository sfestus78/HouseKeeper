import React, { useState } from 'react';
import { ArrowLeft, Star, Send } from 'lucide-react';
import './HelpCenterPages.css';

const FeedbackPage = ({ onBack }) => {
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
      onBack(); // Go back to help center
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="helpcenter-page-container">
      {/* Page Header */}
      <div className="helpcenter-page-header">
        <button 
          className="helpcenter-back-button"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
          <span>Back to Help Center</span>
        </button>
        <h1 className="helpcenter-page-title">Feedback</h1>
        <p className="helpcenter-page-subtitle">
          We value your feedback.
        </p>
      </div>

      {/* Page Content */}
      <div className="helpcenter-feedback-content">
        
        <form onSubmit={handleSubmit} className="helpcenter-feedback-form">
          {/* Rating Section */}
          <div className="helpcenter-feedback-section">
            <h3 className="helpcenter-section-title">Rating</h3>
            <div className="helpcenter-rating-container">
              <div className="helpcenter-rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`helpcenter-star-button ${star <= formData.rating ? 'helpcenter-star-filled' : 'helpcenter-star-empty'}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    <Star size={32}  /> 
                    {/* //fill="yellow" strokeWidth= {0} */}
                  </button>
                ))}
              </div>
              
            </div>
            {errors.rating && (
              <span className="helpcenter-error-message">{errors.rating}</span>
            )}
          </div>

          {/* Feedback Type Section */}
          <div className="helpcenter-feedback-section">
            <h3 className="helpcenter-section-title">Feedback Type</h3>
            <div className="helpcenter-feedback-types">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`helpcenter-feedback-type-button ${formData.feedbackType === type.id ? 'helpcenter-feedback-type-selected' : ''}`}
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
            <div className="helpcenter-message-container">
              <textarea
                id="feedback-message"
                value={formData.message}
                onChange={handleMessageChange}
                className={`helpcenter-feedback-textarea ${errors.message ? 'helpcenter-error' : ''}`}
                placeholder="Please share your thoughts, suggestions, or report any issues you've encountered..."
                rows={6}
                minLength={10}
                maxLength={1000}
              />
              <div className="helpcenter-character-count">
                {formData.message.length}/1000 characters
              </div>
            </div>
            {errors.message && (
              <span className="helpcenter-error-message">{errors.message}</span>
            )}
          </div>

          {/* Submit Section */}
          <div className="helpcenter-submit-section">
            <button
              type="submit"
              className="helpcenter-feedback-submit-button"
              disabled={isSubmitting}
            >
              <Send size={20} />
              {isSubmitting ? 'Sending Feedback...' : 'Send Feedback'}
            </button>
            <p className="helpcenter-submit-note">
              Your feedback is anonymous and will be reviewed by our product team.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
