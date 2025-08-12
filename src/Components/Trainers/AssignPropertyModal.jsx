import React, { useState, useEffect } from 'react';
import styles from './AssignPropertyModal.module.css';

const AssignPropertyModal = ({ isOpen, trainer, properties, onClose, onPropertyAssigned }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setSelectedProperty(null);
    }
  }, [isOpen]);

  if (!isOpen || !trainer) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleAssign = async () => {
    if (!selectedProperty) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onPropertyAssigned(selectedProperty);
    }, 1000);
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h2 className={styles.modalTitle}>Assign Property to {trainer.name}</h2>
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
            <div className={styles.sectionTitle}>Select an Unassigned Property</div>
            
            {properties.length === 0 ? (
              <div className={styles.noProperties}>
                <div className={styles.noPropertiesIcon}>🏠</div>
                <div className={styles.noPropertiesText}>No unassigned properties available</div>
                <div className={styles.noPropertiesSubtext}>
                  All properties have been assigned to trainers. Create new properties to assign more.
                </div>
              </div>
            ) : (
              <div className={styles.propertiesList}>
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className={`${styles.propertyItem} ${
                      selectedProperty?.id === property.id ? styles.propertyItemSelected : ''
                    }`}
                    onClick={() => handlePropertySelect(property)}
                  >
                    <div className={styles.propertyImage}>
                      <img src={property.image} alt={property.name} />
                    </div>
                    <div className={styles.propertyInfo}>
                      <div className={styles.propertyName}>{property.name}</div>
                      <div className={styles.propertyAddress}>{property.address}</div>
                      <div className={styles.propertyStatus}>
                        <span className={styles.statusBadge}>Unassigned</span>
                      </div>
                    </div>
                    <div className={styles.selectIndicator}>
                      {selectedProperty?.id === property.id && (
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M16.667 5L7.5 14.167L3.333 10"
                            stroke="#2D9F46"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className={styles.modalFooter}>
            <button className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              className={`${styles.assignButton} ${
                !selectedProperty || isLoading ? styles.assignButtonDisabled : ''
              }`}
              onClick={handleAssign}
              disabled={!selectedProperty || isLoading}
            >
              {isLoading ? (
                <>
                  <div className={styles.spinner}></div>
                  Assigning...
                </>
              ) : (
                'Assign Property'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignPropertyModal;
