import React, { useState, useRef } from 'react';
import { User, Upload, Edit, Eye, EyeOff, Camera } from 'lucide-react';
import { Input, Button } from '../Authshared/general';
import './IntegratedSettings.css';

const IntegratedSettings = ({ accountType = 'Creator', onAccountTypeChange }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const fileInputRef = useRef(null);

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

  // Notification state
  const [notifications, setNotifications] = useState({
    desktop: true,
    email: false,  
    updates: true,
    reminders: true,
    activities: true
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

    const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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

   const handleSaveProfile = () => {
    setIsEditingProfile(false);
    alert('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    // Reset form data if needed
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
          <button className="integrated-settings-profile-edit-btn"
          onClick ={triggerFileInput}
          >
            <Edit size={14} />
          </button>
          <input
            ref={fileInputRef}
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
          {isEditingProfile ? (
            <div className="integrated-settings-edit-actions">
              <Button variant="primary" size="small" onClick={handleSaveProfile}>
                Save
              </Button>
              <Button variant="secondary" size="small" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          ) : (
            <button 
              className="integrated-settings-edit-btn"
              onClick={() => setIsEditingProfile(true)}
            >
              <Edit size={14} />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="integrated-settings-form-grid">
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">First Name</label>
            {isEditingProfile ? (
              <Input
                type="text"
                value={profileData.firstName}
                onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                placeholder="First Name"
              />
            ) : (
              <div className="integrated-settings-form-value">{profileData.firstName}</div>
            )}
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Last Name</label>
            {isEditingProfile ? (
              <Input
                type="text"
                value={profileData.lastName}
                onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                placeholder="Last Name"
              />
            ) : (
              <div className="integrated-settings-form-value">{profileData.lastName}</div>
            )}
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Email Address</label>
            {isEditingProfile ? (
              <Input
                type="email"
                value={profileData.email}
                onChange={(e) => handleProfileUpdate('email', e.target.value)}
                placeholder="Email Address"
              />
            ) : (
              <div className="integrated-settings-form-value">{profileData.email}</div>
            )}
          </div>
          <div className="integrated-settings-form-group">
            <label className="integrated-settings-form-label">Mobile Number</label>
            {isEditingProfile ? (
              <Input
                type="tel"
                value={profileData.mobile}
                onChange={(e) => handleProfileUpdate('mobile', e.target.value)}
                placeholder="Mobile Number"
              />
            ) : (
              <div className="integrated-settings-form-value">{profileData.mobile}</div>
            )}
          </div>
          <div className="integrated-settings-form-group integrated-settings-form-group-full">
            <label className="integrated-settings-form-label">Location</label>
            {isEditingProfile ? (
              <Input
                type="text"
                value={profileData.location}
                onChange={(e) => handleProfileUpdate('location', e.target.value)}
                placeholder="Location"
              />
            ) : (
              <div className="integrated-settings-form-value">{profileData.location}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Update your renderAccountSection function with these improvements:

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
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  if (emailError) setEmailError(''); // Clear error on input
                }}
                placeholder="Enter your new email address"
                className={emailError ? 'error' : ''}
                autoFocus
              />
              {emailError && (
                <div className="integrated-settings-error-message">
                  {emailError}
                </div>
              )}
              <div className="integrated-settings-field-actions">
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={handleEmailChange}
                  disabled={!newEmail.trim()}
                >
                  Update Email
                </Button>
                <Button 
                  variant="secondary" 
                  size="small" 
                  onClick={() => {
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setEmailError('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="integrated-settings-form-value">{accountData.email}</div>
              <Button 
                variant="outline" 
                size="small"
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
                🔐 For security reasons, we'll send a password reset link to your registered email address. 
                Click the link in the email to create your new password.
              </p>
              <div className="integrated-settings-field-actions">
                <Button 
                  variant="primary" 
                  size="small" 
                  onClick={handlePasswordChange}
                >
                  Send Reset Link
                </Button>
                <Button 
                  variant="secondary" 
                  size="small" 
                  onClick={() => setIsChangingPassword(false)}
                >
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
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button 
                variant="outline" 
                size="small"
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
              {accountData.twoStepVerification ? '✅ Enabled' : '❌ Disabled'}
            </span>
            <p className="integrated-settings-field-description">
              {accountData.twoStepVerification 
                ? 'Your account has an extra layer of security enabled'
                : 'Add an extra layer of security to protect your account'
              }
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
          <input
            type="checkbox"
            checked={notifications.desktop}
            onChange={() => toggleNotification('desktop')}
            className="integrated-settings-checkbox"
          />
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Email Notifications</label>
            <p className="integrated-settings-notification-description">
              Receive notifications for any activity regarding your properties.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={() => toggleNotification('email')}
            className="integrated-settings-checkbox"
          />
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Update Notifications</label>
            <p className="integrated-settings-notification-description">
              Receive notifications for any activity regarding your properties.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.updates}
            onChange={() => toggleNotification('updates')}
            className="integrated-settings-checkbox"
          />
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
          <input
            type="checkbox"
            checked={notifications.reminders}
            onChange={() => toggleNotification('reminders')}
            className="integrated-settings-checkbox"
          />
        </div>

        <div className="integrated-settings-notification-item">
          <div className="integrated-settings-notification-info">
            <label className="integrated-settings-notification-label">Updates</label>
            <p className="integrated-settings-notification-description">
              Receive latest updates and settings info.
            </p>
          </div>
          <input
            type="checkbox"
            checked={notifications.activities}
            onChange={() => toggleNotification('activities')}
            className="integrated-settings-checkbox"
          />
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