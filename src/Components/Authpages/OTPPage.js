import React, { useState, useEffect } from 'react';
import { FormLayout, Button } from '../Authshared/general';
import WelcomeModal from './WelcomeModal';
import otpTrainer from '../../Assets/otptrainer.jpg';
import otpCreator from '../../Assets/otpcreator.jpg'

const OTPPage = ({ accountType, onNavigate }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(25);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(25);
    setOtp(['', '', '', '', '', '']);
    // Focus first input
    const firstInput = document.getElementById('otp-0');
    if (firstInput) firstInput.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }
    console.log('OTP:', otpValue);
    setShowWelcomeModal(true); // Show welcome modal after successful verification
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    onNavigate('login'); // Navigate to login when modal is closed
  };

  const handleGetStarted = () => {
    setShowWelcomeModal(false);
    onNavigate('login'); // Navigate to login when "Get Started" is clicked
  };

  const isComplete = otp.every(digit => digit !== '');

  // 🔄 Dynamically choose the image based on accountType
  const otpImage = accountType === 'Trainer'
    ? otpTrainer
    : otpCreator;

  return (
    <>
      <FormLayout
        title="Enter your OTP"
        subtitle="Enter your OTP to verify your email address"
        showAccountType={false}
        accountType={accountType}
        customImage={otpImage} // 👈 Pass to layout
      >
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                autoComplete="off"
              />
            ))}
          </div>

          <div className="otp-timer">
            <span className="otp-timer-text">Code expires in </span>
            <span className="otp-timer-time">
              0:{timeLeft.toString().padStart(2, '0')} Secs
            </span>
          </div>

          <Button type="submit" disabled={!isComplete}>
            Verify your Email
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">Didn't receive the OTP? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0}
              className={`text-sm font-semibold ${
                timeLeft > 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'form-link cursor-pointer'
              }`}
            >
              Resend
            </button>
          </div>
        </form>
      </FormLayout>

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleWelcomeModalClose}
        onGetStarted={handleGetStarted}
      />
    </>
  );
};

export default OTPPage;
