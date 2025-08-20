import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import PropertyCard from './PropertyCard';
import PropertyDetails from './PropertyDetails';
import PropertyDetailsBeforeAcceptance from './PropertyDetailsBeforeAcceptance';
import PropertyDetailsAfterAcceptance from './PropertyDetailsAfterAcceptance';
import AcceptModal from './AcceptModal';
import RejectModal from './RejectModal';
import { mockProperties } from '../../shared/propertiesData';
import './TrainerDashboardAllproperties.css';

const TrainerDashboardAllproperties = ({ onOpenVisitScheduler, onOpenVisitRescheduler, onOpenInspectionChecklist }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [propertyToProcess, setPropertyToProcess] = useState(null);
  const [acceptedProperties, setAcceptedProperties] = useState(new Set());

  // Mock properties data for trainer (showing properties with "pending" status)
  const trainerProperties = mockProperties.map((property, index) => ({
    ...property,
    name: index === 0 ? 'Prime Estate' : property.name,
    address: index === 0 ? 'Flat 4, 24 Castle Street, Perth, PH1 3JY' : property.address,
    distance: '4 KM away',
    status: 'pending', // All properties are pending for trainer review
    image: index === 0 ? "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/7e50e04937ce3ebe7cdc90433bb1155f2c7055ae?placeholderIfAbsent=true" : property.image,
    creator: {
      name: index === 0 ? 'Lois Lane' : 'Property Owner',
      email: index === 0 ? 'loislane44@gmail.com' : 'owner@property.com',
      phone: index === 0 ? '+995-445-551-4048' : '+1 (555) 123-4567',
      avatar: "https://api.builder.io/api/v1/image/assets/8e9b0aeb5e9b4fe2ab2bcb27863cb0f0/c67d26702247ddd302d18806025258eedb83580d?placeholderIfAbsent=true"
    },
    description: index === 0 ?
      "Prime Estate offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. The home features four bedrooms conveniently situated upstairs and three bathrooms. The thoughtful design extends to the upstairs laundry room, ensuring practicality. The Lowe also features plenty of storage space." :
      `This is a beautiful property located at ${property.address}. The property features modern amenities and excellent location accessibility. Perfect for professional housekeeping services with state-of-the-art facilities and convenient access.`,
    amenities: ['WiFi', 'Parking', 'Security', 'Elevator', 'Garden'],
    rooms: Math.floor(Math.random() * 4) + 2,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    area: Math.floor(Math.random() * 500) + 1000
  }));

  // Filter properties based on search term
  const filteredProperties = trainerProperties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
  };

  const handleBackToList = () => {
    setSelectedProperty(null);
  };

  const handlePropertyAccept = (propertyId) => {
    const property = trainerProperties.find(p => p.id === propertyId);
    setPropertyToProcess(property);
    setShowAcceptModal(true);
  };

  const handlePropertyReject = (propertyId, reason) => {
    const property = trainerProperties.find(p => p.id === propertyId);
    setPropertyToProcess(property);
    setShowRejectModal(true);
  };

  const handleAcceptConfirm = () => {
    if (propertyToProcess) {
      console.log('Property accepted:', propertyToProcess.id);
      setAcceptedProperties(prev => new Set([...prev, propertyToProcess.id]));
      setShowAcceptModal(false);
      setPropertyToProcess(null);
      // Update the selected property to show the after acceptance view
      setSelectedProperty({...propertyToProcess, status: 'accepted'});
    }
  };

  const handleRejectConfirm = (reason) => {
    if (propertyToProcess) {
      console.log('Property rejected:', propertyToProcess.id, 'Reason:', reason);
      setShowRejectModal(false);
      setPropertyToProcess(null);
      setSelectedProperty(null);
    }
  };

  const handleModalCancel = () => {
    setShowAcceptModal(false);
    setShowRejectModal(false);
    setPropertyToProcess(null);
  };

  // Handler functions for the after acceptance view
  const handleScheduleVisit = (propertyId) => {
    const property = trainerProperties.find(p => p.id === propertyId);
    if (property && onOpenVisitScheduler) {
      onOpenVisitScheduler(property);
    } else {
      console.log('Schedule visit for property:', propertyId);
    }
  };

  const handleStartChecklist = (propertyId) => {
    const property = trainerProperties.find(p => p.id === propertyId);
    if (property && onOpenInspectionChecklist) {
      onOpenInspectionChecklist(property);
    } else {
      console.log('Start checklist for property:', propertyId);
    }
  };

  const handleReschedule = (propertyId) => {
    const property = trainerProperties.find(p => p.id === propertyId);
    if (property && onOpenVisitRescheduler) {
      // Mock existing visit data for rescheduling
      const existingVisitData = {
        id: Date.now(),
        date: '17/06/2025',
        visitType: 'Day',
        time: '10:00',
        notes: 'The Lowe offers a practical layout for modern living in Athens, Tennessee. The open downstairs area seamlessly connects the kitchen and living room. A versatile bonus flex space on the lower level adds an extra layer of convenience for customization. '
      };

      const propertyData = {
        name: property.name,
        address: property.address,
        distance: property.distance,
        image: property.image
      };

      onOpenVisitRescheduler(existingVisitData, propertyData);
    } else {
      console.log('Reschedule visit for property:', propertyId);
    }
  };

  const handleCancelVisit = (propertyId) => {
    console.log('Cancel visit for property:', propertyId);
    // Implement visit cancellation logic
  };

  const handleStartBotTraining = (propertyId) => {
    console.log('Start bot training for property:', propertyId);
    // Implement bot training logic
  };

  if (selectedProperty) {
    // Show different views based on property status
    if (selectedProperty.status === 'accepted' || acceptedProperties.has(selectedProperty.id)) {
      return (
        <>
          <PropertyDetailsAfterAcceptance
            property={{...selectedProperty, status: 'accepted'}}
            onBack={handleBackToList}
            onScheduleVisit={handleScheduleVisit}
            onStartChecklist={handleStartChecklist}
            onReschedule={handleReschedule}
            onCancel={handleCancelVisit}
            onStartBotTraining={handleStartBotTraining}
          />

          {/* Modals */}
          {showAcceptModal && propertyToProcess && (
            <AcceptModal
              property={propertyToProcess}
              onConfirm={handleAcceptConfirm}
              onCancel={handleModalCancel}
            />
          )}

          {showRejectModal && propertyToProcess && (
            <RejectModal
              property={propertyToProcess}
              onConfirm={handleRejectConfirm}
              onCancel={handleModalCancel}
            />
          )}
        </>
      );
    } else {
      return (
        <>
          <PropertyDetailsBeforeAcceptance
            property={selectedProperty}
            onBack={handleBackToList}
            onAccept={handlePropertyAccept}
            onReject={handlePropertyReject}
          />

          {/* Modals */}
          {showAcceptModal && propertyToProcess && (
            <AcceptModal
              property={propertyToProcess}
              onConfirm={handleAcceptConfirm}
              onCancel={handleModalCancel}
            />
          )}

          {showRejectModal && propertyToProcess && (
            <RejectModal
              property={propertyToProcess}
              onConfirm={handleRejectConfirm}
              onCancel={handleModalCancel}
            />
          )}
        </>
      );
    }
  }

  return (
    <div className="trainerproperties-container">

      <div className="trainerproperties-content">
        <div className="trainerproperties-title-section">
          <h1 className="trainerproperties-title">List of Properties</h1>
          <p className="trainerproperties-subtitle">
            Fill in the following fields to add a new property.
          </p>
        </div>

        <div className="trainerproperties-grid">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="trainerproperties-no-results">
            <p>No properties found matching your search.</p>
          </div>
        )}

        <div className="trainerproperties-pagination">
          <button className="trainerproperties-page-btn trainerproperties-page-active">1</button>
          <button className="trainerproperties-page-btn">2</button>
          <button className="trainerproperties-page-btn">3</button>
          <button className="trainerproperties-page-btn">4</button>
          <span className="trainerproperties-page-dots">...</span>
          <button className="trainerproperties-page-btn">15</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboardAllproperties;
