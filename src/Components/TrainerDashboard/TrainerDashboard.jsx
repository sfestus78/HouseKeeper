import React, { useState } from 'react';
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
  Plus
} from 'lucide-react';
import './TrainerDashboard.css'

const TrainerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const properties = [
    { 
      id: 1, 
      name: 'Prime Estate', 
      address: '4093 Overlook Drive, Richmond',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'The Oxford Residences', 
      address: '467 Stutler Lane, Altoona, PA',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Greenwich Park Apartments', 
      address: '3522 West Fork Street, Missouri',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 4, 
      name: 'The Stratford Apartments', 
      address: '199 Oakway Lane, Woodland',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 5, 
      name: 'Cambridge Gardens', 
      address: '105 Jerry Dove Drive, Florence',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=100&h=100&fit=crop&crop=center'
    },
    { 
      id: 6, 
      name: 'The Chesterfield Lofts', 
      address: '3274 Doe Meadow Drive',
      distance: '4KM',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const upcomingVisits = [
    {
      id: 1,
      property: 'Somerset House Apartments',
      address: '3274 Doe Meadow Drive, Annandale, VA',
      distance: '4KM',
      period: 'Today',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 2,
      property: 'The Covent Garden Flats',
      address: '417 Bizetown Road, New York, NY',
      distance: '4KM',
      period: 'This Week',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 3,
      property: 'The Regent Residences',
      address: '2825 Wincing Way, Providence, RI',
      distance: '4KM',
      period: 'This Week',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const renderOverview = () => (
    <div className="trainerdashboard-overview">
      <div className="trainerdashboard-top-section">
        <div className="trainerdashboard-create-visit-card">
          <h2>Create a Visit Schedule</h2>
          <p>Add a new visit and inspection schedule for a property</p>
          <button className="trainerdashboard-select-btn">
            Select Property
          </button>
        </div>

        <div className="trainerdashboard-overview-stats">
          <h3>Assigned Properties Overview</h3>
          
          <div className="trainerdashboard-overview-stats-content">
            <div className="trainerdashboard-main-stat-card">
              <div className="trainerdashboard-stats-icon">
                <Building2 size={24} />
              </div>
              <div className="trainerdashboard-main-stat-number">48</div>
              <p className="trainerdashboard-main-stat-label">No. of Properties</p>
            </div>

            <div className="trainerdashboard-bot-stats-card">
              <div className="trainerdashboard-bot-stats-item">
                <span className="trainerdashboard-bot-stats-label">No. Bot Training Complete</span>
                <span className="trainerdashboard-bot-stats-number">16</span>
              </div>

              <div className="trainerdashboard-bot-stats-item">
                <span className="trainerdashboard-bot-stats-label">No. Bot Training Pending</span>
                <span className="trainerdashboard-bot-stats-number">22</span>
              </div>

              <div className="trainerdashboard-bot-stats-item">
                <span className="trainerdashboard-bot-stats-label">No. Bot Training In progress</span>
                <span className="trainerdashboard-bot-stats-number">10</span>
              </div>
            </div>
          </div>
        </div>
    </div>

      <div className="trainerdashboard-content-grid">
        <div className="trainerdashboard-properties-section">
          <h3>Properties Assigned</h3>
          <div className="trainerdashboard-table-wrapper">
            <table className="trainerdashboard-properties-table">
              <thead>
                <tr>
                  <th>Property Info</th>
                  <th>Address</th>
                  <th>Distance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>
                      <div className="trainerdashboard-property-info">
                        <img src={property.image} alt={property.name} />
                        <span>{property.name}</span>
                      </div>
                    </td>
                    <td>{property.address}</td>
                    <td>{property.distance}</td>
                    <td>
                      <div className="trainerdashboard-action-buttons">
                        <button className="trainerdashboard-action-btn trainerdashboard-reject-btn">
                          <XCircle size={16} />
                        </button>
                        <button className="trainerdashboard-action-btn trainerdashboard-accept-btn">
                          <CheckCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="trainerdashboard-see-all-btn">See all</button>
        </div>

        <div className="trainerdashboard-visits-section">
          <h3>Scheduled Visits</h3>
          <div className="trainerdashboard-visits-list">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="trainerdashboard-visit-item">
                <div className="trainerdashboard-visit-period">{visit.period}</div>
                <div className="trainerdashboard-visit-card">
                  <img src={visit.image} alt={visit.property} className="trainerdashboard-visit-image" />
                  <div className="trainerdashboard-visit-details">
                    <h4>{visit.property}</h4>
                    <p>{visit.address}</p>
                    <span>{visit.distance} away</span>
                  </div>
                  <button className="trainerdashboard-view-details-btn">
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="trainerdashboard-view-all-btn">View all</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'overview':
        return renderOverview();
      case 'properties':
        return (
          <div className="trainerdashboard-content-section">
            <h2>All Properties</h2>
            <div className="trainerdashboard-properties-grid">
              {properties.map((property) => (
                <div key={property.id} className="trainerdashboard-property-card">
                  <img src={property.image} alt={property.name} />
                  <div className="trainerdashboard-property-details">
                    <h3>{property.name}</h3>
                    <p><MapPin size={14} /> {property.address}</p>
                    <span>{property.distance} away</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Properties Notifications</h2>
            <div className="trainerdashboard-notifications-list">
              <div className="trainerdashboard-notification-item">
                <Bell className="trainerdashboard-notification-icon" />
                <div>
                  <h4>New property assignment</h4>
                  <p>You have been assigned to Prime Estate property</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="trainerdashboard-notification-item">
                <Bell className="trainerdashboard-notification-icon" />
                <div>
                  <h4>Visit scheduled</h4>
                  <p>Somerset House Apartments visit scheduled for today</p>
                  <span>4 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'visits':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Scheduled Visits</h2>
            <div className="trainerdashboard-visits-calendar">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="trainerdashboard-visit-card-large">
                  <img src={visit.image} alt={visit.property} />
                  <div className="trainerdashboard-visit-info">
                    <h3>{visit.property}</h3>
                    <p>{visit.address}</p>
                    <span>{visit.distance} away</span>
                    <div className="trainerdashboard-visit-period-badge">{visit.period}</div>
                  </div>
                  <button className="trainerdashboard-manage-btn">Manage Visit</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'logs':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Visit Logs</h2>
            <div className="trainerdashboard-logs-list">
              <div className="trainerdashboard-log-item">
                <FileText className="trainerdashboard-log-icon" />
                <div>
                  <h4>Prime Estate - Visit Completed</h4>
                  <p>Inspection completed successfully. All systems operational.</p>
                  <span>Yesterday, 3:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'trainbots':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Train Bots</h2>
            <div className="trainerdashboard-bot-training">
              <div className="trainerdashboard-training-card">
                <Bot className="trainerdashboard-bot-icon" />
                <h3>Property Assistant Bot</h3>
                <p>Train the bot to handle property-specific queries</p>
                <button className="trainerdashboard-train-btn">Start Training</button>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Settings</h2>
            <div className="trainerdashboard-settings-grid">
              <div className="trainerdashboard-settings-card">
                <h3>Profile Settings</h3>
                <p>Update your personal information</p>
              </div>
              <div className="trainerdashboard-settings-card">
                <h3>Notification Preferences</h3>
                <p>Manage your notification settings</p>
              </div>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="trainerdashboard-content-section">
            <h2>Help Center</h2>
            <div className="trainerdashboard-help-content">
              <h3>Frequently Asked Questions</h3>
              <div className="trainerdashboard-faq-item">
                <h4>How do I schedule a visit?</h4>
                <p>You can schedule visits from the overview page by clicking "Select Property"</p>
              </div>
            </div>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div className="trainerdashboard-container">
      {/* Fixed Header */}
      <header className="trainerdashboard-header">
        <div className="trainerdashboard-header-left">
          <div className="trainerdashboard-logo">
            <div className="trainerdashboard-logo-icon">H</div>
            <span>Housekeepers</span>
          </div>
        </div>
        
        <div className="trainerdashboard-header-center">
          <h1>Welcome Anthony,</h1>
          <p>Here is your dashboard</p>
        </div>
        
        <div className="trainerdashboard-header-right">
          <div className="trainerdashboard-search-container">
            <Search className="trainerdashboard-search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Enter Property Name"
              className="trainerdashboard-search-input"
            />
          </div>
          <div className="trainerdashboard-notifications">
            <Bell size={20} />
          </div>
          <div className="trainerdashboard-account-switch">
            <span>Switch account type</span>
            <div className="trainerdashboard-toggle">
              <span>Creator</span>
              <div className="trainerdashboard-toggle-switch"></div>
              <span className="trainerdashboard-active">Trainer</span>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button 
          className="trainerdashboard-mobile-menu-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
      </header>

      <div className="trainerdashboard-layout">
        {/* Fixed Sidebar */}
        <aside className={`trainerdashboard-sidebar ${isSidebarOpen ? 'trainerdashboard-sidebar-open' : ''}`}>
          <nav className="trainerdashboard-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className={`trainerdashboard-nav-item ${activeMenu === item.id ? 'trainerdashboard-nav-active' : ''}`}
                  onClick={() => {
                    setActiveMenu(item.id);
                    setIsSidebarOpen(false); // Close mobile menu after selection
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
          
          {/* User Profile */}
          <div className="trainerdashboard-user-profile">
            <div className="trainerdashboard-user-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=center" alt="Anthony Bridge" />
            </div>
            <div className="trainerdashboard-user-info">
              <h4>Anthony Bridge</h4>
              <p>a.bridge@gmail.com</p>
            </div>
            <button className="trainerdashboard-logout-btn">
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="trainerdashboard-main">
          {renderContent()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="trainerdashboard-sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TrainerDashboard;