import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './VisitInspectionChecklist.css';

const VisitInspectionChecklist = ({ property, onBack, onSave, onContactCreator }) => {

  const [checklistItems, setChecklistItems] = useState([
    {
      id: 1,
      title: 'Access & Entry Check',
      description: '(Confirm door locks, key location, entrance security.)',
      completed: false,
      notApplicable: false
    },
    {
      id: 2,
      title: 'Cleanliness & Readiness',
      description: '(Ensure property is tidy, beds are made, essentials are stocked.)',
      completed: false,
      notApplicable: false
    },
    {
      id: 3,
      title: 'Wi-Fi Check',
      description: '(Test connectivity and speed)',
      completed: false,
      notApplicable: false
    },
    {
      id: 4,
      title: 'Lighting & Power Check',
      description: '(Confirm all lights, AC, sockets, and appliances are working.)',
      completed: false,
      notApplicable: false
    },
    {
      id: 5,
      title: 'Emergency Contacts Visibility',
      description: '(Check if emergency numbers are displayed in the property.)',
      completed: false,
      notApplicable: false
    }
  ]);

  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleCheckboxChange = (itemId) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, completed: !item.completed, notApplicable: false }
          : item
      )
    );
  };

  const handleNotApplicableToggle = (itemId) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, notApplicable: !item.notApplicable, completed: false }
          : item
      )
    );
  };

  const handleSave = () => {
    const checklistData = {
      propertyId: property?.id || 1,
      propertyName: property?.name || 'Prime Estate',
      items: checklistItems,
      notes: additionalNotes,
      completedAt: new Date().toISOString()
    };

    console.log('Saving checklist:', checklistData);
    if (onSave) onSave(checklistData);
    alert('Checklist saved successfully!');
  };

  const handleContactCreator = () => {
    if (onContactCreator) {
      onContactCreator(property);
    } else {
      window.location.href = `mailto:${property?.creator?.email || 'creator@property.com'}`;
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="inspectionChecklist-container">
      {/* Back button */}
      <div className="inspectionChecklist-header">
        <button className="inspectionChecklist-back-btn" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Page title */}
      <div className="inspectionChecklist-title-section">
        <h1 className="inspectionChecklist-title">Visit / Call Checklist</h1>
        <p className="inspectionChecklist-subtitle">Here are your notifications</p>
      </div>

      {/* Property info */}
      <div className="inspectionChecklist-property-card">
        <img
          src={
            property?.image ||
            "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/acad46bb8776960d4ce3e6d1a891f26949292547?placeholderIfAbsent=true"
          }
          alt={property?.name || 'Prime Estate'}
          className="inspectionChecklist-property-image"
        />
        <div className="inspectionChecklist-property-info">
          <h2 className="inspectionChecklist-property-name">{property?.name || 'Prime Estate'}</h2>
          <p className="inspectionChecklist-property-address">
            {property?.address || 'Flat 4, 24 Castle Street, Perth, PH1 3JY'}
          </p>
          <div className="inspectionChecklist-property-distance">
            {property?.distance || '4KM away'}
          </div>
        </div>
        <button className="inspectionChecklist-contact-creator" onClick={handleContactCreator}>
          Contact Creator
        </button>
      </div>

      {/* Checklist section */}
      <div className="inspectionChecklist-section">
        <h3 className="inspectionChecklist-section-title">Property Checklist</h3>

        <div className="inspectionChecklist-items">
          {checklistItems.map((item) => (
            <div key={item.id} className="inspectionChecklist-item">
              <div
                className={`inspectionChecklist-checkbox ${
                  item.completed ? 'inspectionChecklist-checkbox-checked' : ''
                }`}
                onClick={() => handleCheckboxChange(item.id)}
              >
                {item.completed && (
                  <svg className="inspectionChecklist-checkmark" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <div className="inspectionChecklist-item-content">
                <span className="inspectionChecklist-item-title">{item.title} </span>
                <span className="inspectionChecklist-item-description">{item.description}</span>
              </div>
              <button
                className={`inspectionChecklist-not-applicable ${
                  item.notApplicable ? 'inspectionChecklist-not-applicable-active' : ''
                }`}
                onClick={() => handleNotApplicableToggle(item.id)}
              >
                Not applicable
              </button>
            </div>
          ))}
        </div>

        {/* Additional Notes */}
        <div className="inspectionChecklist-notes-section">
          <label className="inspectionChecklist-notes-label">Additional Notes</label>
          <textarea
            className="inspectionChecklist-notes-input"
            placeholder="Write a brief description on the property."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </div>

        <div className="inspectionChecklist-separator-line"></div>

        {/* Save button */}
        <button className="inspectionChecklist-save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export { VisitInspectionChecklist };
