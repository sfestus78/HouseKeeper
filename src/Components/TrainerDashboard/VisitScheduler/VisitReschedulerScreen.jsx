import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Search, 
  Bell,
  Home,
  Building2,
  Calendar,
  FileText,
  Bot,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import './VisitReschedulerScreen.css';

const VisitReschedulerScreen = ({ 
  visitData = {},
  propertyData = {},
  onSave,
  onCancel,
  onBack
}) => {
  const [formData, setFormData] = useState({
    day: '17',
    month: '06',
    year: '2025',
    visitType: 'Day',
    time: '10:00',
    notes: 'The Lowe offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. '
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: null },
    { id: 'properties', label: 'All Properties', icon: null },
    { id: 'notifications', label: 'Properties Notifications', icon: null },
    { id: 'visits', label: 'Scheduled Visits', icon: Calendar, active: true },
    { id: 'logs', label: 'Visit Logs', icon: null },
    { id: 'trainbots', label: 'Train Bots', icon: Bot },
    { id: 'settings', label: 'Settings', icon: null },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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
  };

  const validateForm = () => {
    const newErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(formData.year, formData.month - 1, formData.day);

    if (!formData.day || formData.day < 1 || formData.day > 31) {
      newErrors.day = 'Valid day required';
    }
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      newErrors.month = 'Valid month required';
    }
    if (!formData.year || formData.year < currentDate.getFullYear()) {
      newErrors.year = 'Valid year required';
    }
    if (selectedDate <= currentDate) {
      newErrors.date = 'Date must be in the future';
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
        notes: formData.notes
      };

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

  return (
    <div className="visitReschedulerScreen-container">
      {/* Browser Header */}
      <div className="visitReschedulerScreen-browser-header">
        <div className="visitReschedulerScreen-browser-controls">
          <img
            src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/e71dc262b006089798db2062a87eba7df0a53713?placeholderIfAbsent=true"
            className="visitReschedulerScreen-browser-icon"
            alt="Browser icon"
          />
          <div className="visitReschedulerScreen-url-bar">
            <div className="visitReschedulerScreen-url-content">
              <span>https://housekeepers.com</span>
            </div>
            <img
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/5811df6839b774d8ae783b17408d13d7497d2c19?placeholderIfAbsent=true"
              className="visitReschedulerScreen-dropdown-icon"
              alt="Dropdown"
            />
          </div>
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7759087292dfb8e59cee6050c6d510a2b43e713a?placeholderIfAbsent=true"
          className="visitReschedulerScreen-browser-controls-right"
          alt="Browser controls"
        />
      </div>

      {/* Main Layout */}
      <div className="visitReschedulerScreen-layout">
        {/* Sidebar */}
        <aside className="visitReschedulerScreen-sidebar">
          <div className="visitReschedulerScreen-logo">
            <img
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f59cfd379b0660c1dc6b0e7ac118e100d0156d3d?placeholderIfAbsent=true"
              className="visitReschedulerScreen-logo-icon"
              alt="Housekeepers logo"
            />
            <span className="visitReschedulerScreen-logo-text">Housekeepers</span>
          </div>

          <nav className="visitReschedulerScreen-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`visitReschedulerScreen-nav-item ${item.active ? 'visitReschedulerScreen-nav-item-active' : ''}`}
                >
                  {Icon && <Icon size={24} />}
                  {!Icon && <div className="visitReschedulerScreen-nav-icon-placeholder" />}
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>

          <div className="visitReschedulerScreen-sidebar-divider" />

          <div className="visitReschedulerScreen-profile">
            <div className="visitReschedulerScreen-profile-info">
              <img
                src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true"
                className="visitReschedulerScreen-profile-avatar"
                alt="Anthony Bridge"
              />
              <div className="visitReschedulerScreen-profile-details">
                <div className="visitReschedulerScreen-profile-name">Anthony Bridge</div>
                <div className="visitReschedulerScreen-profile-email">a.bridge@gmail.com</div>
                <div className="visitReschedulerScreen-profile-logout">Log out</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="visitReschedulerScreen-main">
          {/* Header */}
          <div className="visitReschedulerScreen-header">
            <button className="visitReschedulerScreen-back-btn" onClick={onBack || onCancel}>
              <div className="visitReschedulerScreen-back-icon" />
            </button>
            
            <div className="visitReschedulerScreen-search-and-notifications">
              <div className="visitReschedulerScreen-search-container">
                <div className="visitReschedulerScreen-search-bar">
                  <span className="visitReschedulerScreen-search-text">Enter Property Name</span>
                  <div className="visitReschedulerScreen-search-icon" />
                </div>
                <div className="visitReschedulerScreen-notifications">
                  <div className="visitReschedulerScreen-notification-dot" />
                </div>
              </div>
              
              <div className="visitReschedulerScreen-account-switch">
                <div className="visitReschedulerScreen-switch-label">Switch account type</div>
                <div className="visitReschedulerScreen-toggle-container">
                  <span className="visitReschedulerScreen-toggle-label">Creator</span>
                  <div className="visitReschedulerScreen-toggle">
                    <div className="visitReschedulerScreen-toggle-handle" />
                  </div>
                  <span className="visitReschedulerScreen-toggle-label">Trainer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="visitReschedulerScreen-page-header">
            <h1 className="visitReschedulerScreen-page-title">Reschedule Visit</h1>
            <p className="visitReschedulerScreen-page-subtitle">Reschedule property visit</p>
          </div>

          {/* Property Info */}
          <div className="visitReschedulerScreen-property-info">
            <img 
              src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/acad46bb8776960d4ce3e6d1a891f26949292547?placeholderIfAbsent=true"
              alt="Prime Estate"
              className="visitReschedulerScreen-property-image"
            />
            <div className="visitReschedulerScreen-property-details">
              <h2 className="visitReschedulerScreen-property-name">Prime Estate</h2>
              <p className="visitReschedulerScreen-property-address">Flat 4, 24 Castle Street, Perth, PH1 3JY</p>
              <span className="visitReschedulerScreen-property-distance">4 KM away</span>
            </div>
            <button className="visitReschedulerScreen-contact-creator">Contact Creator</button>
          </div>

          {/* Form */}
          <div className="visitReschedulerScreen-form-container">
            <div className="visitReschedulerScreen-separator" />
            
            {/* Visit Date */}
            <div className="visitReschedulerScreen-field">
              <label className="visitReschedulerScreen-label">Visit Date</label>
              <div className="visitReschedulerScreen-date-inputs">
                <input
                  type="text"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  className="visitReschedulerScreen-date-input"
                />
                <span className="visitReschedulerScreen-date-separator">/</span>
                <input
                  type="text"
                  value={formData.month}
                  onChange={(e) => handleInputChange('month', e.target.value)}
                  className="visitReschedulerScreen-date-input"
                />
                <span className="visitReschedulerScreen-date-separator">/</span>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  className="visitReschedulerScreen-date-input"
                />
              </div>
            </div>

            {/* Visit Type */}
            <div className="visitReschedulerScreen-field">
              <label className="visitReschedulerScreen-label">Visit Type</label>
              <div className="visitReschedulerScreen-visit-type">
                <button
                  type="button"
                  className={`visitReschedulerScreen-type-btn ${formData.visitType === 'Day' ? 'visitReschedulerScreen-type-btn-active' : ''}`}
                  onClick={() => handleVisitTypeSelect('Day')}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/0e8a3c9fca73d3c56a8d640828ba638751686835?placeholderIfAbsent=true"
                    className="visitReschedulerScreen-type-icon"
                    alt="Day"
                  />
                  <span>Day</span>
                </button>
                <button
                  type="button"
                  className={`visitReschedulerScreen-type-btn ${formData.visitType === 'Night' ? 'visitReschedulerScreen-type-btn-active' : ''}`}
                  onClick={() => handleVisitTypeSelect('Night')}
                >
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/dbf26e47a94ead18692f1f1446adc29c7e4449e0?placeholderIfAbsent=true"
                    className="visitReschedulerScreen-type-icon"
                    alt="Night"
                  />
                  <span>Night</span>
                </button>
              </div>
            </div>

            {/* Visit Time */}
            <div className="visitReschedulerScreen-field">
              <label className="visitReschedulerScreen-label">Visit Time</label>
              <input
                type="text"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="visitReschedulerScreen-time-input"
              />
            </div>

            {/* Additional Notes */}
            <div className="visitReschedulerScreen-field">
              <label className="visitReschedulerScreen-label">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="visitReschedulerScreen-textarea"
                rows={5}
              />
            </div>

            <div className="visitReschedulerScreen-separator" />

            {/* Submit Button */}
            <button 
              className={`visitReschedulerScreen-submit-btn ${isLoading ? 'visitReschedulerScreen-submit-btn-loading' : ''}`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save & Reschedule Visit'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VisitReschedulerScreen;
