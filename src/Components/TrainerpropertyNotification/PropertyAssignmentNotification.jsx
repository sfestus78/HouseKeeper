import React, { useState } from 'react';
import './PropertyAssignmentNotification.css';
import PropertyCardModal from './PropertyCardModal';

const PropertyAssignmentNotification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptedProperties, setAcceptedProperties] = useState([]);
  const [removedProperties, setRemovedProperties] = useState([]);
  const itemsPerPage = 10;

  // Mock data for property assignments
  const mockPropertyAssignments = [
    {
      id: 1,
      name: 'Prime Estate',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=80&h=80&fit=crop&crop=center',
      address: 'Flat 4, 24 Castle Street, Perth, PH1 3JY',
      distance: '4 KM Away',
      assignedByName: 'Lois Lane',
      assignedByImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b789?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 2,
      name: 'Greenwich Park Apartments',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=80&h=80&fit=crop&crop=center',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
      distance: '4 KM Away',
      assignedByName: 'Arlene McCoy',
      assignedByImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 3,
      name: 'The Ashford Residences',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&h=80&fit=crop&crop=center',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
      distance: '4 KM Away',
      assignedByName: 'Darlene Robertson',
      assignedByImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 4,
      name: 'Mayfair Mansions',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=80&h=80&fit=crop&crop=center',
      address: '3891 Ranchview Dr. Richardson, California 62639',
      distance: '4 KM Away',
      assignedByName: 'Darrell Steward',
      assignedByImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 5,
      name: 'St. James Heights',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=80&h=80&fit=crop&crop=center',
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
      distance: '4 KM Away',
      assignedByName: 'Dianne Russell',
      assignedByImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 6,
      name: 'The Oxford Residences',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=80&h=80&fit=crop&crop=center',
      address: '6391 Elgin St. Celina, Delaware 10299',
      distance: '4 KM Away',
      assignedByName: 'Robert Fox',
      assignedByImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 7,
      name: 'The Regent Residences',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=80&h=80&fit=crop&crop=center',
      address: '2715 Ash Dr. San Jose, South Dakota 83475',
      distance: '4 KM Away',
      assignedByName: 'Jacob Jones',
      assignedByImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center'
    },
    {
      id: 8,
      name: 'The Chesterfield Lofts',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80&h=80&fit=crop&crop=center',
      address: '2118 Thornridge Cir. Syracuse, Connecticut 35624',
      distance: '4 KM Away',
      assignedByName: 'Floyd Miles',
      assignedByImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=center'
    }
  ];

  // Filter out removed properties
  const filteredProperties = mockPropertyAssignments.filter(property => !removedProperties.includes(property.id));
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const handleAccept = (propertyId) => {
    console.log(`Accepted property assignment for property ID: ${propertyId}`);
    setAcceptedProperties(prev => [...prev, propertyId]);
  };

  const handleReject = (propertyId) => {
    console.log(`Rejected property assignment for property ID: ${propertyId}`);
    setRemovedProperties(prev => [...prev, propertyId]);
    // If the rejected property was selected, clear the selection
    if (selectedProperty && selectedProperty.id === propertyId) {
      setSelectedProperty(null);
    }
  };

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderPagination = () => {
    const pages = [];
    
    // First page
    pages.push(
      <div
        key={1}
        className={`assignednotification-pagination-item ${currentPage === 1 ? 'assignednotification-pagination-active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </div>
    );

    // Show pages 2-4 if total pages > 4
    if (totalPages > 4) {
      for (let i = 2; i <= Math.min(4, totalPages); i++) {
        pages.push(
          <div
            key={i}
            className={`assignednotification-pagination-item ${currentPage === i ? 'assignednotification-pagination-active' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </div>
        );
      }
      
      // Ellipsis
      if (totalPages > 5) {
        pages.push(
          <div key="ellipsis" className="assignednotification-pagination-ellipsis">
            ...
          </div>
        );
        
        // Last page
        pages.push(
          <div
            key={totalPages}
            className={`assignednotification-pagination-item ${currentPage === totalPages ? 'assignednotification-pagination-active' : ''}`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </div>
        );
      }
    } else {
      // Show all pages if total is 4 or less
      for (let i = 2; i <= totalPages; i++) {
        pages.push(
          <div
            key={i}
            className={`assignednotification-pagination-item ${currentPage === i ? 'assignednotification-pagination-active' : ''}`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </div>
        );
      }
    }

    return pages;
  };

  return (
    <div className="assignednotification-container">
      <div className="assignednotification-header">
        <h1 className="assignednotification-title">
          Properties Assigned Notifications
        </h1>
        <p className="assignednotification-subtitle">
          Here are your assigned properties.
        </p>
      </div>

      <div className="assignednotification-content">
        <div className="assignednotification-layout">
          <div className="assignednotification-table-section">
          <h2 className="assignednotification-section-title">
            Properties Assigned
          </h2>
          
          <div className="assignednotification-table-container">
            {/* Table Header */}
            <div className="assignednotification-table-header">
              <div className="assignednotification-header-cell assignednotification-property-header">
                Property Info
              </div>
              <div className="assignednotification-header-cell assignednotification-address-header">
                Address
              </div>
              <div className="assignednotification-header-cell assignednotification-assignedby-header">
                Assigned by
              </div>
              <div className="assignednotification-header-cell assignednotification-distance-header">
                Distance
              </div>
              <div className="assignednotification-header-cell assignednotification-action-header">
                Action
              </div>
            </div>

            <div className="assignednotification-table-divider"></div>

            {/* Table Body */}
            <div className="assignednotification-table-body">
              {currentProperties.map((property) => (
                <div key={property.id}>
                  <div className="assignednotification-table-row">
                    <div
                      className="assignednotification-cell assignednotification-property-cell assignednotification-clickable"
                      onClick={() => handlePropertyClick(property)}
                    >
                      <img
                        src={property.image}
                        alt={property.name}
                        className="assignednotification-property-image"
                      />
                      <span className="assignednotification-property-name">
                        {property.name}
                      </span>
                    </div>
                    
                    <div className="assignednotification-cell assignednotification-address-cell">
                      {property.address}
                    </div>
                    
                    <div className="assignednotification-cell assignednotification-assignedby-cell">
                      <img 
                        src={property.assignedByImage} 
                        alt={property.assignedByName}
                        className="assignednotification-assigned-by-image"
                      />
                      <span className="assignednotification-assigned-by-name">
                        {property.assignedByName}
                      </span>
                    </div>
                    
                    <div className="assignednotification-cell assignednotification-distance-cell">
                      {property.distance}
                    </div>
                    
                    <div className="assignednotification-cell assignednotification-action-cell">
                      {!acceptedProperties.includes(property.id) ? (
                        <>
                          <button 
                            className="assignednotification-accept-btn"
                            onClick={() => handleAccept(property.id)}
                          >
                            Accept
                          </button>
                          <button 
                            className="assignednotification-reject-btn"
                            onClick={() => handleReject(property.id)}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <div className="assignednotification-accepted-status">
                          Accepted
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="assignednotification-table-divider"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="assignednotification-pagination">
            {renderPagination()}
          </div>
        </div>
      </div>
      
      <PropertyCardModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PropertyAssignmentNotification;