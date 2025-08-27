import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logoImage from '../../Assets/Logo/LOGO1.png'
import trainerImage from '../../Assets/traineraccount.jpg';
import creatorImage from '../../Assets/creatoraccount.jpg';



// Logo Component
export const Logo = ({ size = 'md' }) => {
  return (
    <div className={`logo logo-${size}`}>
      <img 
        src={logoImage} 
        alt="App Logo" 
        className="w-full h-auto object-contain" 
      />
    </div>
  );
};

// Account Toggle Component
export const AccountToggle = ({ accountType, onToggle }) => (
  <div className="account-toggle">
    <span className="account-toggle-label">
      Switch account type
    </span>
    <div className="account-toggle-container">
      <span className={`account-toggle-text ${accountType === 'Creator' ? 'active' : 'inactive'}`}>
        Creator
      </span>
      <button
        className="account-toggle-switch"
        onClick={onToggle}
        aria-label={`Switch to ${accountType === 'Creator' ? 'Trainer' : 'Creator'} account`}
        role="switch"
        aria-checked={accountType === 'Trainer'}
        type="button"
      >
        <div className={`account-toggle-knob ${accountType === 'Trainer' ? 'trainer' : 'creator'}`} />
      </button>
      <span className={`account-toggle-text ${accountType === 'Trainer' ? 'active' : 'inactive'}`}>
        Trainer
      </span>
    </div>
  </div>
);

// Header Component
export const Header = ({ accountType, onToggle }) => (
  <header className="header">
    <div className="header-content">
      <Logo size="md" />
      <div className="header-toggle-wrapper">
        <AccountToggle accountType={accountType} onToggle={onToggle} />
      </div>
    </div>
  </header>
);

// Form Layout Component
export const FormLayout = ({ 
  children,
  title, 
  subtitle, 
  accountType, 
  showAccountType = true, 
  customImage = null // 👈 Add this
}) => {
  const imageSrc = customImage 
    ? customImage 
    : accountType === 'Trainer'
      ? trainerImage
      : creatorImage;

  return (
    <div className="form-layout">
      <div className="form-layout-content">
        {/* Left Image Section */}
        <div className="form-layout-image">
          <img 
            src={imageSrc} 
            alt={accountType === 'Trainer' ? 'Trainer image' : 'Creator image'} 
            className="w-full h-full object-cover"
          />

          <div className="form-layout-image-overlay" />
        </div>
        
        {/* Right Form Section */}
        <div className="form-layout-form">
          <div className="form-layout-container">
            <div className="form-layout-logo">
              <Logo size="lg" />
            </div>
            
            <div className="form-layout-header">
              <h1 className="form-layout-title">{title}</h1>
              {accountType && showAccountType && (
                <div className="form-layout-account-type">
                  <div className="form-layout-account-dot" />
                  <span className="form-layout-account-text">{accountType}</span>
                </div>
              )}
              {subtitle && (
                <p className="form-layout-subtitle">{subtitle}</p>
              )}
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Input Component
export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  icon: Icon,
  showPassword,
  togglePassword,
  error,
  className = '',
  ...props 
}) => (
  <div className="input-container">
    <div className="input-wrapper">
      {Icon && (
        <Icon className="input-icon" />
      )}
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${Icon ? 'with-icon' : 'without-icon'} ${
          type === 'password' ? 'with-password' : 'without-password'
        } ${error ? 'error' : ''} ${className}`}
        {...props}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePassword}
          className="input-password-toggle"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
    {error && <p className="input-error">{error}</p>}
  </div>
);

// Button Component
export const Button = ({ children, variant = 'primary', onClick, disabled, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Password Validation Component
export const PasswordValidation = ({ password }) => {
  const validations = [
    { text: 'Minimum 6 Characters Long - The More, The Better', valid: password.length >= 6 },
    { text: 'At Least One Lowercase Character', valid: /[a-z]/.test(password) },
    { text: 'At Least One Uppercase Character', valid: /[A-Z]/.test(password) },
    { text: 'At Least One Number or Symbol', valid: /[\d\W]/.test(password) }
  ];

  if (!password) return null;

  return (
    <div className="password-validation">
      {validations.map((validation, index) => (
        <div key={index} className="password-validation-item">
          <div className={`password-validation-icon ${validation.valid ? 'valid' : 'invalid'}`}>
            {validation.valid ? '✓' : '○'}
          </div>
          <span className={`password-validation-text ${validation.valid ? 'valid' : 'invalid'}`}>
            {validation.text}
          </span>
        </div>
      ))}
    </div>
  );
};

// Country codes data
const countryCodes = [
  { code: '+93', country: 'Afghanistan', flag: 'af' },
  { code: '+355', country: 'Albania', flag: 'al' },
  { code: '+213', country: 'Algeria', flag: 'dz' },
  { code: '+1', country: 'American Samoa', flag: 'as' },
  { code: '+376', country: 'Andorra', flag: 'ad' },
  { code: '+244', country: 'Angola', flag: 'ao' },
  { code: '+1', country: 'Anguilla', flag: 'ai' },
  { code: '+1', country: 'Antigua and Barbuda', flag: 'ag' },
  { code: '+54', country: 'Argentina', flag: 'ar' },
  { code: '+374', country: 'Armenia', flag: 'am' },
  { code: '+297', country: 'Aruba', flag: 'aw' },
  { code: '+61', country: 'Australia', flag: 'au' },
  { code: '+43', country: 'Austria', flag: 'at' },
  { code: '+994', country: 'Azerbaijan', flag: 'az' },
  { code: '+1', country: 'Bahamas', flag: 'bs' },
  { code: '+973', country: 'Bahrain', flag: 'bh' },
  { code: '+880', country: 'Bangladesh', flag: 'bd' },
  { code: '+1', country: 'Barbados', flag: 'bb' },
  { code: '+375', country: 'Belarus', flag: 'by' },
  { code: '+32', country: 'Belgium', flag: 'be' },
  { code: '+501', country: 'Belize', flag: 'bz' },
  { code: '+229', country: 'Benin', flag: 'bj' },
  { code: '+1', country: 'Bermuda', flag: 'bm' },
  { code: '+975', country: 'Bhutan', flag: 'bt' },
  { code: '+591', country: 'Bolivia', flag: 'bo' },
  { code: '+387', country: 'Bosnia and Herzegovina', flag: 'ba' },
  { code: '+267', country: 'Botswana', flag: 'bw' },
  { code: '+55', country: 'Brazil', flag: 'br' },
  { code: '+246', country: 'British Indian Ocean Territory', flag: 'io' },
  { code: '+673', country: 'Brunei', flag: 'bn' },
  { code: '+359', country: 'Bulgaria', flag: 'bg' },
  { code: '+226', country: 'Burkina Faso', flag: 'bf' },
  { code: '+257', country: 'Burundi', flag: 'bi' },
  { code: '+855', country: 'Cambodia', flag: 'kh' },
  { code: '+237', country: 'Cameroon', flag: 'cm' },
  { code: '+1', country: 'Canada', flag: 'ca' },
  { code: '+238', country: 'Cape Verde', flag: 'cv' },
  { code: '+1', country: 'Cayman Islands', flag: 'ky' },
  { code: '+236', country: 'Central African Republic', flag: 'cf' },
  { code: '+235', country: 'Chad', flag: 'td' },
  { code: '+56', country: 'Chile', flag: 'cl' },
  { code: '+86', country: 'China', flag: 'cn' },
  { code: '+57', country: 'Colombia', flag: 'co' },
  { code: '+269', country: 'Comoros', flag: 'km' },
  { code: '+242', country: 'Congo (Brazzaville)', flag: 'cg' },
  { code: '+243', country: 'Congo (Kinshasa)', flag: 'cd' },
  { code: '+682', country: 'Cook Islands', flag: 'ck' },
  { code: '+506', country: 'Costa Rica', flag: 'cr' },
  { code: '+385', country: 'Croatia', flag: 'hr' },
  { code: '+53', country: 'Cuba', flag: 'cu' },
  { code: '+357', country: 'Cyprus', flag: 'cy' },
  { code: '+420', country: 'Czech Republic', flag: 'cz' },
  { code: '+45', country: 'Denmark', flag: 'dk' },
  { code: '+253', country: 'Djibouti', flag: 'dj' },
  { code: '+1', country: 'Dominica', flag: 'dm' },
  { code: '+1', country: 'Dominican Republic', flag: 'do' },
  { code: '+593', country: 'Ecuador', flag: 'ec' },
  { code: '+20', country: 'Egypt', flag: 'eg' },
  { code: '+503', country: 'El Salvador', flag: 'sv' },
  { code: '+240', country: 'Equatorial Guinea', flag: 'gq' },
  { code: '+291', country: 'Eritrea', flag: 'er' },
  { code: '+372', country: 'Estonia', flag: 'ee' },
  { code: '+251', country: 'Ethiopia', flag: 'et' },
  { code: '+679', country: 'Fiji', flag: 'fj' },
  { code: '+358', country: 'Finland', flag: 'fi' },
  { code: '+33', country: 'France', flag: 'fr' },
  { code: '+594', country: 'French Guiana', flag: 'gf' },
  { code: '+689', country: 'French Polynesia', flag: 'pf' },
  { code: '+241', country: 'Gabon', flag: 'ga' },
  { code: '+220', country: 'Gambia', flag: 'gm' },
  { code: '+995', country: 'Georgia', flag: 'ge' },
  { code: '+49', country: 'Germany', flag: 'de' },
  { code: '+233', country: 'Ghana', flag: 'gh' },
  { code: '+350', country: 'Gibraltar', flag: 'gi' },
  { code: '+30', country: 'Greece', flag: 'gr' },
  { code: '+299', country: 'Greenland', flag: 'gl' },
  { code: '+1', country: 'Grenada', flag: 'gd' },
  { code: '+590', country: 'Guadeloupe', flag: 'gp' },
  { code: '+1', country: 'Guam', flag: 'gu' },
  { code: '+502', country: 'Guatemala', flag: 'gt' },
  { code: '+224', country: 'Guinea', flag: 'gn' },
  { code: '+245', country: 'Guinea-Bissau', flag: 'gw' },
  { code: '+592', country: 'Guyana', flag: 'gy' },
  { code: '+1', country: 'Montserrat', flag: 'ms' },
  { code: '+212', country: 'Morocco', flag: 'ma' },
  { code: '+258', country: 'Mozambique', flag: 'mz' },
  { code: '+95', country: 'Myanmar (Burma)', flag: 'mm' },
  { code: '+264', country: 'Namibia', flag: 'na' },
  { code: '+674', country: 'Nauru', flag: 'nr' },
  { code: '+977', country: 'Nepal', flag: 'np' },
  { code: '+31', country: 'Netherlands', flag: 'nl' },
  { code: '+687', country: 'New Caledonia', flag: 'nc' },
  { code: '+64', country: 'New Zealand', flag: 'nz' },
  { code: '+505', country: 'Nicaragua', flag: 'ni' },
  { code: '+227', country: 'Niger', flag: 'ne' },
  { code: '+234', country: 'Nigeria', flag: 'ng' },
  { code: '+683', country: 'Niue', flag: 'nu' },
  { code: '+850', country: 'North Korea', flag: 'kp' },
  { code: '+47', country: 'Norway', flag: 'no' },
  { code: '+968', country: 'Oman', flag: 'om' },
  { code: '+92', country: 'Pakistan', flag: 'pk' },
  { code: '+680', country: 'Palau', flag: 'pw' },
  { code: '+970', country: 'Palestine', flag: 'ps' },
  { code: '+507', country: 'Panama', flag: 'pa' },
  { code: '+675', country: 'Papua New Guinea', flag: 'pg' },
  { code: '+595', country: 'Paraguay', flag: 'py' },
  { code: '+51', country: 'Peru', flag: 'pe' },
  { code: '+63', country: 'Philippines', flag: 'ph' },
  { code: '+48', country: 'Poland', flag: 'pl' },
  { code: '+351', country: 'Portugal', flag: 'pt' },
  { code: '+1', country: 'Puerto Rico', flag: 'pr' },
  { code: '+974', country: 'Qatar', flag: 'qa' },
  { code: '+40', country: 'Romania', flag: 'ro' },
  { code: '+7', country: 'Russia', flag: 'ru' },
  { code: '+250', country: 'Rwanda', flag: 'rw' },
  { code: '+1', country: 'Saint Kitts and Nevis', flag: 'kn' },
  { code: '+1', country: 'Saint Lucia', flag: 'lc' },
  { code: '+590', country: 'Saint Martin', flag: 'mf' },
  { code: '+508', country: 'Saint Pierre and Miquelon', flag: 'pm' },
  { code: '+1', country: 'Saint Vincent and the Grenadines', flag: 'vc' },
  { code: '+685', country: 'Samoa', flag: 'ws' },
  { code: '+378', country: 'San Marino', flag: 'sm' },
  { code: '+239', country: 'São Tomé and Príncipe', flag: 'st' },
  { code: '+966', country: 'Saudi Arabia', flag: 'sa' },
  { code: '+221', country: 'Senegal', flag: 'sn' },
  { code: '+381', country: 'Serbia', flag: 'rs' },
  { code: '+248', country: 'Seychelles', flag: 'sc' },
  { code: '+232', country: 'Sierra Leone', flag: 'sl' },
  { code: '+65', country: 'Singapore', flag: 'sg' },
  { code: '+421', country: 'Slovakia', flag: 'sk' },
  { code: '+386', country: 'Slovenia', flag: 'si' },
  { code: '+677', country: 'Solomon Islands', flag: 'sb' },
  { code: '+252', country: 'Somalia', flag: 'so' },
  { code: '+27', country: 'South Africa', flag: 'za' },
  { code: '+211', country: 'South Sudan', flag: 'ss' },
  { code: '+34', country: 'Spain', flag: 'es' },
  { code: '+94', country: 'Sri Lanka', flag: 'lk' },
  { code: '+249', country: 'Sudan', flag: 'sd' },
  { code: '+597', country: 'Suriname', flag: 'sr' },
  { code: '+268', country: 'Swaziland (Eswatini)', flag: 'sz' },
  { code: '+46', country: 'Sweden', flag: 'se' },
  { code: '+41', country: 'Switzerland', flag: 'ch' },
  { code: '+963', country: 'Syria', flag: 'sy' },
  { code: '+886', country: 'Taiwan', flag: 'tw' },
  { code: '+992', country: 'Tajikistan', flag: 'tj' },
  { code: '+255', country: 'Tanzania', flag: 'tz' },
  { code: '+66', country: 'Thailand', flag: 'th' },
  { code: '+670', country: 'Timor-Leste', flag: 'tl' },
  { code: '+228', country: 'Togo', flag: 'tg' },
  { code: '+690', country: 'Tokelau', flag: 'tk' },
  { code: '+676', country: 'Tonga', flag: 'to' },
  { code: '+1', country: 'Trinidad and Tobago', flag: 'tt' },
  { code: '+216', country: 'Tunisia', flag: 'tn' },
  { code: '+90', country: 'Turkey', flag: 'tr' },
  { code: '+993', country: 'Turkmenistan', flag: 'tm' },
  { code: '+688', country: 'Tuvalu', flag: 'tv' },
  { code: '+256', country: 'Uganda', flag: 'ug' },
  { code: '+380', country: 'Ukraine', flag: 'ua' },
  { code: '+971', country: 'United Arab Emirates', flag: 'ae' },
  { code: '+44', country: 'United Kingdom', flag: 'gb' },
  { code: '+1', country: 'United States', flag: 'us' },
  { code: '+598', country: 'Uruguay', flag: 'uy' },
  { code: '+998', country: 'Uzbekistan', flag: 'uz' },
  { code: '+678', country: 'Vanuatu', flag: 'vu' },
  { code: '+379', country: 'Vatican City', flag: 'va' },
  { code: '+58', country: 'Venezuela', flag: 've' },
  { code: '+84', country: 'Vietnam', flag: 'vn' },
  { code: '+967', country: 'Yemen', flag: 'ye' },
  { code: '+260', country: 'Zambia', flag: 'zm' },
  { code: '+263', country: 'Zimbabwe', flag: 'zw' }
];

// Country Selector Component
export const CountrySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCountries = countryCodes.filter(country =>
    country.country.toLowerCase().includes(search.toLowerCase()) ||
    country.code.includes(search)
  );

  const selectedCountry = countryCodes.find(c => c.code === value) || countryCodes[0];

  return (
    <div className="country-selector">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="country-selector-button"
      >
        <span className="mr-1">{selectedCountry.flag}</span>
        <span>{selectedCountry.code}</span>
      </button>
      
      {isOpen && (
        <div className="country-selector-dropdown">
          <div className="country-selector-search">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="country-selector-list">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                  setSearch('');
                }}
                className="country-selector-item"
              >
                <span>{country.flag}</span>
                <span className="country-selector-item-code">{country.code}</span>
                <span className="country-selector-item-name">{country.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Google Button SVG
export const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
