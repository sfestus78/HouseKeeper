import React, { useState, useEffect } from 'react';
import TrainerInfoModal from './TrainerInfoModal';
import AssignPropertyModal from './AssignPropertyModal';
import CongratulationsModal from './TrainerCongratulationsModal';
import { mockTrainers } from '../shared/trainersData';
import { mockProperties } from '../shared/propertiesData';
import styles from './TrainersPage.module.css';

const TrainersContent = () => {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showTrainerInfoModal, setShowTrainerInfoModal] = useState(false);
  const [showAssignPropertyModal, setShowAssignPropertyModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [assignmentData, setAssignmentData] = useState(null);

  const trainersPerPage = 10;

  // Get unassigned properties
  const getUnassignedProperties = () => {
    return mockProperties.filter(property => property.trainerStatus === 'unassigned');
  };

  // Filter trainers based on search term
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);
  const startIndex = (currentPage - 1) * trainersPerPage;
  const endIndex = startIndex + trainersPerPage;
  const currentTrainers = filteredTrainers.slice(startIndex, endIndex);

  const handleAssignProperty = (trainer) => {
    setSelectedTrainer(trainer);
    setShowTrainerInfoModal(true);
  };

  const handleTrainerInfoModalClose = () => {
    setShowTrainerInfoModal(false);
    setSelectedTrainer(null);
  };

  const handleAssignToProperty = () => {
    setShowTrainerInfoModal(false);
    setShowAssignPropertyModal(true);
  };

  const handleAssignPropertyModalClose = () => {
    setShowAssignPropertyModal(false);
  };

  const handlePropertyAssigned = (property) => {
    setAssignmentData({
      trainer: selectedTrainer,
      property: property
    });
    setShowAssignPropertyModal(false);
    setShowCongratulationsModal(true);
    
    // Update trainer's assigned properties count
    setTrainers(prevTrainers =>
      prevTrainers.map(trainer =>
        trainer.id === selectedTrainer.id
          ? { ...trainer, assignedProperties: trainer.assignedProperties + 1 }
          : trainer
      )
    );
  };

  const handleCongratulationsModalClose = () => {
    setShowCongratulationsModal(false);
    setSelectedTrainer(null);
    setAssignmentData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.mainContent}>
      {/* Page Title */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>List of Trainers</h1>
        <p className={styles.pageSubtitle}>
          Fill in the following fields to add a new property.
        </p>
      </div>

      {/* Trainers Grid */}
      <div className={styles.trainersGrid}>
        {currentTrainers.map((trainer) => (
          <div key={trainer.id} className={styles.trainerCard}>
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className={styles.avatar}
                />
                <div className={styles.levelBadge}>
                  <div className={styles.levelBadgeInner}>
                    <div className={styles.levelIcon}></div>
                    <div className={styles.levelText}>Level 1</div>
                  </div>
                </div>
              </div>

              <div className={styles.trainerInfo}>
                <div className={styles.trainerName}>{trainer.name}</div>
                <div className={styles.assignmentInfo}>
                  <span>Assigned to </span>
                  <span className={styles.assignmentCount}>
                    {trainer.assignedProperties} Properties
                  </span>
                </div>
              </div>

              <button
                className={styles.assignButton}
                onClick={() => handleAssignProperty(trainer)}
              >
                Assign Property
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`${styles.paginationItem} ${
                currentPage === page ? styles.paginationItemActive : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
          ))}
          {totalPages > 4 && (
            <>
              <div className={styles.paginationEllipsis}>...</div>
              <div
                className={`${styles.paginationItem} ${
                  currentPage === totalPages ? styles.paginationItemActive : ''
                }`}
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </div>
            </>
          )}
        </div>
      )}

      {/* Modals */}
      <TrainerInfoModal
        isOpen={showTrainerInfoModal}
        trainer={selectedTrainer}
        onClose={handleTrainerInfoModalClose}
        onAssignToProperty={handleAssignToProperty}
      />

      <AssignPropertyModal
        isOpen={showAssignPropertyModal}
        trainer={selectedTrainer}
        properties={getUnassignedProperties()}
        onClose={handleAssignPropertyModalClose}
        onPropertyAssigned={handlePropertyAssigned}
      />

      <CongratulationsModal
        isOpen={showCongratulationsModal}
        assignmentData={assignmentData}
        onClose={handleCongratulationsModalClose}
      />
    </div>
  );
};

export default TrainersContent;
