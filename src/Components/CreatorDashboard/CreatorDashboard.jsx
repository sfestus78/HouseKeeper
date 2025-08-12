import React, { useState } from 'react';
import {
  Home,
  Plus,
  UserCheck,
  Building,
  Users,
  Settings,
  HelpCircle,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';
import CreatePropertyForm from '../CreatePropertyForm/CreatePropertyForm';
import { AllPropertiesPage } from '../AllProperties';
import { TrainersContent } from '../Trainers';
import { AssignPropertyContent } from '../AssignProperty';
import LOGO from '../../Assets/Logo/LOGO2.png'
import './CreatorDashboard.css';

// Mock data
const mockProperties = [
  {
    id: 1,
    name: "St. James Heights",
    address: "199 Oakway Lane, Woodland Hills, CA 91303",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=cover",
    trainerStatus: "assigned",
    botStatus: "trained"
  },
  {
    id: 2,
    name: "The Hyde Park Residences",
    address: "4093 Overlook Drive, Richmond, IN 47374",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=cover",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  },
  {
    id: 3,
    name: "The Oxford Residences",
    address: "970 Ersel Street, Carrollton, TX 75006",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=cover",
    trainerStatus: "assigned",
    botStatus: "pending"
  },
  {
    id: 4,
    name: "Buckingham Heights",
    address: "467 Stutler Lane, Altoona, PA 16602",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=100&h=100&fit=cover",
    trainerStatus: "assigned",
    botStatus: "trained"
  },
  {
    id: 5,
    name: "The Stratford Apartments",
    address: "4525 Saints Alley, Plant City, FL 33564",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=cover",
    trainerStatus: "assigned",
    botStatus: "pending"
  },
  {
    id: 6,
    name: "The Covent Garden Flats",
    address: "1851 Lynch Street, New Berlin, WI 53151",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=cover",
    trainerStatus: "unassigned",
    botStatus: "untrained"
  }
];

const mockTrainers = [
  {
    id: 1,
    name: "Anthony Bridge",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 2,
    name: "Lois Lane",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 3,
    name: "Roger Jameson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 4,
    name: "Barbara Gordon",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 5,
    name: "Matt Li",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 6,
    name: "Carol Danvers",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 7,
    name: "Devaj Giri",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 8,
    name: "Jeffry Christiansen",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 9,
    name: "Wanda Maximoff",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 10,
    name: "Diana Prince",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 11,
    name: "Paula Irving",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=cover",
    assignedProperties: 6
  },
  {
    id: 12,
    name: "Pepper Potts",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=cover",
    assignedProperties: 6
  }
];

const CreatorDashboard = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [trainers] = useState(mockTrainers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [accountType, setAccountType] = useState('creator');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New trainer assigned to Oxford Residences", time: "5 min ago" },
    { id: 2, text: "Bot training completed for Buckingham Heights", time: "1 hour ago" },
    { id: 3, text: "Property verification pending for St. James Heights", time: "2 hours ago" }
  ];

  // Mock user data
  const getAccountName = () => "Jon Doe";
  const getUserEmail = () => "jon.doe@gmail.com";

  // Filter properties based on search term
  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate property statistics
  const propertyStats = {
    total: properties.length,
    assigned: properties.filter(p => p.trainerStatus === 'assigned').length,
    unassigned: properties.filter(p => p.trainerStatus === 'unassigned').length,
    botTrained: properties.filter(p => p.botStatus === 'trained').length
  };

  // Handle trainer assignment
  const assignTrainer = (propertyId, trainerId) => {
    setProperties(prev => prev.map(property =>
      property.id === propertyId
        ? { ...property, trainerStatus: 'assigned' }
        : property
    ));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'create', label: 'Create New Property', icon: Plus },
    { id: 'assign', label: 'Assign Property', icon: UserCheck },
    { id: 'properties', label: 'All Properties', icon: Building },
    { id: 'trainers', label: 'Trainers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help Center', icon: HelpCircle }
  ];

  // Handle back to overview from create form
  const handleBackToOverview = () => {
    setActiveSection('overview');
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Handle "See All" clicks
  const handleSeeAllProperties = () => {
    setActiveSection('properties');
  };

  const handleSeeAllTrainers = () => {
    setActiveSection('trainers');
  };

  // Handle navigation from TrainersPage
  const handleNavigate = (section) => {
    switch(section) {
      case 'creatorDashboard':
        setActiveSection('overview');
        break;
      case 'creatorNewProperty':
        setActiveSection('create');
        break;
      case 'assignProperty':
        setActiveSection('assign');
        break;
      case 'allProperties':
        setActiveSection('properties');
        break;
      default:
        setActiveSection('overview');
    }
  };

  return (
    <div className="creatordashboard-container">
      {/* Mobile Overlay */}
      <div 
        className={`creatordashboard-mobile-overlay ${mobileMenuOpen ? 'creatordashboard-active' : ''}`}
        onClick={closeMobileMenu}
      ></div>

      {/* Sidebar */}
      <div className={`creatordashboard-sidebar ${mobileMenuOpen ? 'creatordashboard-mobile-open' : ''}`}>
        {/* Logo Section */}
        <div className="creatordashboard-logo-section">
          <img src={LOGO} alt="Housekeeper-logo" className="creatordashboard-logo-icon" />
          <span className="creatordashboard-logo-text">Housekeepers</span>
        </div>

        {/* Navigation */}
        <nav className="creatordashboard-nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`creatordashboard-nav-item ${isActive ? 'creatordashboard-active' : ''}`}
              >
                <Icon className="creatordashboard-nav-icon" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="creatordashboard-user-profile">
          <div className="creatordashboard-profile-info">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=cover"
              alt="User Avatar"
              className="creatordashboard-profile-avatar"
            />
            <div className="creatordashboard-profile-details">
              <h4>{getAccountName()}</h4>
              <p>{getUserEmail()}</p>
            </div>
          </div>
          <button className="creatordashboard-logout-btn">Log out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="creatordashboard-main-content">
        {/* Header - Always show for all sections */}
        <header className="creatordashboard-header">
            <div className="creatordashboard-header-content">
              {/* Left side with mobile menu and welcome */}
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="creatordashboard-mobile-menu-btn"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="creatordashboard-welcome-section">
                  <h1>Welcome Jon,</h1>
                  <p>Here is your dashboard</p>
                </div>
              </div>

              {/* Right Section */}
              <div className="creatordashboard-header-controls">
                {/* Search Bar */}
                <div className="creatordashboard-search-container">
                  <input
                    type="text"
                    placeholder="Enter Property Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="creatordashboard-search-input"
                  />
                  <Search className="creatordashboard-search-icon" />
                </div>

                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="creatordashboard-notification-btn"
                  >
                    <Bell size={18} />
                    <div className="creatordashboard-notification-dot"></div>
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="creatordashboard-notifications-dropdown">
                      <div className="creatordashboard-notifications-header">
                        Notifications
                      </div>
                      {notifications.map((notification) => (
                        <div key={notification.id} className="creatordashboard-notification-item">
                          <p className="creatordashboard-notification-text">{notification.text}</p>
                          <p className="creatordashboard-notification-time">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Account Type Switcher */}
                <div className="creatordashboard-account-switcher">
                  <p className="creatordashboard-switch-label">Switch account type</p>
                  <div className="creatordashboard-switch-container">
                    <span className="creatordashboard-switch-text">Creator</span>
                    <button
                      onClick={() => setAccountType(accountType === 'creator' ? 'trainer' : 'creator')}
                      className={`creatordashboard-toggle-switch ${accountType === 'trainer' ? 'creatordashboard-active' : ''}`}
                    >
                      <div className="creatordashboard-toggle-handle" />
                    </button>
                    <span className="creatordashboard-switch-text">Trainer</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

        {/* Content Area */}
        {activeSection === 'create' ? (
          <CreatePropertyForm onBack={handleBackToOverview} />
        ) : activeSection === 'properties' ? (
          <AllPropertiesPage onNavigate={handleNavigate} />
        ) : activeSection === 'trainers' ? (
          <TrainersContent />
        ) : activeSection === 'assign' ? (
          <AssignPropertyContent />
        ) : (
          <div className="creatordashboard-grid">
            {/* Left Column */}
            <div className="creatordashboard-left-column">
              {/* Hero Section */}
              <div className="creatordashboard-hero-section">
                {/* Create New Property Card */}
                <div className="creatordashboard-create-property-card">
                  <div>
                    <h2 className="creatordashboard-create-property-title">Create New Property</h2>
                    <p className="creatordashboard-create-property-subtitle">
                      Is there a property you haven't add to Housekeepers yet?
                    </p>
                  </div>
                  <button
                    className="creatordashboard-create-property-btn"
                    onClick={() => setActiveSection('create')}
                  >
                    Create Property
                  </button>
                </div>

                {/* Properties Overview */}
                <div className="creatordashboard-overview-card">
                  <h3 className="creatordashboard-card-title">Properties Overview</h3>
                  
                  <div className="creatordashboard-stats-container">
                    {/* Main Stats Card */}
                    <div className="creatordashboard-main-stat">
                      <Building className="creatordashboard-stat-icon" />
                      <div>
                        <p className="creatordashboard-stat-label">No. of Properties</p>
                        <p className="creatordashboard-stat-number">{propertyStats.total}</p>
                      </div>
                    </div>

                    {/* Secondary Stats */}
                    <div className="creatordashboard-secondary-stats">
                      <div className="creatordashboard-secondary-stat">
                        <span className="creatordashboard-secondary-stat-label">No. of Assigned Properties</span>
                        <span className="creatordashboard-secondary-stat-number">{propertyStats.assigned}</span>
                      </div>

                      <div className="creatordashboard-secondary-stat">
                        <span className="creatordashboard-secondary-stat-label">No. Unassigned Properties</span>
                        <span className="creatordashboard-secondary-stat-number">{propertyStats.unassigned}</span>
                      </div>

                      <div className="creatordashboard-secondary-stat">
                        <span className="creatordashboard-secondary-stat-label">No. Bot Trained Properties</span>
                        <span className="creatordashboard-secondary-stat-number">{propertyStats.botTrained}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Properties Created */}
              <div className="creatordashboard-properties-table">
                <h3 className="creatordashboard-card-title">Properties Created</h3>

                {/* Header */}
                <div className="creatordashboard-table-header">
                  <div className="creatordashboard-table-header-cell">Property Info</div>
                  <div className="creatordashboard-table-header-cell">Address</div>
                  <div className="creatordashboard-table-header-cell" style={{ textAlign: 'center' }}>Trainer Status</div>
                  <div className="creatordashboard-table-header-cell" style={{ textAlign: 'center' }}>Bot Status</div>
                </div>

                {/* Property Rows */}
                {filteredProperties.map((property) => (
                  <div key={property.id} className="creatordashboard-table-row">
                    {/* Property Info */}
                    <div className="creatordashboard-property-info">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="creatordashboard-property-image"
                      />
                      <div>
                        <div className="creatordashboard-property-name">{property.name}</div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="creatordashboard-property-address">{property.address}</div>

                    {/* Trainer Status */}
                    <div className={`creatordashboard-status-badge creatordashboard-status-${property.trainerStatus}`}>
                      <div className="creatordashboard-status-dot"></div>
                      <span>{property.trainerStatus === 'assigned' ? 'Assigned' : 'Unassigned'}</span>
                    </div>

                    {/* Bot Status */}
                    <div className={`creatordashboard-status-badge creatordashboard-status-${property.botStatus}`}>
                      <div className="creatordashboard-status-dot"></div>
                      <span>
                        {property.botStatus === 'trained' ? 'Trained' :
                         property.botStatus === 'pending' ? 'Pending' : 'Untrained'}
                      </span>
                    </div>
                  </div>
                ))}

                {/* See All Link */}
                <div className="creatordashboard-see-all-link">
                  <button
                    className="creatordashboard-see-all-btn"
                    onClick={handleSeeAllProperties}
                  >
                    See all
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Available Trainers */}
            <div className="creatordashboard-trainers-panel">
              <h3 className="creatordashboard-card-title">Available Trainers</h3>

              {/* Trainers Grid */}
              <div className="creatordashboard-trainers-grid">
                {trainers.slice(0, 12).map((trainer) => (
                  <div key={trainer.id} className="creatordashboard-trainer-card">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="creatordashboard-trainer-avatar"
                    />
                    <h4 className="creatordashboard-trainer-name">{trainer.name}</h4>
                    <p className="creatordashboard-trainer-assigned">
                      Assigned to{' '}
                      <span style={{ fontWeight: '600' }}>
                        {trainer.assignedProperties} Properties
                      </span>
                    </p>
                    <button
                      onClick={() => assignTrainer(1, trainer.id)}
                      className="creatordashboard-assign-btn"
                    >
                      Assign Property
                    </button>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <div className="creatordashboard-view-all-link">
                <button
                  className="creatordashboard-view-all-btn"
                  onClick={handleSeeAllTrainers}
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorDashboard;
