import React, { useState } from 'react';
import { User, MapPin, Upload } from 'lucide-react';
import { FormLayout, Input, Button, CountrySelector } from '../Authshared/general';
import profileTrainer from '../../Assets/createprofiletrainer.jpg'
import profileCreator from '../../Assets/createprofilecreator.jpg'

const ProfilePage = ({ accountType, onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    countryCode: '+1',
    mobile: '',
    agreeToTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  //image upload section
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append('firstName', formData.firstName);
    payload.append('lastName', formData.lastName);
    payload.append('location', formData.location);
    payload.append('countryCode', formData.countryCode);
    payload.append('mobile', formData.mobile);
    if (profileImageFile) {
      payload.append('profileImage', profileImageFile);
    }

    // Simulate API call
    console.log('Submitting form with image...');
    alert('Profile created successfully!');
  };

  // 🔄 Dynamically choose the image based on accountType
  const profileImage = accountType === 'Trainer'
    ? profileTrainer
    : profileCreator;

  return (
    <FormLayout 
      title="Create your profile"
      subtitle="Fill in your details so we can know you better!"
      showAccountType={false}
      customImage={profileImage} 
    >
      <form onSubmit={handleSubmit} className="profile-form">
        <div>
          <label className="form-label">Profile Image</label>
          <div className="profile-image-container">
            <div className="profile-image-placeholder">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Preview"
                  className="profile-image-preview"
                />
              ) : (
                <User className="profile-placeholder-icon" />
              )}
            </div>

            <label className="profile-image-upload">
              <Upload className="upload-icon" />
              Upload profile image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden-file-input"
              />
            </label>
          </div>
        </div>

        <div className="name-fields-grid">
          <div>
            <label className="form-label">First Name</label>
            <Input
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <Input
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="form-label">Location</label>
          <Input
            placeholder="City, State, Country"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            icon={MapPin}
            required
          />
        </div>

        <div>
          <label className="form-label">Mobile number</label>
          <div className="phone-input-container">
            <CountrySelector
              value={formData.countryCode}
              onChange={(value) => handleInputChange('countryCode', value)}
            />
            <Input
              type="tel"
              placeholder="(555) 000-0000"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="phone-input"
              required
            />
          </div>
        </div>

        <div className="terms-checkbox-container">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="terms-checkbox"
            checked={formData.agreeToTerms}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            required
          />
          <label htmlFor="agreeToTerms" className="terms-checkbox-label">
            By creating a profile, I agree to the{' '}
            <a href="/" className="form-link">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href="/" className="form-link">
              Terms & Conditions
            </a>
          </label>
        </div>

        <Button type="submit">
          Create Profile
        </Button>

        {/* <div className="change-password-section">
          <button
            type="button"
            onClick={() => onNavigate('changePassword')}
            className="form-link change-password-link"
          >
            Want to change your password?
          </button>
        </div> */}
      </form>
    </FormLayout>
  );
};

export default ProfilePage;