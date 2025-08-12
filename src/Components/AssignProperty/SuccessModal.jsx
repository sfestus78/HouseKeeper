import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import styles from './AssignProperty.module.css';

const SuccessModal = ({ isOpen, onClose, trainer, property }) => {
  if (!isOpen || !trainer || !property) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.successModalContainer}>
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.successContent}>
          {/* Success Icon */}
          <div className={styles.successIcon}>
            <CheckCircle className={styles.successCheckIcon} />
          </div>

          {/* Success Message */}
          <div className={styles.successMessage}>
            <h2 className={styles.successTitle}>Property Assigned Successfully!</h2>
            <p className={styles.successSubtitle}>
              {property.name} has been successfully assigned to {trainer.name}.
            </p>
          </div>

          {/* Assignment Details */}
          <div className={styles.successDetails}>
            <div className={styles.successSection}>
              <img
                src={property.image}
                alt={property.name}
                className={styles.successImage}
              />
              <div className={styles.successInfo}>
                <span className={styles.successName}>{property.name}</span>
                <span className={styles.successSubtext}>{property.address}</span>
              </div>
            </div>

            <div className={styles.assignmentArrow}>→</div>

            <div className={styles.successSection}>
              <img
                src={trainer.image}
                alt={trainer.name}
                className={styles.successImage}
              />
              <div className={styles.successInfo}>
                <span className={styles.successName}>{trainer.name}</span>
                <span className={styles.successSubtext}>{trainer.level} Trainer</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className={styles.nextSteps}>
            <h4 className={styles.nextStepsTitle}>What happens next?</h4>
            <ul className={styles.nextStepsList}>
              <li>The trainer will be notified via email</li>
              <li>Property details will be shared with the trainer</li>
              <li>Training schedule will be coordinated</li>
            </ul>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.doneButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
