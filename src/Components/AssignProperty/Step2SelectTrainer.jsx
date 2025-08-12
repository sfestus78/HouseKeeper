import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './AssignProperty.module.css';

const Step2SelectTrainer = ({ trainers, onTrainerSelect, selectedProperty, onBack }) => {
  return (
    <div className={styles.stepContainer}>
      {/* Step Header */}
      <div className={styles.stepHeader}>
        <div className={styles.stepTitle}>
          <span className={styles.stepNumber}>STEP 2:</span>
          <span className={styles.stepLabel}>Select Trainer for {selectedProperty?.name}</span>
        </div>
        <div className={styles.stepDivider}></div>
      </div>

      {/* Selected Property Info */}
      <div className={styles.selectedPropertyInfo}>
        <h3 className={styles.selectedPropertyTitle}>Selected Property:</h3>
        <div className={styles.selectedPropertyCard}>
          <img
            src={selectedProperty?.image}
            alt={selectedProperty?.name}
            className={styles.selectedPropertyImage}
          />
          <div className={styles.selectedPropertyDetails}>
            <h4 className={styles.selectedPropertyName}>{selectedProperty?.name}</h4>
            <p className={styles.selectedPropertyAddress}>{selectedProperty?.address}</p>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className={styles.trainersSection}>
        <h3 className={styles.trainersTitle}>Available Trainers</h3>
        <div className={styles.trainersGrid}>
          {trainers.map((trainer) => (
            <div key={trainer.id} className={styles.trainerCard}>
              <div className={styles.trainerCardContent}>
                <div className={styles.trainerHeader}>
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className={styles.trainerAvatar}
                  />
                  <div className={styles.levelBadge}>
                    <span className={styles.levelText}>{trainer.level}</span>
                  </div>
                </div>
                
                <div className={styles.trainerInfo}>
                  <h4 className={styles.trainerName}>{trainer.name}</h4>
                  <p className={styles.trainerAssignments}>
                    Assigned to <span className={styles.assignmentCount}>{trainer.assignedProperties} Properties</span>
                  </p>
                </div>

                <button
                  className={styles.assignButton}
                  onClick={() => onTrainerSelect(trainer)}
                >
                  Assign Property
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress and Navigation */}
      <div className={styles.stepFooter}>
        <div className={styles.navigationContainer}>
          <button className={styles.backButton} onClick={onBack}>
            <ArrowLeft className={styles.backIcon} />
            Back
          </button>
          
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2SelectTrainer;
