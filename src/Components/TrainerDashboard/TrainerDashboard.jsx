import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  Building2,
  Bell,
  Calendar,
  FileText,
  Bot,
  Settings,
  HelpCircle,
  Search,
  LogOut,
  User,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  BellIcon,
  Menu,
  X,
  Check
} from 'lucide-react';

// Import existing components from TrainerDashboard
import PropertyAssignmentNotification from './TrainerpropertyNotification/PropertyAssignmentNotification';
import TrainerDashboardAllproperties from './TrainerDashboardAllproperties';
import ScheduledVisits from './ScheduledVisits';
import { TrainBot } from './TrainBot';
import { VisitScheduler, VisitRescheduler, VisitInspectionChecklist } from './VisitScheduler';
import { TrainerVisitLogs } from './VisitLogs';
import TrainerUserProfile from './TrainerUserProfile/TrainerUserProfile';
import TrainerNotificationDropdown from './TrainerNotificationDropdown';
import { HelpCenter, ContactPage, FeedbackPage } from '../HelpCenter';
import { IntegratedSettings } from '../Settings';

import './TrainerDashboard.css';

const TrainerDashboard = ({ onNavigate, onStartBotTraining, accountType, onAccountTypeToggle }) => {
  // Preserve all existing state from original component
  const [activeMenu, setActiveMenu] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);
  const [schedulerProperty, setSchedulerProperty] = useState(null);
  const [scheduledVisits, setScheduledVisits] = useState([]);
  const [showVisitRescheduler, setShowVisitRescheduler] = useState(false);
  const [reschedulerData, setReschedulerData] = useState(null);
  const [showInspectionChecklist, setShowInspectionChecklist] = useState(false);
  const [checklistProperty, setChecklistProperty] = useState(null);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showTrainBot, setShowTrainBot] = useState(false);
  const [trainBotProperty, setTrainBotProperty] = useState(null);

  const notificationRef = useRef(null);

  // Menu items with icons
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'properties', label: 'All Properties', icon: Building2 },
    { id: 'notifications', label: 'Properties Notifications', icon: Bell },
    { id: 'visits', label: 'Scheduled Visits', icon: Calendar },
    { id: 'logs', label: 'Visit Logs', icon: FileText },
    { id: 'trainbots', label: 'Train Bots', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
  ];

  // Mock data - preserve existing data structure
  const properties = [
    { 
      id: 1, 
      name: 'Prime Estate', 
      address: '4093 Overlook Drive, Richmond, IN 47374',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'The Oxford Residences', 
      address: '467 Stutler Lane, Altoona, PA 16602',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Greenwich Park Apartments', 
      address: '3522 West Fork Street, Missoula, MT 59801',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 4, 
      name: 'The Stratford Apartments', 
      address: '199 Oakway Lane, Woodland Hills, CA 91303',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 5, 
      name: 'Cambridge Gardens', 
      address: '105 Jerry Dove Drive, Florence, SC 29501',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 6, 
      name: 'The Chesterfield Lofts', 
      address: '3274 Doe Meadow Drive, Annapolis Junction, MD 20701',
      distance: '4 KM',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const upcomingVisits = [
    {
      id: 1,
      property: 'Somerset House Apartments',
      address: '3274 Doe Meadow Drive, Annapolis Junction, MD 20701',
      distance: '4KM',
      period: 'Today',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      property: 'The Covent Garden Flats',
      address: '417 Bicetown Road, New York, NY 10018',
      distance: '4KM',
      period: 'This Week',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      property: 'The Regent Residences',
      address: '2825 Winding Way, Providence, RI 02908',
      distance: '4KM',
      period: 'This Week',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 4,
      property: 'Victoria Square Flats',
      address: '105 Jerry Dove Drive, Florence, SC 29501',
      distance: '4KM',
      period: 'This Week',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 5,
      property: 'Mayfair Mansions',
      address: '1406 Mattson Street, Astoria, OR 97103',
      distance: '4KM',
      period: 'Next Week',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 6,
      property: 'Thames View Apartments',
      address: '3831 Cedar Lane, Somerville, MA 02143',
      distance: '4KM',
      period: 'Next Week',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 7,
      property: 'Eton Place',
      address: '1949 Linda Street, West Brunswick Twp, PA 19549',
      distance: '4KM',
      period: 'Next Week',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center'
    }
  ];

  // Preserve all existing handlers
  const handleOpenVisitScheduler = (property) => {
    setSchedulerProperty(property);
    setShowVisitScheduler(true);
  };

  const handleCloseVisitScheduler = () => {
    setShowVisitScheduler(false);
    setSchedulerProperty(null);
  };

  const handleScheduleVisit = (visitData) => {
    const newVisit = {
      id: Date.now(),
      property: visitData.propertyName,
      address: visitData.propertyAddress,
      date: visitData.date,
      time: visitData.time,
      visitType: visitData.visitType,
      notes: visitData.notes,
      status: 'scheduled'
    };

    setScheduledVisits(prev => [...prev, newVisit]);
    console.log('Visit scheduled:', newVisit);
    handleCloseVisitScheduler();
    alert('Visit scheduled successfully!');
  };

  const handleOpenVisitRescheduler = (visitData, propertyData) => {
    setReschedulerData({ visitData, propertyData });
    setShowVisitRescheduler(true);
  };

  const handleCloseVisitRescheduler = () => {
    setShowVisitRescheduler(false);
    setReschedulerData(null);
  };

  const handleRescheduleVisit = (updatedVisitData) => {
    setScheduledVisits(prev =>
      prev.map(visit =>
        visit.id === updatedVisitData.id ? { ...visit, ...updatedVisitData, status: 'rescheduled' } : visit
      )
    );

    console.log('Visit rescheduled:', updatedVisitData);
    handleCloseVisitRescheduler();
    alert('Visit rescheduled successfully!');
  };

  const handleOpenInspectionChecklist = (property) => {
    setChecklistProperty(property);
    setShowInspectionChecklist(true);
  };

  const handleCloseInspectionChecklist = () => {
    setShowInspectionChecklist(false);
    setChecklistProperty(null);
  };

  const handleSaveChecklist = (checklistData) => {
    console.log('Checklist saved:', checklistData);
    handleCloseInspectionChecklist();
  };

  const handleContactCreator = (property) => {
    const creator = property.creator;
    if (creator && creator.email) {
      window.location.href = `mailto:${creator.email}`;
    } else {
      alert('Creator contact information not available');
    }
  };

  const toggleNotificationDropdown = () => {
    setShowNotificationDropdown(prev => !prev);
  };

  const closeNotificationDropdown = () => {
    setShowNotificationDropdown(false);
  };

  const handleOpenTrainBot = (property) => {
    setTrainBotProperty(property);
    setShowTrainBot(true);
  };

  const handleCloseTrainBot = () => {
    setShowTrainBot(false);
    setTrainBotProperty(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        closeNotificationDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Group visits by period for the new design
  const groupVisitsByPeriod = () => {
    const grouped = {};
    upcomingVisits.forEach(visit => {
      if (!grouped[visit.period]) {
        grouped[visit.period] = [];
      }
      grouped[visit.period].push(visit);
    });
    return grouped;
  };

  const renderOverview = () => {
    const groupedVisits = groupVisitsByPeriod();

    return (
      <div className="trainerDashboardnew-main-content">
        <div className="trainerDashboardnew-overview-grid">
          <div className="trainerDashboardnew-overview-left">
            <div className="trainerDashboardnew-grid-row">
              <div className="trainerDashboardnew-create-visit-section">
                <div className="trainerDashboardnew-create-visit-card">
                  <div className="trainerDashboardnew-create-visit-content">
                    <h2 className="trainerDashboardnew-create-visit-title">Create a Visit Schedule</h2>
                    <p className="trainerDashboardnew-create-visit-description">
                      Add a new visit and inspection schedule for a property
                    </p>
                    <button 
                      className="trainerDashboardnew-select-property-btn"
                      onClick={() => handleOpenVisitScheduler(properties[0])}
                    >
                      Select Property
                    </button>
                  </div>
                </div>
              </div>

              <div className="trainerDashboardnew-overview-stats-section">
                <div className="trainerDashboardnew-overview-stats-card">
                  <div className="trainerDashboardnew-overview-stats-header">
                    <h3 className="trainerDashboardnew-overview-stats-title">Assigned Properties Overview</h3>
                    <div className="trainerDashboardnew-stats-divider"></div>
                  </div>
                  
                  <div className="trainerDashboardnew-stats-content">
                    <div className="trainerDashboardnew-main-stat-card">
                      <div className="trainerDashboardnew-main-stat-icon">
                        <Building2 size={40} />
                      </div>
                      <div className="trainerDashboardnew-main-stat-info">
                        <p className="trainerDashboardnew-main-stat-label">No. of Properties</p>
                        <div className="trainerDashboardnew-main-stat-number">48</div>
                      </div>
                    </div>

                    <div className="trainerDashboardnew-bot-stats-container">
                      <div className="trainerDashboardnew-bot-stats-item">
                        <span className="trainerDashboardnew-bot-stats-label">No. Bot Training Complete</span>
                        <span className="trainerDashboardnew-bot-stats-number">16</span>
                      </div>
                      <div className="trainerDashboardnew-bot-stats-item">
                        <span className="trainerDashboardnew-bot-stats-label">No. Bot Training Pending</span>
                        <span className="trainerDashboardnew-bot-stats-number">22</span>
                      </div>
                      <div className="trainerDashboardnew-bot-stats-item">
                        <span className="trainerDashboardnew-bot-stats-label">No. Bot Training In progress</span>
                        <span className="trainerDashboardnew-bot-stats-number">10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="trainerDashboardnew-properties-assigned-section">
              <div className="trainerDashboardnew-properties-assigned-card">
                <h3 className="trainerDashboardnew-properties-assigned-title">Properties Assigned</h3>
                <div className="trainerDashboardnew-properties-divider"></div>

                <div className="trainerDashboardnew-properties-table-header">
                  <div className="trainerDashboardnew-header-property-info">Property Info</div>
                  <div className="trainerDashboardnew-header-address">Address</div>
                  <div className="trainerDashboardnew-header-distance">Distance</div>
                  <div className="trainerDashboardnew-header-action">Action</div>
                </div>
                <div className="trainerDashboardnew-properties-divider"></div>

                {properties.map((property) => (
                  <div key={property.id}>
                    <div className="trainerDashboardnew-property-row">
                      <div className="trainerDashboardnew-property-info">
                        <img src={property.image} alt={property.name} className="trainerDashboardnew-property-image" />
                        <span className="trainerDashboardnew-property-name">{property.name}</span>
                      </div>
                      <div className="trainerDashboardnew-property-address">{property.address}</div>
                      <div className="trainerDashboardnew-property-distance">{property.distance}</div>
                      <div className="trainerDashboardnew-property-actions">
                        <button className="trainerDashboardnew-action-btn trainerDashboardnew-view-btn">
                          <X size={13} />
                        </button>
                        <button className="trainerDashboardnew-action-btn trainerDashboardnew-accept-btn">
                          <Check size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="trainerDashboardnew-properties-divider"></div>
                  </div>
                ))}

                <button 
                  className="trainerDashboardnew-see-all-btn"
                  onClick={() => setActiveMenu('properties')}
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="trainerDashboardnew-overview-right">
            <div className="trainerDashboardnew-scheduled-visits-section">
              <div className="trainerDashboardnew-scheduled-visits-card">
                <div className="trainerDashboardnew-scheduled-visits-header">
                  <h3 className="trainerDashboardnew-scheduled-visits-title">Scheduled Visits</h3>
                  <div className="trainerDashboardnew-scheduled-visits-divider"></div>
                </div>

                <div className="trainerDashboardnew-visits-list">
                  {Object.entries(groupedVisits).map(([period, visits]) => (
                    <div key={period} className="trainerDashboardnew-visit-period-group">
                      <div className="trainerDashboardnew-visit-period-label">{period}</div>
                      {visits.map((visit) => (
                        <div key={visit.id} className="trainerDashboardnew-visit-item">
                          <div className="trainerDashboardnew-visit-card">
                            <img src={visit.image} alt={visit.property} className="trainerDashboardnew-visit-image" />
                            <div className="trainerDashboardnew-visit-details">
                              <h4 className="trainerDashboardnew-visit-property-name">{visit.property}</h4>
                              <p className="trainerDashboardnew-visit-address">{visit.address}</p>
                              <span className="trainerDashboardnew-visit-distance">{visit.distance} away</span>
                            </div>
                            <button className="trainerDashboardnew-view-details-btn">View Details</button>
                          </div>
                        </div>
                      ))}
                      <div className="trainerDashboardnew-scheduled-visits-divider"></div>
                    </div>
                  ))}
                </div>

                <button 
                  className="trainerDashboardnew-view-all-visits-btn"
                  onClick={() => setActiveMenu('visits')}
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // Show overlays/modals if active
    if (showTrainBot && trainBotProperty) {
      return (
        <TrainBot
          selectedPropertyForBot={trainBotProperty}
          onClose={handleCloseTrainBot}
          onBack={handleCloseTrainBot}
          onNavigate={onNavigate}
        />
      );
    }

    if (showInspectionChecklist && checklistProperty) {
      return (
        <VisitInspectionChecklist
          property={checklistProperty}
          onBack={handleCloseInspectionChecklist}
          onSave={handleSaveChecklist}
          onContactCreator={handleContactCreator}
        />
      );
    }

    if (showVisitRescheduler && reschedulerData) {
      return (
        <VisitRescheduler
          visitData={reschedulerData.visitData}
          propertyData={reschedulerData.propertyData}
          onSave={handleRescheduleVisit}
          onCancel={handleCloseVisitRescheduler}
          onBack={handleCloseVisitRescheduler}
        />
      );
    }

    if (showVisitScheduler && schedulerProperty) {
      return (
        <VisitScheduler
          propertyName={schedulerProperty.name}
          propertyAddress={schedulerProperty.address}
          propertyImage={schedulerProperty.image}
          onScheduleVisit={handleScheduleVisit}
          onClose={handleCloseVisitScheduler}
        />
      );
    }

    switch(activeMenu) {
      case 'overview':
        return renderOverview();
      case 'properties':
        return <TrainerDashboardAllproperties
          onOpenVisitScheduler={handleOpenVisitScheduler}
          onOpenVisitRescheduler={handleOpenVisitRescheduler}
          onOpenInspectionChecklist={handleOpenInspectionChecklist}
          onStartBotTraining={handleOpenTrainBot}
          onNavigate={onNavigate}
        />;
      case 'notifications':
        return <PropertyAssignmentNotification />;
      case 'visits':
        return <ScheduledVisits />;
      case 'logs':
        return <TrainerVisitLogs />;
      case 'trainbots':
        return <TrainBot onNavigate={onNavigate} />;
      case 'userProfile':
        return <TrainerUserProfile />;
      case 'settings':
        return <IntegratedSettings accountType={accountType} onAccountTypeChange={onAccountTypeToggle} />;
      case 'help':
        return <HelpCenter onNavigate={handleNavClick} />;
      case 'helpCenterContact':
        return <ContactPage onBack={() => handleNavClick('help')} />;
      case 'helpCenterFeedback':
        return <FeedbackPage onBack={() => handleNavClick('help')} />;
      default:
        return renderOverview();
    }
  };

  const handleNavClick = (menuId) => {
    // Close any open modals/overlays when navigating
    setShowInspectionChecklist(false);
    setChecklistProperty(null);
    setShowVisitScheduler(false);
    setSchedulerProperty(null);
    setShowVisitRescheduler(false);
    setReschedulerData(null);
    setShowTrainBot(false);
    setTrainBotProperty(null);

    // Handle special navigation cases
    if (menuId === 'errorPage') {
      onNavigate && onNavigate('errorPage');
      return;
    }

    setActiveMenu(menuId);
    setIsSidebarOpen(false); // Close mobile menu after selection
  };

  // Error handling function for components
  const handleError = (error) => {
    console.error('TrainerDashboard Error:', error);
    onNavigate && onNavigate('errorPage');
  };

  return (
    <div className="trainerDashboardnew-container">
      
      {/* Mobile hamburger menu button */}
      <button 
        className="trainerDashboardnew-mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} color="#374151" />
      </button>

      <div className="trainerDashboardnew-layout">
        {/* Sidebar - matching Builder.io design */}
        <div className={`trainerDashboardnew-sidebar ${isSidebarOpen ? 'trainerDashboardnew-sidebar-open' : ''}`}>
          <div className="trainerDashboardnew-sidebar-content">
            <div className="trainerDashboardnew-logo-section">
              <img
                src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f59cfd379b0660c1dc6b0e7ac118e100d0156d3d?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className="trainerDashboardnew-logo-icon"
              />
              <span className="trainerDashboardnew-logo-text">Housekeepers</span>
            </div>

            <nav className="trainerDashboardnew-nav">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`trainerDashboardnew-nav-item ${activeMenu === item.id ? 'trainerDashboardnew-nav-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <div className="trainerDashboardnew-nav-icon">
                      <Icon size={20} color={activeMenu === item.id ? '#ffffff' : '#6B7280'} />
                    </div>
                    <span className="trainerDashboardnew-nav-label">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="trainerDashboardnew-sidebar-divider"></div>

            <div className="trainerDashboardnew-user-profile">
              <div
                className="trainerDashboardnew-user-avatar"
                onClick={() => handleNavClick('userProfile')}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true"
                  alt="Anthony Bridge"
                  className="trainerDashboardnew-avatar-img"
                />
              </div>
              <div className="trainerDashboardnew-user-info">
                <div
                  className="trainerDashboardnew-user-name"
                  onClick={() => handleNavClick('userProfile')}
                  style={{ cursor: 'pointer' }}
                >
                  Anthony Bridge
                </div>
                <div className="trainerDashboardnew-user-email">a.bridge@gmail.com</div>
                <button className="trainerDashboardnew-logout-btn">Log out</button>
                {/* <button
                  onClick={() => onNavigate && onNavigate('errorPage')}
                  className="trainerDashboardnew-logout-btn"
                  style={{ marginTop: '8px', backgroundColor: '#dc2626' }}
                >
                  Test Error Page
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area - matching Builder.io design */}
        <div className="trainerDashboardnew-main">
          <div className="trainerDashboardnew-main-header">
            <div className="trainerDashboardnew-main-header-content">
            {activeMenu === 'overview' && (
              <div className="trainerDashboardnew-welcome-section">
                <h1 className="trainerDashboardnew-welcome-title">Welcome Anthony,</h1>
                <p className="trainerDashboardnew-welcome-subtitle">Here is your dashboard</p>
              </div>
            )}

            <div className="trainerDashboardnew-header-controls">
              <div className="trainerDashboardnew-search-and-notifications">
                <div className="trainerDashboardnew-search-bar">
                  <input
                    type="text"
                    placeholder="Enter Property Name"
                    className="trainerDashboardnew-search-input"
                  />
                  <div className="trainerDashboardnew-search-icon">
                    <Search size={20} color="#737b7d"/>
                  </div>
                </div>
                <div
                  className="trainerDashboardnew-notifications"
                  ref={notificationRef}
                >
                  <div
                    className="trainerDashboardnew-notification-dot"
                    onClick={toggleNotificationDropdown}
                    style={{ cursor: 'pointer' }}
                  >
                    <BellIcon size={20} color="#737B7D"/>
                  </div>
                  <TrainerNotificationDropdown
                    isVisible={showNotificationDropdown}
                    onClose={closeNotificationDropdown}
                  />
                </div>
              </div>

              <div className="trainerDashboardnew-account-switch">
                <p className="trainerDashboardnew-switch-label">Switch account type</p>
                <div className="trainerDashboardnew-toggle-section">
                  <span className={`trainerDashboardnew-toggle-label ${accountType === 'creator' ? 'trainerDashboardnew-toggle-active' : ''}`}>Creator</span>
                  <div
                    className={`trainerDashboardnew-toggle ${accountType === 'trainer' ? 'trainerDashboardnew-toggle-active' : ''}`}
                    onClick={onAccountTypeToggle}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={`trainerDashboardnew-toggle-circle ${accountType === 'trainer' ? 'trainerDashboardnew-toggle-circle-active' : ''}`}></div>
                  </div>
                  <span className={`trainerDashboardnew-toggle-label ${accountType === 'trainer' ? 'trainerDashboardnew-toggle-active' : ''}`}>Trainer</span>
                </div>
              </div>
            </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className={`trainerDashboardnew-sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TrainerDashboard;
