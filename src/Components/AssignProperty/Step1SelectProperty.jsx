import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './AssignProperty.module.css';

const Step1SelectProperty = ({ unassignedProperties, onPropertySelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDropdownProperty, setSelectedDropdownProperty] = useState(null);

  const handleDropdownSelect = (property) => {
    setSelectedDropdownProperty(property);
    setIsDropdownOpen(false);
  };

  const handlePropertyCardSelect = (property) => {
    onPropertySelect(property);
  };

  const handleDropdownContinue = () => {
    if (selectedDropdownProperty) {
      onPropertySelect(selectedDropdownProperty);
    }
  };

  return (
    <div className={styles.stepContainer}>
      {/* Step Header */}
      <div className={styles.stepHeader}>
        <div className={styles.stepTitle}>
          <span className={styles.stepNumber}>STEP 1:</span>
          <span className={styles.stepLabel}>Choose a Property</span>
        </div>
        <div className={styles.stepDivider}></div>
      </div>

      {/* Dropdown Section */}
      <div className={styles.dropdownSection}>
        <label className={styles.inputLabel}>Select Property:</label>
        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdown}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={styles.dropdownText}>
              {selectedDropdownProperty ? selectedDropdownProperty.name : 'Prime Estates'}
            </span>
            <ChevronDown className={styles.dropdownIcon} />
          </div>
          
          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {unassignedProperties.map((property) => (
                <div
                  key={property.id}
                  className={styles.dropdownItem}
                  onClick={() => handleDropdownSelect(property)}
                >
                  {property.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Or Pick Section */}
      <div className={styles.orPickSection}>
        <p className={styles.orPickText}>
          Or Pick from your list of{' '}
          <span className={styles.unassignedText}>Unassigned Properties</span>
        </p>

        <div className={styles.propertyCardsGrid}>
          {unassignedProperties.slice(0, 8).map((property) => (
            <div key={property.id} className={styles.propertyCard}>
              <div className={styles.propertyCardContent}>
                <div className={styles.propertyCardInfo}>
                  <img
                    src={property.image}
                    alt={property.name}
                    className={styles.propertyImage}
                  />
                  <div className={styles.propertyDetails}>
                    <h4 className={styles.propertyName}>{property.name}</h4>
                    <p className={styles.propertyAddress}>{property.address}</p>
                  </div>
                </div>
                <button
                  className={styles.selectPropertyButton}
                  onClick={() => handlePropertyCardSelect(property)}
                >
                  Select Property
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress and Next Button */}
      <div className={styles.stepFooter}>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '50%' }}></div>
          </div>
        </div>
        
        {selectedDropdownProperty && (
          <button
            className={styles.nextButton}
            onClick={handleDropdownContinue}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Step1SelectProperty;
