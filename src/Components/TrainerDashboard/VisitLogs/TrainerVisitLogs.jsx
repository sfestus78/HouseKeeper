import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockProperties } from '../../shared/propertiesData';
import PropertyDetailsAfterAcceptance from '../TrainerDashboardAllproperties/PropertyDetailsAfterAcceptance';
import './TrainerVisitLogs.css';

const TrainerVisitLogs = ({ onOpenPropertyDetails }) => {
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);
  const [selectedPropertyDetails, setSelectedPropertyDetails] = useState(null);

  // Mock visit logs data
  const visitLogs = [
    {
      id: 1,
      propertyId: 1,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'completed',
      date: 'Today',
      formattedDate: 'Feb 4',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/10eb3280c1eed16070599185222fb4f6b7b93b3d?placeholderIfAbsent=true'
    },
    {
      id: 2,
      propertyId: 2,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'inprogress',
      date: 'Yesterday',
      formattedDate: 'Feb 3',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/83a40da6f913afef9c0232f16acf5899dd16cb74?placeholderIfAbsent=true'
    },
    {
      id: 3,
      propertyId: 3,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'completed',
      date: 'Yesterday',
      formattedDate: 'Feb 3',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true'
    },
    {
      id: 4,
      propertyId: 4,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'completed',
      date: 'Yesterday',
      formattedDate: 'Feb 3',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/13ead544c421ec4d4b2df6805ddfcef8e26c4aee?placeholderIfAbsent=true'
    },
    {
      id: 5,
      propertyId: 5,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'inprogress',
      date: 'Feb 2',
      formattedDate: 'Feb 2',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a79260150630f7a20ebbecf5b3bdf6f8c868fa09?placeholderIfAbsent=true'
    }
  ];

  // Properties from TrainerDashboardAllProperties
  const properties = mockProperties.map((property, index) => ({
    ...property,
    id: index + 1,
    name: 'Prime Estate',
    address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
    distance: '4 KM away',
    status: 'accepted',
    image: property.image,
    creator: {
      name: 'Lois Lane',
      email: 'loislane44@gmail.com',
      phone: '+995-445-551-4048',
      avatar: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/c67d26702247ddd302d18806025258eedb83580d?placeholderIfAbsent=true"
    }
  }));

  // Filter visit logs based on selected filters
  const filteredLogs = visitLogs.filter(log => {
    const propertyMatch = selectedProperty === 'all' || log.propertyId.toString() === selectedProperty;
    const statusMatch = selectedFilter === 'all' || log.status === selectedFilter;
    return propertyMatch && statusMatch;
  });

  // Group logs by date
  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const date = log.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(log);
    return groups;
  }, {});

  const handlePropertySelect = (propertyId) => {
    setSelectedProperty(propertyId);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
  };

  const handleViewDetails = (log) => {
    const property = properties.find(p => p.id === log.propertyId);
    if (property) {
      setSelectedPropertyDetails(property);
      setShowPropertyDetails(true);
    }
  };

  const handleBackToLogs = () => {
    setShowPropertyDetails(false);
    setSelectedPropertyDetails(null);
  };

  const handleCreateSchedule = () => {
    console.log('Create schedule clicked');
    // This would open a property selector or navigate to the visit scheduler
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#2D9F46'; // Green
      case 'inprogress':
        return '#FFBD2E'; // Yellow
      default:
        return '#6B7280'; // Gray
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'inprogress':
        return 'In progress';
      default:
        return 'Unknown';
    }
  };

  // If showing property details, render that component
  if (showPropertyDetails && selectedPropertyDetails) {
    return (
      <PropertyDetailsAfterAcceptance
        property={selectedPropertyDetails}
        onBack={handleBackToLogs}
        onScheduleVisit={() => console.log('Schedule visit')}
        onStartChecklist={() => console.log('Start checklist')}
        onReschedule={() => console.log('Reschedule')}
        onCancel={() => console.log('Cancel')}
        onStartBotTraining={() => console.log('Start bot training')}
      />
    );
  }

  return (
    <div className="trainerVisitLogs-container">
      <div className="trainerVisitLogs-content">
        <div className="trainerVisitLogs-header">
          <h1 className="trainerVisitLogs-title">Visit Logs</h1>
          <p className="trainerVisitLogs-subtitle">Here is the log on all your visits.</p>
        </div>

        <div className="trainerVisitLogs-main-content">
          <div className="trainerVisitLogs-left-section">
            {/* Property Selector */}
            <div className="trainerVisitLogs-property-selector">
              <h3 className="trainerVisitLogs-selector-title">Choose a Property</h3>
              <div className="trainerVisitLogs-separator"></div>
              <div className="trainerVisitLogs-dropdown">
                <select 
                  className="trainerVisitLogs-dropdown-select"
                  value={selectedProperty}
                  onChange={(e) => handlePropertySelect(e.target.value)}
                >
                  <option value="all">All Properties</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id.toString()}>
                      {property.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="trainerVisitLogs-dropdown-icon" size={20} />
              </div>
            </div>

            {/* Visit Logs List */}
            <div className="trainerVisitLogs-logs-section">
              {Object.entries(groupedLogs).map(([date, logs]) => (
                <div key={date} className="trainerVisitLogs-date-group">
                  <div className="trainerVisitLogs-date-header">
                    <h4 className="trainerVisitLogs-date-title">{date}</h4>
                    <p className="trainerVisitLogs-date-formatted">
                      {logs[0]?.formattedDate}
                    </p>
                  </div>

                  {logs.map((log, index) => (
                    <div key={log.id}>
                      <div className="trainerVisitLogs-log-item">
                        <div className="trainerVisitLogs-log-content">
                          <img
                            src={log.image}
                            alt={log.propertyName}
                            className="trainerVisitLogs-log-image"
                          />
                          <div className="trainerVisitLogs-log-details">
                            <h5 className="trainerVisitLogs-log-property">{log.propertyName}</h5>
                            <p className="trainerVisitLogs-log-address">{log.propertyAddress}</p>
                            <span className="trainerVisitLogs-log-distance">{log.distance}</span>
                          </div>
                        </div>
                        
                        <div className="trainerVisitLogs-log-actions">
                          <div className="trainerVisitLogs-status">
                            <div 
                              className="trainerVisitLogs-status-indicator"
                              style={{ backgroundColor: getStatusColor(log.status) }}
                            ></div>
                            <span className="trainerVisitLogs-status-text">
                              {getStatusLabel(log.status)}
                            </span>
                          </div>
                          <button 
                            className="trainerVisitLogs-viewdetails"
                            onClick={() => handleViewDetails(log)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                      
                      {index < logs.length - 1 && (
                        <div className="trainerVisitLogs-separator"></div>
                      )}
                    </div>
                  ))}

                  <div className="trainerVisitLogs-separator"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="trainerVisitLogs-right-section">
            {/* Create Schedule Card */}
            <div className="trainerVisitLogs-create-card">
              <div className="trainerVisitLogs-create-content">
                <h3 className="trainerVisitLogs-create-title">Create a Visit Schedule</h3>
                <p className="trainerVisitLogs-create-subtitle">
                  Add a new visit and inspection schedule for a property
                </p>
                <button 
                  className="trainerVisitLogs-createScheduleBtn"
                  onClick={handleCreateSchedule}
                >
                  Select Property
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="trainerVisitLogs-filters">
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'all' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => handleFilterSelect('all')}
              >
                All
              </button>
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'inprogress' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => handleFilterSelect('inprogress')}
              >
                In progress
              </button>
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'completed' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => handleFilterSelect('completed')}
              >
                Completed
              </button>
            </div>

            {/* Calendar */}
            <div className="trainerVisitLogs-calendar">
              <div className="trainerVisitLogs-calendar-header">
                <button className="trainerVisitLogs-calendar-nav">
                  <ChevronLeft size={20} />
                </button>
                <h4 className="trainerVisitLogs-calendar-title">February 2024</h4>
                <button className="trainerVisitLogs-calendar-nav">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="trainerVisitLogs-calendar-grid">
                <div className="trainerVisitLogs-calendar-weekdays">
                  <div className="trainerVisitLogs-calendar-weekday">Mo</div>
                  <div className="trainerVisitLogs-calendar-weekday">Tu</div>
                  <div className="trainerVisitLogs-calendar-weekday">We</div>
                  <div className="trainerVisitLogs-calendar-weekday">Th</div>
                  <div className="trainerVisitLogs-calendar-weekday">Fr</div>
                  <div className="trainerVisitLogs-calendar-weekday">Sat</div>
                  <div className="trainerVisitLogs-calendar-weekday">Su</div>
                </div>

                <div className="trainerVisitLogs-calendar-days">
                  {/* Previous month days */}
                  <div className="trainerVisitLogs-calendar-day trainerVisitLogs-calendar-day-other">30</div>
                  <div className="trainerVisitLogs-calendar-day trainerVisitLogs-calendar-day-other">31</div>
                  
                  {/* Current month days */}
                  {Array.from({ length: 29 }, (_, i) => (
                    <div 
                      key={i + 1} 
                      className={`trainerVisitLogs-calendar-day ${(i + 1 === 4 || i + 1 === 27 || i + 1 === 28) ? 'trainerVisitLogs-calendar-day-current' : ''}`}
                    >
                      {i + 1}
                    </div>
                  ))}
                  
                  {/* Next month days */}
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i + 1} className="trainerVisitLogs-calendar-day trainerVisitLogs-calendar-day-other">
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerVisitLogs;