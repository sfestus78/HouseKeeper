import React, { useEffect } from 'react';
import FISTBUMP from '../../Assets/fist-bump.png'
import styles from './TrainersCongratulationsModal.module.css';

const CongratulationsModal = ({ isOpen, assignmentData, onClose }) => {
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

  if (!isOpen || !assignmentData) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { trainer, property } = assignmentData;

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          {/* Illustration Section */}
          <div className={styles.imageSection}>
            <img src={FISTBUMP} alt="congratulation" className={styles.celebrationIcon} />
          </div>
          
          {/* Text Section */}
          <div className={styles.textSection}>
            <div className={styles.title}>
              Congratulations! Assignment Successful!
            </div>
            <div className={styles.description}>
              <strong>{trainer.name}</strong> has been successfully assigned to{' '}
              <strong>{property.name}</strong>. The trainer will receive a notification 
              and can begin their work immediately.
            </div>
            <div className={styles.assignmentDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Trainer:</span>
                <span className={styles.detailValue}>{trainer.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Property:</span>
                <span className={styles.detailValue}>{property.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location:</span>
                <span className={styles.detailValue}>{property.address}</span>
              </div>
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* Actions */}
          <div className={styles.actions}>
            <button className={styles.doneButton} onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsModal;
