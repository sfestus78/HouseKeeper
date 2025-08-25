# Settings Page Component

A comprehensive settings page component that provides users with the ability to manage their profile, account security, and notification preferences.

## Features

### Profile Settings
- **Profile Picture Upload**: Users can upload and change their profile picture with live preview
- **User Role Badge**: Dynamically displays "Creator" or "Trainer" based on account type
- **User Information Display**: Shows user's name and property count
- **Personal Information Management**: Editable form with fields for:
  - First Name
  - Last Name
  - Email Address (read-only in profile section)
  - Mobile Number
  - Location
- **Edit Mode**: Toggle between view and edit modes with save/cancel functionality

### Account Settings
- **Email Management**: Change email address with validation
- **Password Management**: Secure password change with email reset link
- **2-Step Verification**: Toggle for enhanced account security
- **Password Visibility Toggle**: Show/hide password functionality

### Notification Settings
- **All Notifications**:
  - Desktop Notifications (with descriptive text)
  - Email Notifications (with descriptive text)
  - Update Notifications (with descriptive text)
- **Activities Notifications**:
  - All Reminders & Activities (with descriptive text)
  - Updates (with descriptive text)

## Technical Features

- **Fully Responsive**: Works on desktop, tablet, and mobile devices
- **Real Functionality**: All buttons and toggles are functional (not placeholders)
- **Form Validation**: Email validation for email changes
- **State Management**: Proper React state management for all form data
- **File Upload**: Working profile picture upload with preview
- **Consistent Design**: Follows existing design system and color scheme
- **Accessibility**: Proper hover states and interactive feedback

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `accountType` | string | 'Creator' | Current account type ('Creator' or 'Trainer') |
| `onAccountTypeChange` | function | undefined | Callback function when account type is changed |

## Usage

```jsx
import SettingsPage from './Components/Settings/SettingsPage';

function App() {
  const [accountType, setAccountType] = useState('Creator');

  return (
    <SettingsPage 
      accountType={accountType}
      onAccountTypeChange={setAccountType}
    />
  );
}
```

## Design System Integration

The component follows the existing design system patterns:

- **Colors**: Uses CSS variables from `index.css` (--primary-color, --text-primary, etc.)
- **Typography**: Uses 'Lato' font family with proper font weights and sizes
- **Components**: Integrates with existing Input and Button components from Authshared
- **Responsive**: Follows existing breakpoint patterns (991px, 768px, 480px)
- **Styling**: Uses unique class names with "settings-" prefix to avoid conflicts

## File Structure

```
src/Components/Settings/
├── SettingsPage.jsx        # Main component
├── SettingsPage.css        # Component styles
├── index.js                # Export file
└── README.md              # This documentation
```

## CSS Classes

All CSS classes use the `settings-` prefix to avoid naming conflicts:
- `.settings-container` - Main container
- `.settings-sidebar` - Left sidebar navigation
- `.settings-main` - Main content area
- `.settings-tab` - Navigation tabs
- `.settings-toggle` - Custom toggle switches
- `.settings-form-*` - Form-related elements
- `.settings-notification-*` - Notification settings

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes

## Dependencies

- React 18+
- Lucide React (for icons)
- Existing Authshared components (Input, Button)
