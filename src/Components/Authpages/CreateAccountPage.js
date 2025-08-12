import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { FormLayout, Input, Button, PasswordValidation, GoogleIcon } from '../Authshared/general';

const CreateAccountPage = ({ accountType, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Create account:', formData, 'Account type:', accountType);
    // Show congratulations modal after account creation
    onNavigate('showCongratulations');
  };

  return (
    <FormLayout
      title="Create an account"
      accountType={accountType}
      subtitle={`As a ${accountType.toLowerCase()}, you would be able to ${
        accountType === 'Creator' ? 'list properties and assign them to trainers' : 'manage assigned properties and training sessions'
      }.`}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Email</label>
          <Input
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            icon={Mail}
            required
          />
        </div>

        <div>
          <label className="form-label">Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            icon={Lock}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            required
          />
          <PasswordValidation password={formData.password} />
        </div>

        <div>
          <label className="form-label">Confirm Password</label>
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            icon={Lock}
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            required
          />
        </div>

        <div className="form-checkbox-container">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="form-checkbox"
          />
          <label htmlFor="terms" className="form-checkbox-label">
            By signing up, I agree to the{' '}
            <a href="/" className="form-link">
              Terms and Conditions
            </a>
          </label>
        </div>

        <Button type="submit" disabled={!acceptTerms}>
          Create Account
        </Button>

        <div className="divider">
          <div className="divider-line">
            <div className="divider-border"></div>
          </div>
          <div className="divider-text">
            <span>OR</span>
          </div>
        </div>

        <Button variant="outline">
          <div className="google-button-content">
            <GoogleIcon />
            Sign up with Google
          </div>
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="form-link"
          >
            Log in
          </button>
        </p>
      </form>
    </FormLayout>
  );
};

export default CreateAccountPage;
