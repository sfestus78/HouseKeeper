import React, { useState } from 'react';
import Step1SelectProperty from './Step1SelectProperty';
import Step2SelectTrainer from './Step2SelectTrainer';
import TrainerInfoModal from './TrainerInfoModal';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SuccessModal';
import { mockProperties, mockTrainers } from '../shared/propertiesData';
import styles from './AssignProperty.module.css';

const AssignPropertyContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Use the trainer data with all required fields
  const extendedTrainers = mockTrainers;

  // Get unassigned properties
  const unassignedProperties = mockProperties.filter(property => property.trainerStatus === 'unassigned');

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentStep(2);
  };

  const handleTrainerSelect = (trainer) => {
    setSelectedTrainer(trainer);
    setShowTrainerModal(true);
  };

  const handleAssignToProperty = () => {
    setShowTrainerModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmAssignment = () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessDone = () => {
    setShowSuccessModal(false);
    setCurrentStep(1);
    setSelectedProperty(null);
    setSelectedTrainer(null);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setSelectedProperty(null);
    }
  };

  return (
    <div className={styles.assignPropertyContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Assign Property</h1>
        <p className={styles.subtitle}>
          Fill in the following fields to add a new property.
        </p>
      </div>

      {currentStep === 1 && (
        <Step1SelectProperty
          unassignedProperties={unassignedProperties}
          onPropertySelect={handlePropertySelect}
        />
      )}

      {currentStep === 2 && (
        <Step2SelectTrainer
          trainers={extendedTrainers}
          onTrainerSelect={handleTrainerSelect}
          selectedProperty={selectedProperty}
          onBack={handleBack}
        />
      )}

      {/* Modals */}
      <TrainerInfoModal
        isOpen={showTrainerModal}
        onClose={() => setShowTrainerModal(false)}
        trainer={selectedTrainer}
        selectedProperty={selectedProperty}
        onAssignToProperty={handleAssignToProperty}
      />

      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        trainer={selectedTrainer}
        property={selectedProperty}
        onConfirm={handleConfirmAssignment}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessDone}
        trainer={selectedTrainer}
        property={selectedProperty}
      />
    </div>
  );
};

export default AssignPropertyContent;
