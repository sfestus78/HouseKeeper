import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import styles from './AssignProperty.module.css';

const ConfirmationModal = ({ isOpen, onClose, trainer, property, onConfirm }) => {
  if (!isOpen || !trainer || !property) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.confirmationModalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Confirm Property Assignment</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.confirmationContent}>
          {/* Confirmation Icon */}
          <div className={styles.confirmationIcon}>
            <CheckCircle className={styles.checkIcon} />
          </div>

          {/* Assignment Summary */}
          <div className={styles.assignmentSummary}>
            <h3 className={styles.confirmationTitle}>Please confirm the assignment:</h3>
            
            <div className={styles.summarySection}>
              <h4 className={styles.summaryLabel}>Property:</h4>
              <div className={styles.summaryItem}>
                <img
                  src={property.image}
                  alt={property.name}
                  className={styles.summaryImage}
                />
                <div className={styles.summaryDetails}>
                  <span className={styles.summaryName}>{property.name}</span>
                  <span className={styles.summaryAddress}>{property.address}</span>
                </div>
              </div>
            </div>

            <div className={styles.summarySection}>
              <h4 className={styles.summaryLabel}>Assigned Trainer:</h4>
              <div className={styles.summaryItem}>
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className={styles.summaryImage}
                />
                <div className={styles.summaryDetails}>
                  <span className={styles.summaryName}>{trainer.name}</span>
                  <span className={styles.summarySubtext}>{trainer.level} Level • {trainer.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          <div className={styles.warningMessage}>
            <p>This action will assign the property to the selected trainer. The trainer will be notified via email.</p>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Accept Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
