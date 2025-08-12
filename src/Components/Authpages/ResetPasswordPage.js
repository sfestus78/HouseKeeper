import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { FormLayout, Input, Button } from '../Authshared/general';
import forgotpwdCreator from '../../Assets/forgottenpwdcreator.jpg'
import forgotpwdTrainer from '../../Assets/forgottenpwdtrainer.jpg'

const ResetPasswordPage = ({ accountType, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reset password for:', email);
      alert('Password reset email sent! Please check your inbox.');
      setIsLoading(false);
      onNavigate('login');
    }, 2000);
  };

   // 🔄 Dynamically choose the image based on accountType
    const forgotpwdImage = accountType === 'Trainer'
      ? forgotpwdTrainer
      : forgotpwdCreator;

  return (
    <FormLayout
      title="Forgot Password?" 
      subtitle="Don't worry we can help you out! If you still remember your email address you can quickly reset your password."
      showAccountType={false}
      customImage={forgotpwdImage}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Email</label>
          <Input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Request Password Change'}
        </Button>

      </form>
    </FormLayout>
  );
};

export default ResetPasswordPage;