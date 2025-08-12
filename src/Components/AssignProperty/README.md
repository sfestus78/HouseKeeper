# AssignProperty Component

A multi-step property assignment flow integrated into the Housekeepers dashboard.

## Features

### Step 1: Choose Property
- Dropdown selection of available properties
- Grid view of unassigned property cards
- Property selection triggers Step 2

### Step 2: Select Trainer
- Display selected property details
- Grid of available trainers with their information
- Trainer cards show level, assignments, and "Assign Property" action

### Step 3: Trainer Info Modal
- Detailed trainer information (contact, stats, experience)
- "Assign to Property" confirmation button
- Triggers confirmation modal

### Step 4: Confirmation Modal
- Summary of property and trainer assignment
- Accept/Cancel options
- Triggers success modal on accept

### Step 5: Success Modal
- Assignment success confirmation
- Shows next steps
- "Done" button resets flow to Step 1

## Components Structure

```
AssignProperty/
├── AssignPropertyPage.jsx         # Main component with state management
├── Step1SelectProperty.jsx       # Property selection interface
├── Step2SelectTrainer.jsx        # Trainer selection interface
├── TrainerInfoModal.jsx          # Trainer details modal
├── ConfirmationModal.jsx         # Assignment confirmation
├── SuccessModal.jsx              # Success confirmation
├── AssignProperty.module.css     # Scoped styles
├── index.js                      # Component exports
└── README.md                     # This file
```

## Integration

The component is integrated into the CreatorDashboard and activated when the "Assign Property" sidebar item is clicked.

## Data Dependencies

- `mockProperties` from `../shared/propertiesData.js`
- `mockTrainers` from `../shared/propertiesData.js`
- Filters for unassigned properties (`trainerStatus === 'unassigned'`)

## Styling

Uses CSS Modules with the prefix `.assign-property-*` to avoid conflicts with existing styles. The design matches the overall Housekeepers dashboard aesthetic with:

- Primary color: #EF233C (red)
- Text colors: #2B2D42, #737B7D, #767676
- Background: #FFF with #F9F8FC for cards
- Lato font family throughout
