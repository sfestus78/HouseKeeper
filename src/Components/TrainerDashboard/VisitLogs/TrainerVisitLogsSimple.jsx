import React, { useState } from 'react';
import { ChevronDown, Eye } from 'lucide-react';
import './TrainerVisitLogs.css';

const TrainerVisitLogsSimple = () => {
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Simplified mock data
  const visitLogs = [
    {
      id: 1,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'completed',
      date: 'Today',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/10eb3280c1eed16070599185222fb4f6b7b93b3d?placeholderIfAbsent=true'
    },
    {
      id: 2,
      propertyName: 'Prime Estate',
      propertyAddress: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM away',
      status: 'inprogress',
      date: 'Yesterday',
      image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/83a40da6f913afef9c0232f16acf5899dd16cb74?placeholderIfAbsent=true'
    }
  ];

  const properties = [
    { id: 1, name: 'Prime Estate' },
    { id: 2, name: 'Oxford Residences' }
  ];

  const getStatusColor = (status) => {
    return status === 'completed' ? '#2D9F46' : '#FFBD2E';
  };

  const filteredLogs = visitLogs.filter(log => {
    const statusMatch = selectedFilter === 'all' || log.status === selectedFilter;
    return statusMatch;
  });

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
                  onChange={(e) => setSelectedProperty(e.target.value)}
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

            {/* Create Schedule Card */}
            <div className="trainerVisitLogs-create-card">
              <div className="trainerVisitLogs-create-content">
                <h3 className="trainerVisitLogs-create-title">Create a Visit Schedule</h3>
                <p className="trainerVisitLogs-create-subtitle">
                  Add a new visit and inspection schedule for a property
                </p>
                <button className="trainerVisitLogs-createScheduleBtn">
                  Select Property
                </button>
              </div>
            </div>

            {/* Visit Logs List */}
            <div className="trainerVisitLogs-logs-section">
              {filteredLogs.map((log) => (
                <div key={log.id} className="trainerVisitLogs-date-group">
                  <div className="trainerVisitLogs-date-header">
                    <h4 className="trainerVisitLogs-date-title">{log.date}</h4>
                  </div>

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
                          {log.status === 'completed' ? 'Completed' : 'In progress'}
                        </span>
                      </div>
                      <button className="trainerVisitLogs-viewdetails">
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="trainerVisitLogs-separator"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="trainerVisitLogs-right-section">
            {/* Filters */}
            <div className="trainerVisitLogs-filters">
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'all' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All
              </button>
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'inprogress' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => setSelectedFilter('inprogress')}
              >
                In progress
              </button>
              <button 
                className={`trainerVisitLogs-filter-btn ${selectedFilter === 'completed' ? 'trainerVisitLogs-filter-active' : ''}`}
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </button>
            </div>

            {/* Simple Calendar */}
            <div className="trainerVisitLogs-calendar">
              <div className="trainerVisitLogs-calendar-header">
                <h4 className="trainerVisitLogs-calendar-title">February 2024</h4>
              </div>
              <div className="trainerVisitLogs-calendar-grid">
                <p style={{textAlign: 'center', color: '#666', padding: '20px'}}>
                  Calendar view for quick date navigation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerVisitLogsSimple;
