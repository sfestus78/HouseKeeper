import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PropertyDetailsView from './PropertyDetailsView';
import AssignTrainerModal from './AssignTrainerModal';
import CongratulationsModal from './CongratulationsModal';
import { mockProperties } from '../shared/propertiesData';
import { mockTrainers } from '../shared/trainersData';
import styles from './AllPropertiesWithSidebar.module.css';

const AllPropertiesWithSidebar = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'details'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState(mockProperties);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [assignedTrainer, setAssignedTrainer] = useState(null);
  
  const propertiesPerPage = 12;

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProperty(null);
  };

  const handleAssignTrainer = (trainerId) => {
    const trainer = mockTrainers.find(t => t.id === trainerId);
    
    // Update property status
    setProperties(prev => prev.map(property =>
      property.id === selectedProperty.id
        ? { ...property, trainerStatus: 'assigned', assignedTrainer: trainer }
        : property
    ));
    
    // Update selected property
    setSelectedProperty(prev => ({
      ...prev,
      trainerStatus: 'assigned',
      assignedTrainer: trainer
    }));
    
    setAssignedTrainer(trainer);
    setShowAssignModal(false);
    setShowCongratulationsModal(true);
  };

  const handleReassignTrainer = () => {
    setShowAssignModal(true);
  };

  const handleCloseCongratulations = () => {
    setShowCongratulationsModal(false);
    setAssignedTrainer(null);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    
    // Always show page 1
    pages.push(
      <div
        key={1}
        className={`allproperties-sidebar-pagination-btn ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </div>
    );

    // Show pages 2-4 if they exist
    for (let i = 2; i <= Math.min(4, totalPages); i++) {
      pages.push(
        <div
          key={i}
          className={`allproperties-sidebar-pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </div>
      );
    }

    // Show dots and last page if there are more than 4 pages
    if (totalPages > 4) {
      pages.push(
        <div key="dots" className="allproperties-sidebar-pagination-dots">
          ...
        </div>
      );
      pages.push(
        <div
          key={totalPages}
          className={`allproperties-sidebar-pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </div>
      );
    }

    return pages;
  };

  if (currentView === 'details') {
    return (
      <PropertyDetailsView
        property={selectedProperty}
        onBack={handleBackToList}
        onAssignTrainer={() => setShowAssignModal(true)}
        onReassignTrainer={handleReassignTrainer}
        showAssignModal={showAssignModal}
        setShowAssignModal={setShowAssignModal}
        onTrainerAssigned={handleAssignTrainer}
      />
    );
  }

  return (
    <div className="allproperties-sidebar-main-container">
      <img
        src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/075f22667a3f5f9c5261c4c176e1f5a24635cff7?placeholderIfAbsent=true"
        className="allproperties-sidebar-header-image"
        alt="Header background"
      />
      
      <div className="allproperties-sidebar-content-wrapper">
        <div className="allproperties-sidebar-layout">
          {/* Sidebar Navigation */}
          <div className="allproperties-sidebar-nav-column">
            <div className="allproperties-sidebar-nav-container">
              <div className="allproperties-sidebar-nav-content">
                {/* Navigation Items */}
                <div className="allproperties-sidebar-nav-item">
                  <div className="allproperties-sidebar-nav-icon" />
                  <div className="allproperties-sidebar-nav-text">Overview</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item" onClick={() => onNavigate && onNavigate('creatorNewProperty')}>
                  <div className="allproperties-sidebar-nav-icon" />
                  <div className="allproperties-sidebar-nav-text">Create New Property</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item" onClick={() => onNavigate && onNavigate('assignProperty')}>
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/aa3a4e0c1f96066ff4bb10202c64def1bcd99d75?placeholderIfAbsent=true"
                    className="allproperties-sidebar-nav-icon-img"
                    alt="Assign Property"
                  />
                  <div className="allproperties-sidebar-nav-text">Assign Property</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item allproperties-sidebar-nav-item-active">
                  <div className="allproperties-sidebar-nav-icon" />
                  <div className="allproperties-sidebar-nav-text">All Properties</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item" onClick={() => onNavigate && onNavigate('trainers')}>
                  <div className="allproperties-sidebar-nav-icon" />
                  <div className="allproperties-sidebar-nav-text">Trainers</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item">
                  <div className="allproperties-sidebar-nav-icon" />
                  <div className="allproperties-sidebar-nav-text">Settings</div>
                </div>
                
                <div className="allproperties-sidebar-nav-item">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/eb04e19b734f40615a0437afcb57df342f9d438e?placeholderIfAbsent=true"
                    className="allproperties-sidebar-nav-icon-img"
                    alt="Help Center"
                  />
                  <div className="allproperties-sidebar-nav-text">Help Center</div>
                </div>
              </div>
              
              {/* Separator Line */}
              <div className="allproperties-sidebar-separator" />
              
              {/* Profile Section */}
              <div className="allproperties-sidebar-profile">
                <div className="allproperties-sidebar-profile-container">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/70d9f42a131a5942134480a8f65704c86c8f5c99?placeholderIfAbsent=true"
                    className="allproperties-sidebar-profile-avatar"
                    alt="Profile"
                  />
                  <div className="allproperties-sidebar-profile-info">
                    <div className="allproperties-sidebar-profile-name">Jon Doe</div>
                    <div className="allproperties-sidebar-profile-email">jon.doe@gmail.com</div>
                    <div className="allproperties-sidebar-profile-logout">Log out</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Column */}
          <div className="allproperties-sidebar-main-column">
            <div className="allproperties-sidebar-main-content">
              {/* Header */}
              <div className="allproperties-sidebar-header">
                <div className="allproperties-sidebar-title">List of Properties</div>
                <div className="allproperties-sidebar-subtitle">
                  Fill in the following fields to add a new property.
                </div>
              </div>

              {/* Properties Grid */}
              <div className="allproperties-sidebar-properties-grid">
                {currentProperties.map((property) => (
                  <div key={property.id} className="allproperties-sidebar-property-card">
                    <div className="allproperties-sidebar-property-content">
                      <div className="allproperties-sidebar-property-header">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="allproperties-sidebar-property-image"
                        />
                        <div className="allproperties-sidebar-property-status">
                          <div className="allproperties-sidebar-status-badge">
                            <div
                              className={`allproperties-sidebar-status-dot ${
                                property.trainerStatus === 'assigned' 
                                  ? 'allproperties-sidebar-status-assigned' 
                                  : 'allproperties-sidebar-status-unassigned'
                              }`}
                            />
                            <div className="allproperties-sidebar-status-text">
                              {property.trainerStatus === 'assigned' ? 'Assigned' : 'Unassigned'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="allproperties-sidebar-property-info">
                        <div className="allproperties-sidebar-property-name">{property.name}</div>
                        <div className="allproperties-sidebar-property-address">{property.address}</div>
                      </div>
                      
                      <div 
                        className="allproperties-sidebar-view-details-btn"
                        onClick={() => handleViewDetails(property)}
                      >
                        View Details
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="allproperties-sidebar-pagination-container">
                  {renderPagination()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssignTrainerModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        onAssign={handleAssignTrainer}
        property={selectedProperty}
        trainers={mockTrainers}
      />

      <CongratulationsModal
        isOpen={showCongratulationsModal}
        onClose={handleCloseCongratulations}
        trainer={assignedTrainer}
        property={selectedProperty}
      />
    </div>
  );
};

export default AllPropertiesWithSidebar;
