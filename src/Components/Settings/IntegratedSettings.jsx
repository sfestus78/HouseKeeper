import React, { useState } from 'react';
import { User, Upload, Edit, Eye, EyeOff, Camera } from 'lucide-react';
import { Input, Button } from '../Authshared/general';
import './IntegratedSettings.css';

const IntegratedSettings = ({ accountType = 'Creator', onAccountTypeChange }) => {
  const [activeTab, setActiveTab] = useState('profile'); // Default to notifications as required
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  // Profile state
  const [profileData, setProfileData] = useState({
    firstName: 'Anthony',
    lastName: 'Bridge',
    email: 'a.bridge12@gmail.com',
    mobile: '+995-445-551-4048',
    location: '90 Orange St, Teneriffe EC1A 1AH'
  });

  // Account state
  const [accountData, setAccountData] = useState({
    email: 'a.bridge12@gmail.com',
    password: '••••••••••••',
    twoStepVerification: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Notification state with required defaults
  const [notifications, setNotifications] = useState({
    desktop: true,      // default: checked
    email: false,       // default: unchecked  
    updates: true,      // default: checked
    reminders: true,    // default: checked
    activities: true    // default: checked
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailChange = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setAccountData(prev => ({ ...prev, email: newEmail }));
    setProfileData(prev => ({ ...prev, email: newEmail }));
    setIsChangingEmail(false);
    setNewEmail('');
    setEmailError('');
    alert('Email updated successfully!');
  };

  const handlePasswordChange = () => {
    setIsChangingPassword(false);
    alert('Password change email sent!');
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggle2FA = () => {
    setAccountData(prev => ({ ...prev, twoStepVerification: !prev.twoStepVerification }));
  };

  const renderProfileSection = () => (
    <div className="integrated-settings-content-section">
      <div className="integrated-settings-section-header">
        <h3 className="integrated-settings-section-title">Profile Settings</h3>
        <p className="integrated-settings-section-subtitle">Adjust your preferences on how your account works</p>
      </div>

      <div className="integrated-settings-profile-card">
        <div className="integrated-settings-profile-image-container">
          <div className="integrated-settings-profile-image">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="integrated-settings-profile-img" />
            ) : (
              <img 
                src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/20b363bd057ee220b5a6b2efaf355eec371c2cb1?placeholderIfAbsent=true" 
                alt="Profile" 
                className="integrated-settings-profile-img" 
              />
            )}
          </div>
          <button className="integrated-settings-profile-edit-btn">
            <Edit size={16} />
          </button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="integrated-settings-profile-upload"
            id="profile-upload"
          />
        </div>
        
        <div className="integrated-settings-profile-info">
          <div className="integrated-settings-profile-badge">
            <div className="integrated-settings-badge-dot"></div>
            <span className="integrated-settings-badge-text">{accountType}</span>
          </div>
          <h4 className="integrated-settings-profile-name">{profileData.firstName} {profileData.lastName}</h4>
          <p className="integrated-settings-profile-subtitle">
            Assigned to <span className="integrated-settings-profile-properties">6 Properties</span>
          </p>
        </div>
      </div>

      <div className="integrated-settings-divider"></div>

      <div className="integrated-settings-personal-info">
        <div className="integrated-settings-personal-header">
          <h4 className="integrated-settings-personal-title">Personal Information</h4>
          <button className="integrated-settings-edit-btn">
            <Edit size={16} />
            <span>Edit</span>
          </button>
        </div>

        <div className="integrated-settings-form-grid">
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">First Name</label>
            <div className="integrated-settings-form-value">{profileData.firstName}</div>
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Last Name</label>
            <div className="integrated-settings-form-value">{profileData.lastName}</div>
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Email Address</label>
            <div className="integrated-settings-form-value">{profileData.email}</div>
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Mobile Number</label>
            <div className="integrated-settings-form-value">{profileData.mobile}</div>
          </div>
          <div className="integrated-settings-form-group integrated-settings-form-group-full">
            <label className="integrated-settings-form-label">Location</label>
            <div className="integrated-settings-form-value">{profileData.location}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="integrated-settings-content-section">
      <div className="integrated-settings-section-header">
        <h3 className="integrated-settings-section-title">Account Settings</h3>
        <p className="integrated-settings-section-subtitle">Manage your account security and login preferences</p>
      </div>

      <div className="integrated-settings-form-section">
        <div className="integrated-settings-form-field">
          <label className="integrated-settings-form-label">Email Address</label>
          <div className="integrated-settings-account-field">
            {isChangingEmail ? (
              <div className="integrated-settings-email-change">
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email"
                  error={emailError}
                />
                <div className="integrated-settings-field-actions">
                  <Button variant="primary" onClick={handleEmailChange}>
                    Update Email
                  </Button>
                  <Button variant="secondary" onClick={() => setIsChangingEmail(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="integrated-settings-form-value">{accountData.email}</div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingEmail(true)}
                  className="integrated-settings-change-btn"
                >
                  Change
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="integrated-settings-form-field">
          <label className="integrated-settings-form-label">Password</label>
          <div className="integrated-settings-account-field">
            {isChangingPassword ? (
              <div className="integrated-settings-password-change">
                <p className="integrated-settings-password-info">
                  A password reset link will be sent to your email address.
                </p>
                <div className="integrated-settings-field-actions">
                  <Button variant="primary" onClick={handlePasswordChange}>
                    Send Reset Link
                  </Button>
                  <Button variant="secondary" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="integrated-settings-password-field">
                  <span className="integrated-settings-form-value">
                    {showPassword ? 'mypassword123' : '••••••••••••'}
                  </span>
                  <button 
                    className="integrated-settings-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(true)}
                  className="integrated-settings-change-btn"
                >
                  Change
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="integrated-settings-form-field">
          <label className="integrated-settings-form-label">2-Step Verification</label>
          <div className="integrated-settings-account-field">
            <div className="integrated-settings-2fa-info">
              <span className="integrated-settings-form-value">
                {accountData.twoStepVerification ? 'Enabled' : 'Disabled'}
              </span>
              <p className="integrated-settings-field-description">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="integrated-settings-toggle" onClick={toggle2FA}>
              <div className={`integrated-settings-toggle-track ${accountData.twoStepVerification ? 'active' : ''}`}>
                <div className={`integrated-settings-toggle-knob ${accountData.twoStepVerification ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="integrated-settings-content-section">
      <div className="integrated-settings-section-header">
        <h3 className="integrated-settings-section-title">Notification Settings</h3>
        <p className="integrated-settings-section-subtitle">Choose which notifications you want to receive</p>
      </div>

      <div className="integrated-settings-form-section">
        <h4 className="integrated-settings-notification-group-title">All Notifications</h4>
        
        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Desktop Notifications</label>
            <p className="integrated-settings-notification-description">
              Receive notifications for any activity regarding your properties.
            </p>
          </div>
          <div className="integrated-settings-toggle" onClick={() => toggleNotification('desktop')}>
            <div className={`integrated-settings-toggle-track ${notifications.desktop ? 'active' : ''}`}>
              <div className={`integrated-settings-toggle-knob ${notifications.desktop ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Email Notifications</label>
            <p className="integrated-settings-notification-description">
              Receive notifications for any activity regarding your properties.
            </p>
          </div>
          <div className="integrated-settings-toggle" onClick={() => toggleNotification('email')}>
            <div className={`integrated-settings-toggle-track ${notifications.email ? 'active' : ''}`}>
              <div className={`integrated-settings-toggle-knob ${notifications.email ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Update Notifications</label>
            <p className="integrated-settings-notification-description">
              Receive notifications for any activity regarding your properties.
            </p>
          </div>
          <div className="integrated-settings-toggle" onClick={() => toggleNotification('updates')}>
            <div className={`integrated-settings-toggle-track ${notifications.updates ? 'active' : ''}`}>
              <div className={`integrated-settings-toggle-knob ${notifications.updates ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="integrated-settings-divider"></div>

        <h4 className="integrated-settings-notification-group-title">Activities</h4>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">All Reminders & Activities</label>
            <p className="integrated-settings-notification-description">
              Notify me on all the system activities and reminders created.
            </p>
          </div>
          <div className="integrated-settings-toggle" onClick={() => toggleNotification('reminders')}>
            <div className={`integrated-settings-toggle-track ${notifications.reminders ? 'active' : ''}`}>
              <div className={`integrated-settings-toggle-knob ${notifications.reminders ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Updates</label>
            <p className="integrated-settings-notification-description">
              Receive latest updates and settings info.
            </p>
          </div>
          <div className="integrated-settings-toggle" onClick={() => toggleNotification('activities')}>
            <div className={`integrated-settings-toggle-track ${notifications.activities ? 'active' : ''}`}>
              <div className={`integrated-settings-toggle-knob ${notifications.activities ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="integrated-settings-container">
      <div className="integrated-settings-header">
        <h1 className="integrated-settings-page-title">Settings</h1>
        <p className="integrated-settings-page-subtitle">
          Adjust your preferences on how your account works
        </p>
      </div>

      <div className="integrated-settings-content">
        <div className="integrated-settings-sidebar">
          <button 
            className={`integrated-settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`integrated-settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            Account
          </button>
          <button 
            className={`integrated-settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
        </div>

        <div className="integrated-settings-tab-divider"></div>

        <div className="integrated-settings-content-area">
          {activeTab === 'profile' && renderProfileSection()}
          {activeTab === 'account' && renderAccountSection()}
          {activeTab === 'notifications' && renderNotificationsSection()}
        </div>
      </div>
    </div>
  );
};

export default IntegratedSettings;
