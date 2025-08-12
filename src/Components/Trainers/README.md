# Trainers Component

A comprehensive trainer management system with modal-based workflow for property assignment.

## Overview

The Trainers component provides a complete dashboard for managing trainers and assigning them to properties. It includes:

- **TrainersPage**: Main dashboard with trainer grid layout
- **TrainerInfoModal**: Detailed trainer information display
- **AssignPropertyModal**: Property selection and assignment interface
- **CongratulationsModal**: Success confirmation modal

## Components

### TrainersPage
- Full dashboard layout with sidebar navigation
- Grid display of trainer cards
- Search and pagination functionality
- Integration with modal workflow

### TrainerInfoModal
- Displays comprehensive trainer details
- Shows contact information and experience level
- "Assign to Property" action button

### AssignPropertyModal
- Lists unassigned properties only
- Visual property selection interface
- Loading states and form validation

### CongratulationsModal
- Success confirmation with assignment details
- Animated celebration elements
- Assignment summary information

## Features

### Functional Flow
1. **Navigation**: Sidebar "Trainers" → TrainersPage
2. **Selection**: Trainer Grid → Click "Assign Property" → TrainerInfoModal
3. **Assignment**: TrainerInfoModal → "Assign in Modal" → AssignPropertyModal
4. **Confirmation**: Select Property + Confirm → CongratulationsModal
5. **Completion**: "Done" → Closes all modals

### Data Management
- Fetches trainer data from `src/Components/shared/trainersData.js`
- Filters unassigned properties from `src/Components/shared/propertiesData.js`
- Updates trainer assignment counts in real-time
- Simulates API calls with loading states

### Styling
- CSS Modules with unique prefixes (`trainer-*`, `assign-modal-*`, etc.)
- No conflicts with existing design system
- Responsive design for mobile and desktop
- Smooth animations and transitions

## Usage

```jsx
import { TrainersPage } from './Components/Trainers';

// In your routing or page management
<TrainersPage onNavigate={handleNavigation} />
```

## Dependencies

- React (hooks: useState, useEffect)
- Existing shared data files
- CSS Modules support

## File Structure

```
src/Components/Trainers/
├── TrainersPage.jsx              # Main dashboard component
├── TrainersPage.module.css       # Dashboard styles
├── TrainerInfoModal.jsx          # Trainer details modal
├── TrainerInfoModal.module.css   # Modal styles
├── AssignPropertyModal.jsx       # Property assignment modal
├── AssignPropertyModal.module.css # Assignment modal styles
├── CongratulationsModal.jsx      # Success modal
├── CongratulationsModal.module.css # Success modal styles
├── index.js                      # Module exports
└── README.md                     # This documentation
```

## Integration

The component is integrated into the main App.js and accessible via:
- Demo navigation: "Trainers Page" button
- Sidebar navigation: "Trainers" menu item (in TrainersPage)

## Responsive Design

- **Desktop**: Full grid layout with sidebar
- **Tablet**: Responsive grid with collapsible sidebar
- **Mobile**: Stacked layout with modal adaptations

## Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus management in modals
- Screen reader compatible

## Future Enhancements

- Real API integration
- Advanced filtering and sorting
- Bulk assignment operations
- Trainer performance metrics
- Export functionality
