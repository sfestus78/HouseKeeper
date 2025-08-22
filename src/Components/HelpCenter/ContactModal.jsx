import React, { useState } from 'react';
import { X, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    mobile: '',
    countryCode: '+1',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
      console.log('Contact form submitted:', formData);
      
      alert('Your message has been sent successfully! We will get back to you within 24 hours.');
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
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
      <div className="helpcenter-modal-container helpcenter-contact-modal">
        <div className="helpcenter-modal-header">
          <h2 className="helpcenter-modal-title">Contact Support</h2>
          <button 
            className="helpcenter-modal-close"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>

        <div className="helpcenter-contact-content">
          {/* Left Column - Form */}
          <div className="helpcenter-contact-form-section">
            <form onSubmit={handleSubmit} className="helpcenter-contact-form">
              <div className="helpcenter-form-row">
                <div className="helpcenter-form-field">
                  <label htmlFor="firstName" className="helpcenter-form-label">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`helpcenter-form-input ${errors.firstName ? 'helpcenter-error' : ''}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <span className="helpcenter-error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="helpcenter-form-field">
                  <label htmlFor="lastName" className="helpcenter-form-label">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`helpcenter-form-input ${errors.lastName ? 'helpcenter-error' : ''}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <span className="helpcenter-error-message">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="helpcenter-form-field">
                <label htmlFor="email" className="helpcenter-form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`helpcenter-form-input ${errors.email ? 'helpcenter-error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <span className="helpcenter-error-message">{errors.email}</span>
                )}
              </div>

              <div className="helpcenter-form-field">
                <label htmlFor="location" className="helpcenter-form-label">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`helpcenter-form-input ${errors.location ? 'helpcenter-error' : ''}`}
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <span className="helpcenter-error-message">{errors.location}</span>
                )}
              </div>

              <div className="helpcenter-form-field">
                <label htmlFor="mobile" className="helpcenter-form-label">
                  Mobile *
                </label>
                <div className="helpcenter-phone-input">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="helpcenter-country-select"
                  >
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+91">+91 (IN)</option>
                    <option value="+86">+86 (CN)</option>
                    <option value="+81">+81 (JP)</option>
                    <option value="+49">+49 (DE)</option>
                    <option value="+33">+33 (FR)</option>
                  </select>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`helpcenter-form-input helpcenter-mobile-input ${errors.mobile ? 'helpcenter-error' : ''}`}
                    placeholder="Enter your mobile number"
                  />
                </div>
                {errors.mobile && (
                  <span className="helpcenter-error-message">{errors.mobile}</span>
                )}
              </div>

              <div className="helpcenter-form-field">
                <label htmlFor="message" className="helpcenter-form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`helpcenter-form-textarea ${errors.message ? 'helpcenter-error' : ''}`}
                  placeholder="Describe your issue or question..."
                  rows="4"
                />
                {errors.message && (
                  <span className="helpcenter-error-message">{errors.message}</span>
                )}
              </div>

              <button 
                type="submit" 
                className="helpcenter-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Information */}
          <div className="helpcenter-contact-info-section">
            <h3 className="helpcenter-contact-info-title">Other Ways to Reach Us</h3>
            
            <div className="helpcenter-contact-info-list">
              <div className="helpcenter-contact-info-item">
                <div className="helpcenter-contact-info-icon">
                  <MessageCircle size={20} />
                </div>
                <div className="helpcenter-contact-info-content">
                  <h4>Chat to Sales</h4>
                  <p>Interested in switching? Speak to our team.</p>
                  <a href="mailto:sales@housekeepers.com">sales@housekeepers.com</a>
                </div>
              </div>

              <div className="helpcenter-contact-info-item">
                <div className="helpcenter-contact-info-icon">
                  <Mail size={20} />
                </div>
                <div className="helpcenter-contact-info-content">
                  <h4>Email Support</h4>
                  <p>Email us and we will respond within 24 hours.</p>
                  <a href="mailto:support@housekeepers.com">support@housekeepers.com</a>
                </div>
              </div>

              <div className="helpcenter-contact-info-item">
                <div className="helpcenter-contact-info-icon">
                  <Phone size={20} />
                </div>
                <div className="helpcenter-contact-info-content">
                  <h4>Call Us</h4>
                  <p>Mon-Fri from 8am to 5pm EST.</p>
                  <a href="tel:+1-555-0123">+1 (555) 012-3456</a>
                </div>
              </div>

              <div className="helpcenter-contact-info-item">
                <div className="helpcenter-contact-info-icon">
                  <MapPin size={20} />
                </div>
                <div className="helpcenter-contact-info-content">
                  <h4>Bath Office</h4>
                  <p>Come say hello at our office HQ.</p>
                  <address>
                    100 Smith Street<br />
                    Collingwood VIC 3066 AU
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
