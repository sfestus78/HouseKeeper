import React from 'react';
import { X, Mail, Phone, MapPin } from 'lucide-react';
import styles from './AssignProperty.module.css';

const TrainerInfoModal = ({ isOpen, onClose, trainer, selectedProperty, onAssignToProperty }) => {
  if (!isOpen || !trainer) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Trainer Information</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        <div className={styles.modalContent}>
          {/* Trainer Profile */}
          <div className={styles.trainerProfile}>
            <img
              src={trainer.image}
              alt={trainer.name}
              className={styles.modalTrainerImage}
            />
            <div className={styles.trainerProfileInfo}>
              <h3 className={styles.modalTrainerName}>{trainer.name}</h3>
              <div className={styles.modalLevelBadge}>
                <span className={styles.modalLevelText}>{trainer.level}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <Mail className={styles.contactIcon} />
              <span className={styles.contactText}>{trainer.email}</span>
            </div>
            <div className={styles.contactItem}>
              <Phone className={styles.contactIcon} />
              <span className={styles.contactText}>{trainer.phone}</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin className={styles.contactIcon} />
              <span className={styles.contactText}>{trainer.address}</span>
            </div>
          </div>

          {/* Assignment Stats */}
          <div className={styles.assignmentStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{trainer.assignedProperties}</span>
              <span className={styles.statLabel}>Properties Assigned</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.8</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2.5</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
          </div>

          {/* Selected Property Info */}
          {selectedProperty && (
            <div className={styles.modalPropertyInfo}>
              <h4 className={styles.modalPropertyTitle}>Assigning to:</h4>
              <div className={styles.modalPropertyCard}>
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.name}
                  className={styles.modalPropertyImage}
                />
                <div className={styles.modalPropertyDetails}>
                  <h5 className={styles.modalPropertyName}>{selectedProperty.name}</h5>
                  <p className={styles.modalPropertyAddress}>{selectedProperty.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.assignToPropertyButton} onClick={onAssignToProperty}>
            Assign to Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerInfoModal;
