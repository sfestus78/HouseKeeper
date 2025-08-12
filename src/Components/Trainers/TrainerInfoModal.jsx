import React, { useEffect } from 'react';
import styles from './TrainerInfoModal.module.css';

const TrainerInfoModal = ({ isOpen, trainer, onClose, onAssignToProperty }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !trainer) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Trainer Information</h2>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Modal Content */}
          <div className={styles.modalContent}>
            {/* Trainer Avatar and Basic Info */}
            <div className={styles.trainerHeader}>
              <div className={styles.avatarContainer}>
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  className={styles.avatar}
                />
                <div className={styles.levelBadge}>
                  <div className={styles.levelIcon}></div>
                  <span className={styles.levelText}>Level 1</span>
                </div>
              </div>
              <div className={styles.trainerBasicInfo}>
                <h3 className={styles.trainerName}>{trainer.name}</h3>
                <div className={styles.assignmentInfo}>
                  <span>Assigned to </span>
                  <span className={styles.assignmentCount}>
                    {trainer.assignedProperties} Properties
                  </span>
                </div>
              </div>
            </div>

            {/* Trainer Details */}
            <div className={styles.trainerDetails}>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Email</div>
                <div className={styles.detailValue}>{trainer.email}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Phone</div>
                <div className={styles.detailValue}>{trainer.phone}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Address</div>
                <div className={styles.detailValue}>{trainer.address}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Experience Level</div>
                <div className={styles.detailValue}>{trainer.level}</div>
              </div>
              <div className={styles.detailRow}>
                <div className={styles.detailLabel}>Total Properties</div>
                <div className={styles.detailValue}>{trainer.assignedProperties}</div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.assignButton} onClick={onAssignToProperty}>
              Assign to Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfoModal;
