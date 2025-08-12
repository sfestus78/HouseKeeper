import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { FormLayout, Input, Button, PasswordValidation } from '../Authshared/general';
import ChangePwdCreator from '../../Assets/changepwdcreator.jpg'
import ChangePwdTrainer from '../../Assets/changepwdtrainer.jpg'

const ChangePasswordPage = ({ accountType, onNavigate }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validatePasswords = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match!');
      return false;
    }
    
    if (formData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long!');
      return false;
    }

    if (formData.oldPassword === formData.newPassword) {
      alert('New password must be different from the old password!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Change password:', { ...formData, oldPassword: '[HIDDEN]', newPassword: '[HIDDEN]' });
      alert('Password changed successfully!');
      setIsLoading(false);
      onNavigate('login');
    }, 2000);
  };

  const isFormValid = formData.oldPassword && formData.newPassword && formData.confirmPassword;

  // 🔄 Dynamically choose the image based on accountType
    const changeImage = accountType === 'Trainer'
      ? ChangePwdTrainer
      : ChangePwdCreator;

  return (
    <FormLayout 
      title="Change Password" 
      subtitle="Input your new desired password in the input fields below to create a new password."
      showAccountType={false}
      customImage={changeImage} // 👈 Pass to layout
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Old Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.oldPassword}
            onChange={(e) => handleInputChange('oldPassword', e.target.value)}
            icon={Lock}
            showPassword={showPasswords.old}
            togglePassword={() => togglePasswordVisibility('old')}
            required
          />
        </div>

        <div>
          <label className="form-label">New Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            icon={Lock}
            showPassword={showPasswords.new}
            togglePassword={() => togglePasswordVisibility('new')}
            required
          />
          <PasswordValidation password={formData.newPassword} />
        </div>

        <div>
          <label className="form-label">Confirm New Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            icon={Lock}
            showPassword={showPasswords.confirm}
            togglePassword={() => togglePasswordVisibility('confirm')}
            required
          />
          {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <Button type="submit" disabled={!isFormValid || isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>

        <div className="flex justify-center gap-4 text-center text-sm">
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="form-link"
          >
            Back to Profile
          </button>
          <span className="text-gray-400">|</span>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="form-link"
          >
            Back to Login
          </button>
        </div>
      </form>
    </FormLayout>
  );
};

export default ChangePasswordPage;