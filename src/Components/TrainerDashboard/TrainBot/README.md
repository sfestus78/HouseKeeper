# Train Bot Component

## Overview
The Train Bot component is a React-based interface designed for the Trainer Dashboard that allows users to select properties for bot training. It seamlessly integrates with the existing dashboard layout and styling conventions.

## Features

### 1. Page Header Section
- **Title**: "Bot Training"
- **Subtitle**: "Select a property and train its bot."
- Responsive typography with proper spacing

### 2. Property Selection Section
- **Section Title**: "Choose Property"
- **Dropdown**: Labeled "Select Property:" with placeholder "Prime Estate"
- Visual divider line for section separation
- Hover effects and interactive feedback

### 3. Property Grid Section
- **Dynamic Text**: "Or Pick from your list of **Assigned Properties**" (with "Assigned Properties" in red)
- **Responsive Grid**: 
  - 4 columns on desktop (25% width each)
  - 2 columns on tablet (50% width each)
  - 1 column on mobile (100% width)
- **Property Cards** include:
  - Square property image with rounded corners
  - Property name and address
  - Red "Select Property" button
  - Hover effects and selection states

### 4. Navigation
- **Next Button**: Red background (#ef233c), positioned bottom-right
- Responsive positioning (centered on mobile)
- Loading state handling
- Form validation before proceeding

## Technical Specifications

### State Management
- `selectedProperty`: Tracks dropdown selection
- `selectedFromGrid`: Tracks grid selection (synced with dropdown)
- `isLoading`: Manages loading states

### Styling Approach
- **CSS Classes**: Prefixed with `trainbot-` to avoid conflicts
- **Typography**: Lato font family matching existing design
- **Colors**: 
  - Primary red: #ef233c
  - Text colors: #2b2d42 (dark), #737B7D (medium), #767676 (light)
- **Responsive Design**: Mobile-first approach with breakpoints

### Accessibility Features
- Proper ARIA labels
- Keyboard navigation support
- Focus indicators
- Screen reader friendly structure

## Responsive Breakpoints

### Desktop (1200px+)
- 4-column property grid
- Full-width sections
- Side-positioned navigation

### Tablet (768px - 1199px)
- 2-column property grid
- Adjusted spacing and padding
- Maintained layout structure

### Mobile (below 768px)
- Single-column property grid
- Centered navigation
- Optimized touch targets
- Reduced font sizes where appropriate

## Integration

### File Structure
```
TrainerDashboard/
├── TrainBot/
│   ├── TrainBot.jsx          # Main component
│   ├── TrainBot.css          # Styling
│   ├── index.js              # Export
│   └── README.md             # This file
```

### Dashboard Integration
The component is imported into `TrainerDashboard.jsx` and rendered when the "Train Bots" menu item is selected:

```javascript
import TrainBot from './TrainBot';

// In renderContent switch statement:
case 'trainbots':
  return <TrainBot />;
```

## Component Props
Currently, the component is self-contained and doesn't require props. Future enhancements might include:
- `onPropertySelect`: Callback for property selection
- `properties`: External property data
- `onNext`: Custom navigation handler

## Future Enhancements
1. **Real Dropdown**: Replace click-to-select with proper dropdown component
2. **API Integration**: Connect to property data endpoints
3. **Advanced Filtering**: Add search and filter capabilities
4. **Loading States**: Enhanced loading animations
5. **Error Handling**: Comprehensive error messaging
6. **Property Details**: Expandable property information

## Usage Example

```jsx
import TrainBot from './TrainBot';

function TrainerDashboard() {
  return (
    <div className="dashboard">
      <TrainBot />
    </div>
  );
}
```

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations
- Optimized CSS for smooth animations
- Efficient re-rendering with React hooks
- Image optimization for property photos
- Responsive images for different screen sizes

## Testing Recommendations
1. **Unit Tests**: Component rendering and state management
2. **Integration Tests**: Dashboard integration
3. **Responsive Tests**: All breakpoints
4. **Accessibility Tests**: Screen reader compatibility
5. **User Experience Tests**: Selection flows and navigation
