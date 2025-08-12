import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { FormLayout, Input, Button, GoogleIcon } from '../Authshared/general';
import loginTrainer from '../../Assets/logintrainer.jpg';
import loginCreator from '../../Assets/logincreator.jpg';

const LoginPage = ({ accountType, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    onNavigate('profile'); // Navigate to profile creation after login
  };

   // 🔄 Dynamically choose the image based on accountType
    const loginImage = accountType === 'Trainer'
      ? loginTrainer
      : loginCreator;

  return (
    <FormLayout 
      title="Log in to your account" 
      accountType={accountType}
      subtitle={`As a ${accountType.toLowerCase()}, you would be able to ${
        accountType === 'Creator' ? 'list properties and assign them to trainers' : 'manage assigned properties and training sessions'
      }.`}
      customImage={loginImage}
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('reset')}
            className="form-link purple"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit">
          Log in
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
            Log in with Google
          </div>
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate('createAccount')}
            className="form-link"
          >
            Sign up
          </button>
        </p>
      </form>
    </FormLayout>
  );
};

export default LoginPage;