import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Star, 
  Send, 
  User, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import ContactModal from './ContactModal';
import FeedbackModal from './FeedbackModal';
import './HelpCenter.css';

const HelpCenter = ({ onNavigate }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(1); // FAQ with ID 1 expanded by default
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const faqData = [
    {
      id: 1,
      question: "How does Housekeeper work?",
      answer: "Housekeepers acquires rental properties into an LLC and sells shares in that LLC to the general public. Housekeepers then manages the day to day operations including finding tenants and completing repairs. Investors receive cash dividends from rental income each quarter and capture any property value appreciation."
    },
    {
      id: 2,
      question: "How do I train a bot?",
      answer: "To train a bot, navigate to the Train Bots section from your dashboard. Select the property you want to train a bot for, then follow the step-by-step process to upload property information, images, and specific instructions. The training process typically takes 24-48 hours to complete."
    },
    {
      id: 3,
      question: "How can I become a trainer?",
      answer: "To become a trainer, you need to create an account and select 'Trainer' as your account type. Complete your profile with relevant experience and certifications. Once approved, you'll be able to accept property assignments and start training bots for property management."
    }
  ];

  const handleFAQToggle = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleGetStartedClick = () => {
    // Redirect to signup/onboarding
    window.location.href = '/signup';
  };

  const handleContactClick = () => {
    setShowContactModal(true);
  };

  const handleFeedbackClick = () => {
    setShowFeedbackModal(true);
  };

  return (
    <div className="helpcenter-container">
      {/* Header Section */}
      <div className="helpcenter-header">
        <h1 className="helpcenter-title">Help Center</h1>
        <p className="helpcenter-subtitle">
          Access guides, FAQs and Support when using the platform.
        </p>
      </div>

      {/* Cards Section */}
      <div className="helpcenter-cards-grid">
        {/* Getting Started Card */}
        <div 
          className="helpcenter-card helpcenter-getstarted-card"
          onClick={handleGetStartedClick}
        >
          <div className="helpcenter-card-preview">
            <div className="helpcenter-preview-content">
              <div className="helpcenter-preview-icon">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/9b568fbec705082061ce32b85d460a64e63f9c24?placeholderIfAbsent=true"
                  alt="Create Account"
                  className="helpcenter-icon-img"
                />
              </div>
              <h3 className="helpcenter-preview-title">Create an account</h3>
              <div className="helpcenter-creator-badge">
                <span>Creator</span>
              </div>
              <p className="helpcenter-preview-description">
                As a creator, you would be able to list properties and assign them to trainers.
              </p>
            </div>
          </div>
          <div className="helpcenter-card-content">
            <h3 className="helpcenter-card-title">Getting Started</h3>
            <p className="helpcenter-card-description">
              Everything you need to get started from creating an account to setting up your profile.
            </p>
          </div>
        </div>

        {/* Contact Support Card */}
        <div 
          className="helpcenter-card helpcenter-contact-card"
          onClick={handleContactClick}
        >
          <div className="helpcenter-card-preview">
            <div className="helpcenter-contact-sections">
              <div className="helpcenter-contact-section">
                <h4 className="helpcenter-contact-section-title">Chat to Sales</h4>
                <p className="helpcenter-contact-section-description">
                  Interested in switching? Speak to our team.
                </p>
                <a href="mailto:sales@housekeepers.com" className="helpcenter-contact-link">
                  sales@housekeepers.com
                </a>
              </div>
              <div className="helpcenter-contact-divider"></div>
              <div className="helpcenter-contact-section">
                <h4 className="helpcenter-contact-section-title">Email Support</h4>
                <p className="helpcenter-contact-section-description">
                  Email us and we will respond within 24 hours.
                </p>
                <a href="mailto:support@housekeepers.com" className="helpcenter-contact-link">
                  support@housekeepers.com
                </a>
              </div>
            </div>
          </div>
          <div className="helpcenter-card-content">
            <h3 className="helpcenter-card-title">Contact Support</h3>
            <p className="helpcenter-card-description">
              Do you have questions about this product, fill out the form and get a feedback.
            </p>
          </div>
        </div>

        {/* Send Feedback Card */}
        <div 
          className="helpcenter-card helpcenter-feedback-card"
          onClick={handleFeedbackClick}
        >
          <div className="helpcenter-card-preview">
            <div className="helpcenter-feedback-form-preview">
              <h4 className="helpcenter-form-title">Feedback form</h4>
              <div className="helpcenter-rating-section">
                <label className="helpcenter-rating-label">Rating</label>
                <div className="helpcenter-rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="helpcenter-star helpcenter-star-filled" />
                  ))}
                </div>
              </div>
              <div className="helpcenter-feedback-type-section">
                <label className="helpcenter-feedback-type-label">Feedback Type</label>
                <div className="helpcenter-feedback-types">
                  <span className="helpcenter-feedback-tag">Bug</span>
                  <span className="helpcenter-feedback-tag">Feature request</span>
                  <span className="helpcenter-feedback-tag">General feedback</span>
                </div>
              </div>
            </div>
          </div>
          <div className="helpcenter-card-content">
            <h3 className="helpcenter-card-title">Send feedback</h3>
            <p className="helpcenter-card-description">
              We Value Your Feedback
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="helpcenter-faq-section">
        <div className="helpcenter-faq-header">
          <h2 className="helpcenter-faq-title">Frequently Asked Questions</h2>
          <p className="helpcenter-faq-subtitle">
            Here are some frequently asked questions to help you.
          </p>
        </div>

        <div className="helpcenter-faq-grid">
          {/* Left Column */}
          <div className="helpcenter-faq-column">
            {faqData.slice(0, 2).map((faq) => (
              <div key={faq.id} className="helpcenter-faq-item">
                <div 
                  className={`helpcenter-faq-question ${expandedFAQ === faq.id ? 'helpcenter-faq-expanded' : ''}`}
                  onClick={() => handleFAQToggle(faq.id)}
                >
                  <h3>{faq.question}</h3>
                  {expandedFAQ === faq.id ? (
                    <ArrowUp className="helpcenter-faq-icon" />
                  ) : (
                    <ArrowDown className="helpcenter-faq-icon" />
                  )}
                </div>
                {expandedFAQ === faq.id && (
                  <div className="helpcenter-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
            {/* Duplicate first question for design consistency */}
            <div className="helpcenter-faq-item">
              <div 
                className="helpcenter-faq-question"
                onClick={() => handleFAQToggle(4)}
              >
                <h3>{faqData[2].question}</h3>
                {expandedFAQ === 4 ? (
                  <ArrowUp className="helpcenter-faq-icon" />
                ) : (
                  <ArrowDown className="helpcenter-faq-icon" />
                )}
              </div>
              {expandedFAQ === 4 && (
                <div className="helpcenter-faq-answer">
                  <p>{faqData[2].answer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="helpcenter-faq-column">
            {faqData.map((faq) => (
              <div key={`right-${faq.id}`} className="helpcenter-faq-item">
                <div 
                  className="helpcenter-faq-question"
                  onClick={() => handleFAQToggle(`right-${faq.id}`)}
                >
                  <h3>{faq.question}</h3>
                  {expandedFAQ === `right-${faq.id}` ? (
                    <ArrowUp className="helpcenter-faq-icon" />
                  ) : (
                    <ArrowDown className="helpcenter-faq-icon" />
                  )}
                </div>
                {expandedFAQ === `right-${faq.id}` && (
                  <div className="helpcenter-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showContactModal && (
        <ContactModal 
          onClose={() => setShowContactModal(false)}
        />
      )}
      
      {showFeedbackModal && (
        <FeedbackModal 
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default HelpCenter;
