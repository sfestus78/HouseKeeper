import React, { useState } from 'react';
import { User, Upload, Edit, Eye, EyeOff, Camera, Search, Bell } from 'lucide-react';
import { Input, Button } from '../Authshared/general';
import './SettingsPage.css';

const SettingsPage = ({ accountType = 'Creator', onAccountTypeChange }) => {
  const [activeTab, setActiveTab] = useState('profile');
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

  const toggleAccountType = () => {
    const newType = accountType === 'Creator' ? 'Trainer' : 'Creator';
    onAccountTypeChange?.(newType);
  };

  const renderProfileSection = () => (
    <div className="settings-content-section">
      <div className="settings-section-header">
        <h3 className="settings-section-title">Profile Settings</h3>
        <p className="settings-section-subtitle">Adjust your preferences on how your account works</p>
      </div>

      <div className="settings-profile-card">
        <div className="settings-profile-image-container">
          <div className="settings-profile-image">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="settings-profile-img" />
            ) : (
              <User className="settings-profile-placeholder" />
            )}
          </div>
          <label className="settings-profile-edit-btn">
            <Camera size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="settings-file-input"
            />
          </label>
        </div>

        <div className="settings-profile-info">
          <div className="settings-profile-badge">
            <div className="settings-badge-dot"></div>
            <span className="settings-badge-text">{accountType}</span>
          </div>
          <h4 className="settings-profile-name">{profileData.firstName} {profileData.lastName}</h4>
          <p className="settings-profile-meta">Assigned to <strong>6 Properties</strong></p>
        </div>
      </div>

      <div className="settings-divider"></div>

      <div className="settings-form-section">
        <div className="settings-form-header">
          <h4 className="settings-form-title">Personal Information</h4>
          <button 
            className="settings-edit-btn"
            onClick={() => setIsEditingProfile(!isEditingProfile)}
          >
            <Edit size={16} />
            Edit
          </button>
        </div>

        <div className="settings-form-grid">
          <div className="settings-form-row">
            <div className="settings-form-field">
              <label className="settings-form-label">First Name</label>
              {isEditingProfile ? (
                <Input
                  value={profileData.firstName}
                  onChange={(e) => handleProfileUpdate('firstName', e.target.value)}
                />
              ) : (
                <div className="settings-form-value">{profileData.firstName}</div>
              )}
            </div>
            <div className="settings-form-field">
              <label className="settings-form-label">Last Name</label>
              {isEditingProfile ? (
                <Input
                  value={profileData.lastName}
                  onChange={(e) => handleProfileUpdate('lastName', e.target.value)}
                />
              ) : (
                <div className="settings-form-value">{profileData.lastName}</div>
              )}
            </div>
          </div>

          <div className="settings-form-row">
            <div className="settings-form-field">
              <label className="settings-form-label">Email Address</label>
              <div className="settings-form-value">{profileData.email}</div>
            </div>
            <div className="settings-form-field">
              <label className="settings-form-label">Mobile Number</label>
              {isEditingProfile ? (
                <Input
                  value={profileData.mobile}
                  onChange={(e) => handleProfileUpdate('mobile', e.target.value)}
                />
              ) : (
                <div className="settings-form-value">{profileData.mobile}</div>
              )}
            </div>
          </div>

          <div className="settings-form-field">
            <label className="settings-form-label">Location</label>
            {isEditingProfile ? (
              <Input
                value={profileData.location}
                onChange={(e) => handleProfileUpdate('location', e.target.value)}
              />
            ) : (
              <div className="settings-form-value">{profileData.location}</div>
            )}
          </div>

          {isEditingProfile && (
            <div className="settings-form-actions">
              <Button variant="primary" onClick={() => setIsEditingProfile(false)}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAccountSection = () => (
    <div className="settings-content-section">
      <div className="settings-section-header">
        <h3 className="settings-section-title">Account Settings</h3>
        <p className="settings-section-subtitle">Manage your account security and login preferences</p>
      </div>

      <div className="settings-form-section">
        <div className="settings-form-field">
          <label className="settings-form-label">Email Address</label>
          <div className="settings-account-field">
            {isChangingEmail ? (
              <div className="settings-email-change">
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                  error={emailError}
                />
                <div className="settings-field-actions">
                  <Button variant="primary" onClick={handleEmailChange}>
                    Update
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setEmailError('');
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="settings-form-value">{accountData.email}</div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingEmail(true)}
                  className="settings-change-btn"
                >
                  Change Email
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="settings-form-field">
          <label className="settings-form-label">Password</label>
          <div className="settings-account-field">
            {isChangingPassword ? (
              <div className="settings-password-change">
                <p className="settings-password-info">
                  A password reset link will be sent to your email address.
                </p>
                <div className="settings-field-actions">
                  <Button variant="primary" onClick={handlePasswordChange}>
                    Send Reset Link
                  </Button>
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="settings-password-field">
                  <span className="settings-form-value">
                    {showPassword ? 'mypassword123' : '••••••••••••'}
                  </span>
                  <button 
                    className="settings-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsChangingPassword(true)}
                  className="settings-change-btn"
                >
                  Change Password
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="settings-form-field">
          <label className="settings-form-label">2-Step Verification</label>
          <div className="settings-account-field">
            <div className="settings-2fa-info">
              <span className="settings-form-value">
                {accountData.twoStepVerification ? 'Enabled' : 'Disabled'}
              </span>
              <p className="settings-field-description">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="settings-toggle" onClick={toggle2FA}>
              <div className={`settings-toggle-track ${accountData.twoStepVerification ? 'active' : ''}`}>
                <div className={`settings-toggle-knob ${accountData.twoStepVerification ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="settings-content-section">
      <div className="settings-section-header">
        <h3 className="settings-section-title">Notification Settings</h3>
        <p className="settings-section-subtitle">Choose which notifications you want to receive</p>
      </div>

      <div className="settings-form-section">
        <h4 className="settings-notification-group-title">All Notifications</h4>
        
        <div className="settings-notification-item">
          <div className="settings-notification-info">
            <label className="settings-notification-label">Desktop Notifications</label>
            <p className="settings-notification-description">
              Receive notifications directly on your desktop when important events occur
            </p>
          </div>
          <div className="settings-toggle" onClick={() => toggleNotification('desktop')}>
            <div className={`settings-toggle-track ${notifications.desktop ? 'active' : ''}`}>
              <div className={`settings-toggle-knob ${notifications.desktop ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="settings-notification-item">
          <div className="settings-notification-info">
            <label className="settings-notification-label">Email Notifications</label>
            <p className="settings-notification-description">
              Get important updates and alerts sent to your email address
            </p>
          </div>
          <div className="settings-toggle" onClick={() => toggleNotification('email')}>
            <div className={`settings-toggle-track ${notifications.email ? 'active' : ''}`}>
              <div className={`settings-toggle-knob ${notifications.email ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="settings-notification-item">
          <div className="settings-notification-info">
            <label className="settings-notification-label">Update Notifications</label>
            <p className="settings-notification-description">
              Stay informed about system updates and new features
            </p>
          </div>
          <div className="settings-toggle" onClick={() => toggleNotification('updates')}>
            <div className={`settings-toggle-track ${notifications.updates ? 'active' : ''}`}>
              <div className={`settings-toggle-knob ${notifications.updates ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="settings-divider"></div>

        <h4 className="settings-notification-group-title">Activities Notifications</h4>

        <div className="settings-notification-item">
          <div className="settings-notification-info">
            <label className="settings-notification-label">All Reminders & Activities</label>
            <p className="settings-notification-description">
              Receive notifications for property visits, deadlines, and scheduled tasks
            </p>
          </div>
          <div className="settings-toggle" onClick={() => toggleNotification('reminders')}>
            <div className={`settings-toggle-track ${notifications.reminders ? 'active' : ''}`}>
              <div className={`settings-toggle-knob ${notifications.reminders ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>

        <div className="settings-notification-item">
          <div className="settings-notification-info">
            <label className="settings-notification-label">Updates</label>
            <p className="settings-notification-description">
              Get notified when properties are updated or assignments change
            </p>
          </div>
          <div className="settings-toggle" onClick={() => toggleNotification('activities')}>
            <div className={`settings-toggle-track ${notifications.activities ? 'active' : ''}`}>
              <div className={`settings-toggle-knob ${notifications.activities ? 'active' : ''}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-container">
      {/* Header with logo and account toggle */}
      <div className="settings-header">
        <div className="settings-header-left">
          <img 
            src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/e71dc262b006089798db2062a87eba7df0a53713?placeholderIfAbsent=true"
            alt="Back"
            className="settings-back-icon"
          />
          <div className="settings-url-bar">
            <span className="settings-url">https://housekeepers.com</span>
            <img 
              src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/ab3c402689ba3c12d1bcce6e17c4c340179cc5ab?placeholderIfAbsent=true"
              alt="Dropdown"
              className="settings-url-dropdown"
            />
          </div>
        </div>
        <img 
          src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/7759087292dfb8e59cee6050c6d510a2b43e713a?placeholderIfAbsent=true"
          alt="Menu"
          className="settings-menu-icon"
        />
      </div>

      <div className="settings-layout">
        {/* Sidebar */}
        <div className="settings-sidebar">
          <div className="settings-sidebar-content">
            <div className="settings-logo">
              <img 
                src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f59cfd379b0660c1dc6b0e7ac118e100d0156d3d?placeholderIfAbsent=true"
                alt="Logo"
                className="settings-logo-icon"
              />
              <span className="settings-logo-text">Housekeepers</span>
            </div>

            <nav className="settings-nav">
              <div className="settings-nav-item">
                <div className="settings-nav-icon"></div>
                <span>Overview</span>
              </div>
              <div className="settings-nav-item">
                <div className="settings-nav-icon"></div>
                <span>All Properties</span>
              </div>
              <div className="settings-nav-item">
                <div className="settings-nav-icon"></div>
                <span>Properties Notifications</span>
              </div>
              <div className="settings-nav-item">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/75c11c950cedfd35f686dea8ac8661e533fe75df?placeholderIfAbsent=true"
                  alt="Calendar"
                  className="settings-nav-icon"
                />
                <span>Scheduled Visits</span>
              </div>
              <div className="settings-nav-item">
                <div className="settings-nav-icon"></div>
                <span>Visit Logs</span>
              </div>
              <div className="settings-nav-item">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/e1c8ad187675a4b8102c2312297de8e46d1e25f2?placeholderIfAbsent=true"
                  alt="Bot"
                  className="settings-nav-icon"
                />
                <span>Train Bots</span>
              </div>
              <div className="settings-nav-item active">
                <div className="settings-nav-icon"></div>
                <span>Settings</span>
              </div>
              <div className="settings-nav-item">
                <img 
                  src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/eb04e19b734f40615a0437afcb57df342f9d438e?placeholderIfAbsent=true"
                  alt="Help"
                  className="settings-nav-icon"
                />
                <span>Help Center</span>
              </div>
            </nav>

            <div className="settings-sidebar-divider"></div>

            <div className="settings-sidebar-profile">
              <img 
                src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true"
                alt="Profile"
                className="settings-sidebar-avatar"
              />
              <div className="settings-sidebar-profile-info">
                <div className="settings-sidebar-profile-name">Anthony Bridge</div>
                <div className="settings-sidebar-profile-email">a.bridge@gmail.com</div>
                <div className="settings-sidebar-logout">Log out</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="settings-main">
          <div className="settings-main-header">
            <div className="settings-search-section">
              <div className="settings-search-bar">
                <span className="settings-search-placeholder">Enter Property Name</span>
                <Search className="settings-search-icon" size={24} />
              </div>
              <div className="settings-notification-bell">
                <Bell size={20} />
                <div className="settings-notification-dot"></div>
              </div>
            </div>

            <div className="settings-account-switch">
              <span className="settings-switch-label">Switch account type</span>
              <div className="settings-switch-container">
                <span className={`settings-switch-text ${accountType === 'Creator' ? 'active' : ''}`}>
                  Creator
                </span>
                <div className="settings-account-toggle" onClick={toggleAccountType}>
                  <div className={`settings-account-toggle-knob ${accountType === 'Trainer' ? 'trainer' : 'creator'}`}></div>
                </div>
                <span className={`settings-switch-text ${accountType === 'Trainer' ? 'active' : ''}`}>
                  Trainer
                </span>
              </div>
            </div>
          </div>

          <div className="settings-page-header">
            <h1 className="settings-page-title">Settings</h1>
            <p className="settings-page-subtitle">
              Adjust your preferences on how your account works
            </p>
          </div>

          <div className="settings-content">
            <div className="settings-tabs">
              <button 
                className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile
              </button>
              <button 
                className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                Account
              </button>
              <button 
                className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
            </div>

            <div className="settings-tab-divider"></div>

            <div className="settings-content-area">
              {activeTab === 'profile' && renderProfileSection()}
              {activeTab === 'account' && renderAccountSection()}
              {activeTab === 'notifications' && renderNotificationsSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
