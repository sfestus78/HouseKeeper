import React, { useState, useMemo } from 'react';
import Calendar from './Calendar';
import VisitCard from './VisitCard';
import FilterTabs from './FilterTabs';
import './ScheduledVisits.css';

const ScheduledVisits = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Helper function to determine visit period based on today's date
  const determineVisitPeriod = (visitDate) => {
    const today = new Date();
    const vDate = new Date(visitDate);
    
    // Reset hours to compare dates only
    today.setHours(0, 0, 0, 0);
    vDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((vDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      return 'Today';
    } else if (daysDiff > 0 && daysDiff <= 6) {
      return 'This Week';
    } else if (daysDiff > 6 && daysDiff <= 13) {
      return 'Next Week';
    } else if (daysDiff > 13 && daysDiff <= 30) {
      return 'This Month';
    } else if (daysDiff > 30 && daysDiff <= 60) {
      return 'Next Month';
    } else if (daysDiff > 60 && daysDiff <= 365) {
      return 'This Year';
    } else {
      return 'Future';
    }
  };

  // Generate visit data with dynamic dates based on today
  const visitData = useMemo(() => {
    const today = new Date();
    
    return [
      {
        id: 1,
        property: 'Prime Estate',
        address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
        distance: '4 KM away',
        time: '09:00 AM',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/10eb3280c1eed16070599185222fb4f6b7b93b3d?placeholderIfAbsent=true',
        visitDate: new Date(today),
        period: determineVisitPeriod(new Date(today))
      },
      {
        id: 2,
        property: 'The Belgravia Residences',
        address: '4093 Overlook Drive, Richmond, IN 47374',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/f57d8b3402a772f84116db69f36e44c42d6bef51?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000))
      },
      {
        id: 3,
        property: 'Victoria Square Flats',
        address: '4319 Wakefield Street, Philadelphia, PA 19126',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/95cb7eb80aa24655a29c3378e6f1715a6ece89c0?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000))
      },
      {
        id: 4,
        property: 'Somerset House Apartments',
        address: '199 Oakway Lane, Woodland Hills, CA 91303',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/13ead544c421ec4d4b2df6805ddfcef8e26c4aee?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000), // 6 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000))
      },
      {
        id: 5,
        property: 'The Winchester Suites',
        address: '605 Dog Hill Lane, Topeka, KS 66603',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/ec04d094277061381368a59883cdb3916a5dab84?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000), // 8 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000))
      },
      {
        id: 6,
        property: 'The Hyde Park Residences',
        address: '612 Shadowmar Drive, New Orleans, LA 70115',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/20d82a03c34d674838bb89f598f0344d5e20a026?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000))
      },
      {
        id: 7,
        property: 'Cambridge Gardens',
        address: '105 Jerry Dove Drive, Florence, SC 29501',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/a0e400f773fdc33391a785eed78c9438404b4bd9?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000), // 12 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 12 * 24 * 60 * 60 * 1000))
      },
      {
        id: 8,
        property: 'The Soho Lofts',
        address: '2323 Dancing Dove Lane, Long Island City, NY 11101',
        distance: '4 KM away',
        image: 'https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7860a37835a69a90318497e8843b39d13484c099?placeholderIfAbsent=true',
        visitDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from today
        period: determineVisitPeriod(new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000))
      }
    ];
  }, []);

  const filterData = (data, filter) => {
    if (filter === 'All') return data;
    return data.filter(visit => visit.period === filter);
  };

  const groupedVisits = filterData(visitData, activeFilter).reduce((groups, visit) => {
    const period = visit.period;
    if (!groups[period]) {
      groups[period] = [];
    }
    groups[period].push(visit);
    return groups;
  }, {});

  const handleSelectProperty = () => {
    console.log('Opening property selection modal...');
  };

  return (
    <div className="scheduled-visits-main-container">
      <div className="scheduled-visits-page-layout">
        <div className="scheduled-visits-main-content">
          <div className="scheduled-visits-page-header">
            <h1 className="scheduled-visits-title">Scheduled Visits</h1>
            <p className="scheduled-visits-subtitle">Here are your scheduled visits.</p>
          </div>

          <div className="scheduled-visits-visits-container">
            <div className="scheduled-visits-visits-list">
              {Object.entries(groupedVisits).map(([period, visits]) => (
                <div key={period} className="scheduled-visits-time-section">
                  <h3 className="scheduled-visits-period-title">{period}</h3>
                  {visits.map((visit, index) => (
                    <div key={visit.id}>
                      <VisitCard 
                        visit={visit} 
                        showTime={visit.time && period === 'Today'}
                      />
                      {index < visits.length - 1 && (
                        <div className="scheduled-visits-divider"></div>
                      )}
                    </div>
                  ))}
                  {period !== Object.keys(groupedVisits)[Object.keys(groupedVisits).length - 1] && (
                    <div className="scheduled-visits-section-divider"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="scheduled-visits-sidebar-content">
          <div className="scheduled-visits-create-card">
            <div 
              className="scheduled-visits-create-background"
              style={{
                backgroundImage: 'url(https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/5b51b4bdcd3616845839e318efd6f845f6359ca3?placeholderIfAbsent=true)'
                
              }}
            >
              <div className="scheduled-visits-create-content">
                <h2 className="scheduled-visits-create-title">Create a Visit Schedule</h2>
                <p className="scheduled-visits-create-subtitle">
                  Add a new visit and inspection schedule for a property
                </p>
              </div>
              <button 
                className="scheduled-visits-create-btn"
                onClick={handleSelectProperty}
              >
                Select Property
              </button>
            </div>
          </div>

          <FilterTabs 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter}
            isCompact={true}
          />

          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default ScheduledVisits;
