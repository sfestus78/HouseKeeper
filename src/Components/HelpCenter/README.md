# Help Center Component

A comprehensive Help Center feature for the Housekeepers platform that provides guides, FAQs, support options, and feedback collection.

## Features

### 1. Header Section
- **Title**: Help Center
- **Subtitle**: Access guides, FAQs and Support when using the platform

### 2. Interactive Cards (3 horizontally aligned cards)

#### Getting Started Card (`helpcenter-getstarted-card`)
- **Icon**: Red circular icon
- **Label**: Creator
- **Description**: Guidance on creating accounts and setting up profiles
- **Action**: Redirects to signup page

#### Contact Support Card (`helpcenter-contact-card`)
- **Options**: Chat to Sales, Email Support
- **Details**: Contact information and response times
- **Action**: Opens Contact Support modal with form and sidebar information

#### Send Feedback Card (`helpcenter-feedback-card`)
- **Preview**: Feedback form with rating stars and type selection
- **Text**: "We Value Your Feedback"
- **Action**: Opens Feedback modal with rating, type selection, and message

### 3. FAQ Section (`helpcenter-faq-section`)
- **Title**: Frequently Asked Questions
- **Subtitle**: Here are some frequently asked questions to help you
- **Layout**: Two-column responsive layout
- **Interactions**: Expandable accordion-style FAQ items with smooth animations

## Components

### Main Component
- `HelpCenter.jsx` - Main help center component
- `HelpCenter.css` - Main styles

### Modals
- `ContactModal.jsx` - Contact support form modal
- `ContactModal.css` - Contact modal styles
- `FeedbackModal.jsx` - Feedback form modal
- `FeedbackModal.css` - Feedback modal styles

## Usage

```jsx
import { HelpCenter } from '../HelpCenter';

// In your dashboard component
case 'help':
  return <HelpCenter onNavigate={onNavigate} />;
```

## Integration

The Help Center is integrated into both:
- **Creator Dashboard**: Available through the help menu item
- **Trainer Dashboard**: Available through the help menu item

## Styling

All styles use the `helpcenter-*` prefix for consistency:
- `helpcenter-container`
- `helpcenter-card`
- `helpcenter-faq-item`
- etc.

## Responsive Design

- **Desktop**: Full 3-column card layout with 2-column FAQ grid
- **Tablet**: Stacked card layout with responsive FAQ columns
- **Mobile**: Single column layout with optimized spacing

## Features

### Contact Modal
- **Form fields**: First Name, Last Name, Email, Location, Mobile (with country selector), Message
- **Validation**: Required field validation and email format checking
- **Sidebar information**: Chat to Sales, Email Support, Call Us, Bath Office details

### Feedback Modal
- **Rating system**: 1-5 star rating
- **Feedback types**: Bug, Feature request, General feedback
- **Message textarea**: Detailed feedback input
- **Character counter**: Up to 1000 characters

### FAQ System
- **Expandable items**: Smooth accordion-style animations
- **Multiple sections**: Questions organized in columns
- **Responsive**: Adapts to different screen sizes

## FAQ Content

1. "How does Housekeeper work?" - Platform overview and LLC management
2. "How do I train a bot?" - Bot training process explanation
3. "How can I become a trainer?" - Trainer onboarding process

## Navigation

The component accepts an `onNavigate` prop for handling navigation between different sections of the dashboard.
