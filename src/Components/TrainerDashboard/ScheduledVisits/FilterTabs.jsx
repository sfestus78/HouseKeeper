import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange, isCompact = false }) => {
  const tabs = [
    'All',
    'Today', 
    'This Week',
    'Next Week',
    'This Month',
    'Next Month',
    'This Year'
  ];

  const handleTabClick = (tab) => {
    onFilterChange(tab);
  };

  if (isCompact) {
    return (
      <div className="scheduledvisit-filter-tabs scheduledvisit-filter-tabs-compact">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`scheduledvisit-tab ${activeFilter === tab ? 'scheduledvisit-tab-active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }

  return null; // Only show tabs in sidebar in compact mode for this design
};

export default FilterTabs;
