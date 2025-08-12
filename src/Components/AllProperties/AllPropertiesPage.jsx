import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PropertyDetailsView from './PropertyDetailsView';
import AssignTrainerModal from './AssignTrainerModal';
import CongratulationsModal from './CongratulationsModal';
import { mockProperties } from '../shared/propertiesData';
import { mockTrainers } from '../shared/trainersData';
import './AllPropertiesPage.css';

const AllPropertiesPage = ({ onNavigate }) => {
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
      <button
        key={1}
        className={`pagination-btn ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
    );

    // Show pages 2-4 if they exist
    for (let i = 2; i <= Math.min(4, totalPages); i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    // Show dots and last page if there are more than 4 pages
    if (totalPages > 4) {
      pages.push(
        <div key="dots" className="pagination-dots">
          ...
        </div>
      );
      pages.push(
        <button
          key={totalPages}
          className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
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
    <div className="allproperties-main-container">

      <div className="allproperties-content-container">
        <div className="allproperties-main-content">
          <div className="allproperties-header">
            <h1 className="allproperties-title">List of Properties</h1>
            <p className="allproperties-subtitle">
              Fill in the following fields to add a new property.
            </p>
          </div>

          <div className="allproperties-grid">
            {currentProperties.map((property) => (
              <div key={property.id} className="allproperties-card">
                <div className="allproperties-card-content">
                  <div className="allproperties-image-header">
                    <div className="allproperties-image-wrapper">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="allproperties-image"
                      />
                      <div className="allproperties-status">
                        <div className="allproperties-status-badge">
                          <div
                            className={`allproperties-status-dot ${
                              property.trainerStatus === 'assigned' 
                                ? 'allproperties-status-assigned' 
                                : 'allproperties-status-unassigned'
                            }`}
                          />
                          <span className="allproperties-status-text">
                            {property.trainerStatus === 'assigned' ? 'Assigned' : 'Unassigned'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="allproperties-info">
                    <h3 className="allproperties-name">{property.name}</h3>
                    <p className="allproperties-address">{property.address}</p>
                  </div>
                  
                  <button 
                    className="allproperties-view-details-btn"
                    onClick={() => handleViewDetails(property)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="allproperties-pagination-container">
              {renderPagination()}
            </div>
          )}
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

export default AllPropertiesPage;
