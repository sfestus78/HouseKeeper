import React, { useState, useRef } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiUpload, FiX, FiCheck } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreatePropertyForm.module.css';

const CreatePropertyForm = () => {
  // Form state management
  const [propertyName, setPropertyName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [checklistItems, setChecklistItems] = useState([
    { id: uuidv4(), text: 'Access & Entry Check (Confirm door locks, key location, entrance security)', isEditing: false },
    { id: uuidv4(), text: 'Cleanliness & Readiness (Ensure property is tidy, beds are made, essentials are stocked)', isEditing: false },
    { id: uuidv4(), text: 'Wi-Fi Check (Test connectivity and speed)', isEditing: false },
    { id: uuidv4(), text: 'Lighting & Power Check (Confirm all lights, AC, sockets, and appliances are working)', isEditing: false },
    { id: uuidv4(), text: 'Emergency Contacts Visibility (Check if emergency numbers are displayed in the property)', isEditing: false }
  ]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Refs
  const fileInputRef = useRef(null);
  const newItemInputRef = useRef(null);

  // Property type options
  const propertyTypes = [
    { value: 'House', icon: '🏠', label: 'House' },
    { value: 'Apartment', icon: '🏢', label: 'Apartment' },
    { value: 'Guesthouse', icon: '🏘️', label: 'Guesthouse' },
    { value: 'Tiny Home', icon: '🏡', label: 'Tiny Home' }
  ];

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages(prevImages => [...prevImages, ...files]);

    // Create preview URLs
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, { id: uuidv4(), url: e.target.result, file }]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove image
  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  // Add new checklist item
  const addChecklistItem = () => {
    const newItem = { id: uuidv4(), text: '', isEditing: true };
    setChecklistItems(prev => [...prev, newItem]);
    setTimeout(() => {
      if (newItemInputRef.current) {
        newItemInputRef.current.focus();
      }
    }, 0);
  };

  // Update checklist item
  const updateChecklistItem = (id, newText) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, text: newText, isEditing: false } : item
      )
    );
  };

  // Delete checklist item
  const deleteChecklistItem = (id) => {
    setChecklistItems(prev => prev.filter(item => item.id !== id));
  };

  // Toggle edit mode for checklist item
  const toggleEditItem = (id) => {
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  // Handle checklist item key press
  const handleChecklistKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      const item = checklistItems.find(item => item.id === id);
      if (item.text.trim()) {
        updateChecklistItem(id, item.text);
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!propertyName.trim()) {
      newErrors.propertyName = 'Property name is required';
    }

    if (!propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required';
    }

    if (!propertyType) {
      newErrors.propertyType = 'Property type is required';
    }

    if (!propertyDescription.trim()) {
      newErrors.propertyDescription = 'Property description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowSuccessModal(false);
    // Reset form
    setPropertyName('');
    setPropertyAddress('');
    setPropertyDescription('');
    setPropertyType('');
    setImages([]);
    setImagePreviews([]);
    setChecklistItems([
      { id: uuidv4(), text: 'Access & Entry Check (Confirm door locks, key location, entrance security)', isEditing: false },
      { id: uuidv4(), text: 'Cleanliness & Readiness (Ensure property is tidy, beds are made, essentials are stocked)', isEditing: false },
      { id: uuidv4(), text: 'Wi-Fi Check (Test connectivity and speed)', isEditing: false },
      { id: uuidv4(), text: 'Lighting & Power Check (Confirm all lights, AC, sockets, and appliances are working)', isEditing: false },
      { id: uuidv4(), text: 'Emergency Contacts Visibility (Check if emergency numbers are displayed in the property)', isEditing: false }
    ]);
    setErrors({});
  };

  return (
    <div className={styles['createpropertyform-container']}>
      <div className={styles['createpropertyform-formWrapper']}>
        <div className={styles['createpropertyform-header']}>
          <h1 className={styles['createpropertyform-title']}>Create a New Property</h1>
          <p className={styles['createpropertyform-subtitle']}>Fill in the following fields to add a new property.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles['createpropertyform-form']}>
          {/* Property Name */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <label className={styles['createpropertyform-label']}>Property Name</label>
            <input
              type="text"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="Enter Property Name"
              className={`${styles['createpropertyform-input']} ${errors.propertyName ? styles['createpropertyform-inputError'] : ''}`}
            />
            {errors.propertyName && <span className={styles['createpropertyform-errorText']}>{errors.propertyName}</span>}
          </div>

          {/* Property Address */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <label className={styles['createpropertyform-label']}>Property Address</label>
            <input
              type="text"
              value={propertyAddress}
              onChange={(e) => setPropertyAddress(e.target.value)}
              placeholder="Enter Property Location"
              className={`${styles['createpropertyform-input']} ${errors.propertyAddress ? styles['createpropertyform-inputError'] : ''}`}
            />
            {errors.propertyAddress && <span className={styles['createpropertyform-errorText']}>{errors.propertyAddress}</span>}
          </div>

          {/* Property Images */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <label className={styles['createpropertyform-label']}>Add Property Images</label>
            <div className={styles['createpropertyform-imageSection']}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                className={styles['createpropertyform-hiddenInput']}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={styles['createpropertyform-uploadButton']}
              >
                <FiUpload className={styles['createpropertyform-uploadIcon']} />
                Upload property images
              </button>
              
              {imagePreviews.length > 0 && (
                <div className={styles['createpropertyform-imagePreviewGrid']}>
                  {imagePreviews.map((preview, index) => (
                    <div key={preview.id} className={styles['createpropertyform-imagePreview']}>
                      <img src={preview.url} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className={styles['createpropertyform-removeImageButton']}
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles['createpropertyform-divider']}></div>

          {/* Property Type */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <label className={styles['createpropertyform-label']}>Property Type</label>
            {errors.propertyType && <span className={styles['createpropertyform-errorText']}>{errors.propertyType}</span>}
            <div className={styles['createpropertyform-propertyTypeGrid']}>
              {propertyTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setPropertyType(type.value)}
                  className={`${styles['createpropertyform-propertyTypeButton']} ${
                    propertyType === type.value ? styles['createpropertyform-propertyTypeButtonActive'] : ''
                  }`}
                >
                  <span className={styles['createpropertyform-propertyTypeIcon']}>{type.icon}</span>
                  <span className={styles['createpropertyform-propertyTypeLabel']}>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Property Description */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <label className={styles['createpropertyform-label']}>Property Description</label>
            <textarea
              value={propertyDescription}
              onChange={(e) => setPropertyDescription(e.target.value)}
              placeholder="Write a brief description on the property."
              rows={5}
              className={`${styles['createpropertyform-textarea']} ${errors.propertyDescription ? styles['createpropertyform-inputError'] : ''}`}
            />
            {errors.propertyDescription && <span className={styles['createpropertyform-errorText']}>{errors.propertyDescription}</span>}
          </div>

          {/* Property Inspection Checklist */}
          <div className={styles['createpropertyform-fieldGroup']}>
            <div className={styles['createpropertyform-checklistHeader']}>
              <label className={styles['createpropertyform-label']}>Property Inspection Checklist</label>
              <div className={styles['createpropertyform-helpTooltip']}>
                <span className={styles['createpropertyform-helpIcon']}>?</span>
                <div className={styles['createpropertyform-tooltipContent']}>
                  Create a list of checklist that trainers must lookout for during visit.
                </div>
              </div>
            </div>

            <div className={styles['createpropertyform-checklistItems']}>
              {checklistItems.map((item, index) => (
                <div key={item.id} className={styles['createpropertyform-checklistItem']}>
                  {item.isEditing ? (
                    <input
                      ref={index === checklistItems.length - 1 ? newItemInputRef : null}
                      type="text"
                      value={item.text}
                      onChange={(e) =>
                        setChecklistItems(prev =>
                          prev.map(prevItem =>
                            prevItem.id === item.id ? { ...prevItem, text: e.target.value } : prevItem
                          )
                        )
                      }
                      onBlur={() => {
                        if (item.text.trim()) {
                          updateChecklistItem(item.id, item.text);
                        } else if (item.text === '') {
                          deleteChecklistItem(item.id);
                        }
                      }}
                      onKeyPress={(e) => handleChecklistKeyPress(e, item.id)}
                      className={styles['createpropertyform-checklistInput']}
                      placeholder="Enter checklist item..."
                    />
                  ) : (
                    <span className={styles['createpropertyform-checklistText']}>{item.text}</span>
                  )}
                  <div className={styles['createpropertyform-checklistActions']}>
                    <button
                      type="button"
                      onClick={() => toggleEditItem(item.id)}
                      className={styles['createpropertyform-actionButton']}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteChecklistItem(item.id)}
                      className={styles['createpropertyform-actionButton']}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addChecklistItem}
                className={styles['createpropertyform-addChecklistButton']}
              >
                <FiPlus />
                Add New Item
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles['createpropertyform-submitButton']} ${isSubmitting ? styles['createpropertyform-submitting'] : ''}`}
          >
            {isSubmitting ? 'Creating Property...' : 'Create Property'}
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles['createpropertyform-modalOverlay']}>
          <div className={styles['createpropertyform-modal']}>
            <div className={styles['createpropertyform-modalContent']}>
              <div className={styles['createpropertyform-successIcon']}>
                <FiCheck />
              </div>
              <h2 className={styles['createpropertyform-modalTitle']}>Property Created Successfully!</h2>
              <p className={styles['createpropertyform-modalText']}>
                Your property has been added to the system and is now available for assignment.
              </p>
              <button onClick={handleModalClose} className={styles['createpropertyform-modalButton']}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePropertyForm;
