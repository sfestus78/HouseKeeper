import React, { useState } from 'react';
import { Edit, Camera, X, Check, Star } from 'lucide-react';
import './TrainerUserProfile.css';

const TrainerUserProfile = () => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profileImage, setProfileImage] = useState("https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true");
  
  const [userInfo, setUserInfo] = useState({
    firstName: 'Anthony',
    lastName: 'Bridge',
    email: 'a.bridge12@gmail.com',
    mobile: '+995-445-551-4048',
    location: '90 Orange St, Teneriffe EC1A 1AH'
  });

  const [editingInfo, setEditingInfo] = useState({ ...userInfo });

  const currentProperties = [
    {
      id: 1,
      name: 'The Chesterfield Lofts',
      address: '1456 Veltri Drive, Anchorage, AK 99502',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/37ed28ed22a852fd4ea2d53a3daa822a3c880802?placeholderIfAbsent=true',
      status: 'complete'
    },
    {
      id: 2,
      name: 'Cambridge Gardens',
      address: '591 Joanne Lane, Wilmington, MA 01887',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/f5e603397ae3174a34858f0c63efe51f39aab1ae?placeholderIfAbsent=true',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Greenwich Park Apartments',
      address: '4387 Farland Avenue, San Antonio, TX 78212',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/8b03e2cf30327df69b6bfac0f39e933b980604ec?placeholderIfAbsent=true',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Notting Hill Suites',
      address: '105 Jerry Dove Drive, Florence, SC 29501',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/40dc88f42f3c877f7da65d4d76afecd74c4ee1ee?placeholderIfAbsent=true',
      status: 'complete'
    },
    {
      id: 5,
      name: 'Hampstead Court',
      address: '612 Shadowmar Drive, New Orleans, LA 70115',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/6219796835153eaff2d46683eb1d1be8dece32a8?placeholderIfAbsent=true',
      status: 'in-progress'
    },
    {
      id: 6,
      name: 'St. James Heights',
      address: '3024 Joes Road, Albany, NY 12207',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/04830da8e99f7d4fa0babbe8f831861eb33400e9?placeholderIfAbsent=true',
      status: 'complete'
    }
  ];

  const previousProperties = [
    {
      id: 7,
      name: 'The Oxford Residences',
      address: '2323 Dancing Dove Lane, Long Island City, NY 11101',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/ba196297fbb4b3b7c8fc4067cbc6bc85e2083512?placeholderIfAbsent=true',
      status: 'accepted'
    },
    {
      id: 8,
      name: 'Westminster Towers',
      address: '970 Ersel Street, Carrollton, TX 75006',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/04830da8e99f7d4fa0babbe8f831861eb33400e9?placeholderIfAbsent=true',
      status: 'rejected'
    },
    {
      id: 9,
      name: 'Buckingham Heights',
      address: '2900 Ritter Street, Huntsville, AL 35802',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/5d4cf994b1fe5370dbb49fe1a2d99691e8941fdf?placeholderIfAbsent=true',
      status: 'rejected'
    },
    {
      id: 10,
      name: 'The Ashford Residences',
      address: '605 Dog Hill Lane, Topeka, KS 66603',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/0eea991ac810341525d12d4f648509b776e44b86?placeholderIfAbsent=true',
      status: 'accepted'
    },
    {
      id: 11,
      name: 'Thames View Apartments',
      address: '3707 Irving Place, Arnold, MO 63010',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/c334296a9094d51d7b49b1bd072162f014fe6233?placeholderIfAbsent=true',
      status: 'rejected'
    },
    {
      id: 12,
      name: 'The Stratford Apartments',
      address: '184 Griffin Street, Gilbert, AZ 85233',
      image: 'https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/7ee0cc138a0b2aa903c4acfd8d685fb59288d75d?placeholderIfAbsent=true',
      status: 'accepted'
    }
  ];

  const handleSaveImage = (newImage) => {
    setProfileImage(newImage);
    setShowImageModal(false);
  };

  const handleSaveInfo = () => {
    setUserInfo({ ...editingInfo });
    setShowInfoModal(false);
  };

  const handleCancelInfo = () => {
    setEditingInfo({ ...userInfo });
    setShowInfoModal(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
      case 'accepted':
        return '#2D9F46';
      case 'in-progress':
        return '#FFBD2E';
      case 'pending':
      case 'rejected':
        return '#EF233C';
      default:
        return '#475467';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'complete':
        return 'Complete';
      case 'in-progress':
        return 'In progress';
      case 'pending':
        return 'Pending';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const handlePropertyClick = (property) => {
    // This would navigate to the property details page
    console.log('Property clicked:', property);
  };

  return (
    <div className="trainerUserProfile-container">
      <div className="trainerUserProfile-header">
        <h1 className="trainerUserProfile-title">User Profile</h1>
        <p className="trainerUserProfile-subtitle">Here is the log on all your visits.</p>
      </div>

      {/* Profile Header Section */}
      <div className="trainerUserProfile-profileHeader">
        <div className="trainerUserProfile-levelBadge">
          <div className="trainerUserProfile-levelIcon">
            <Star size={16} fill='green'/>
          </div>
          <span className="trainerUserProfile-levelText">Level 1</span>
        </div>
        <img 
          src="https://api.builder.io/api/v1/image/assets/7cd3f6b89ed04e55a0afa12e39c219f2/019312d2479df6bb9436804faa627dbb3c676c5f?placeholderIfAbsent=true" 
          alt="Level progress" 
          className="trainerUserProfile-levelProgress"
        />
        
        <div className="trainerUserProfile-userDetails">
          <div className="trainerUserProfile-userRole">
            <div className="trainerUserProfile-roleDot"></div>
            <span className="trainerUserProfile-roleText">Trainer</span>
          </div>
          <h2 className="trainerUserProfile-userName">{userInfo.firstName} {userInfo.lastName}</h2>
          <p className="trainerUserProfile-assignmentText">
            Assigned to <strong>6 Properties</strong>
          </p>
        </div>
      </div>

      <div className="trainerUserProfile-divider"></div>

      {/* Personal Information Section */}
      <div className="trainerUserProfile-section">
        <div className="trainerUserProfile-sectionHeader">
          <h3 className="trainerUserProfile-sectionTitle">Personal Information</h3>
          <button 
            className="trainerUserProfile-editInfoBtn"
            onClick={() => setShowInfoModal(true)}
          >
            <span>Edit</span>
            <Edit size={16} />
          </button>
        </div>

        <div className="trainerUserProfile-infoGrid">
          <div className="trainerUserProfile-infoRow">
            <div className="trainerUserProfile-infoField">
              <label className="trainerUserProfile-label">First Name</label>
              <span className="trainerUserProfile-value">{userInfo.firstName}</span>
            </div>
            <div className="trainerUserProfile-infoField">
              <label className="trainerUserProfile-label">Last Name</label>
              <span className="trainerUserProfile-value">{userInfo.lastName}</span>
            </div>
          </div>

          <div className="trainerUserProfile-infoRow">
            <div className="trainerUserProfile-infoField">
              <label className="trainerUserProfile-label">Email Address</label>
              <span className="trainerUserProfile-value">{userInfo.email}</span>
            </div>
            <div className="trainerUserProfile-infoField">
              <label className="trainerUserProfile-label">Mobile Number</label>
              <span className="trainerUserProfile-value">{userInfo.mobile}</span>
            </div>
          </div>

          <div className="trainerUserProfile-infoField trainerUserProfile-fullWidth">
            <label className="trainerUserProfile-label">Location</label>
            <span className="trainerUserProfile-value">{userInfo.location}</span>
          </div>
        </div>
      </div>

      <div className="trainerUserProfile-divider"></div>

      {/* Professional Details Section */}
      <div className="trainerUserProfile-section">
        <h3 className="trainerUserProfile-sectionTitle">Professional Details</h3>
        
        <div className="trainerUserProfile-professionalGrid">
          <div className="trainerUserProfile-propertiesCount">
            <label className="trainerUserProfile-label">Number of properties trained</label>
            <span className="trainerUserProfile-bigNumber">16</span>
          </div>
        </div>

        <div className="trainerUserProfile-availabilityRow">
          <label className="trainerUserProfile-label">Availability Status</label>
          <div className="trainerUserProfile-availabilityControl">
            <span className="trainerUserProfile-toggleLabel">Unavailable</span>
            <button 
              className={`trainerUserProfile-availabilityToggle ${isAvailable ? 'active' : ''}`}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <div className="trainerUserProfile-toggleCircle"></div>
            </button>
            <span className="trainerUserProfile-toggleLabel">Available</span>
          </div>
        </div>
      </div>

      <div className="trainerUserProfile-divider"></div>

      {/* Assigned Properties Section */}
      <div className="trainerUserProfile-section">
        <div className="trainerUserProfile-propertiesHeader">
          <h3 className="trainerUserProfile-sectionTitle">Current Assigned Properties</h3>
          <h3 className="trainerUserProfile-sectionTitle">Previously Assigned Properties</h3>
        </div>

        <div className="trainerUserProfile-propertiesContent">
          {/* Current Properties */}
          <div className="trainerUserProfile-propertiesPanel">
            <div className="trainerUserProfile-propertiesTableHeader">
              <span>Property Info</span>
              <span>Address</span>
              <span>Assignment Status</span>
            </div>
            <div className="trainerUserProfile-divider"></div>

            {currentProperties.map((property) => (
              <div key={property.id}>
                <div 
                  className="trainerUserProfile-propertyItem"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="trainerUserProfile-propertyInfo">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="trainerUserProfile-propertyImage"
                    />
                    <span className="trainerUserProfile-propertyName">{property.name}</span>
                  </div>
                  <div className="trainerUserProfile-propertyAddress">{property.address}</div>
                  <div className="trainerUserProfile-propertyStatus">
                    <span 
                      className="trainerUserProfile-statusBadge"
                      style={{ backgroundColor: `${getStatusColor(property.status)}20`, color: getStatusColor(property.status) }}
                    >
                      <div 
                        className="trainerUserProfile-statusDot"
                        style={{ backgroundColor: getStatusColor(property.status) }}
                      ></div>
                      {getStatusText(property.status)}
                    </span>
                  </div>
                </div>
                <div className="trainerUserProfile-divider"></div>
              </div>
            ))}
          </div>

          {/* Previous Properties */}
          <div className="trainerUserProfile-propertiesPanel">
            <div className="trainerUserProfile-propertiesTableHeader">
              <span>Property Info</span>
              <span>Address</span>
              <span>Assignment Status</span>
            </div>
            <div className="trainerUserProfile-divider"></div>

            {previousProperties.map((property) => (
              <div key={property.id}>
                <div 
                  className="trainerUserProfile-propertyItem"
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="trainerUserProfile-propertyInfo">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="trainerUserProfile-propertyImage"
                    />
                    <span className="trainerUserProfile-propertyName">{property.name}</span>
                  </div>
                  <div className="trainerUserProfile-propertyAddress">{property.address}</div>
                  <div className="trainerUserProfile-propertyStatus">
                    <span 
                      className="trainerUserProfile-statusBadge"
                      style={{ backgroundColor: `${getStatusColor(property.status)}20`, color: getStatusColor(property.status) }}
                    >
                      <div 
                        className="trainerUserProfile-statusDot"
                        style={{ backgroundColor: getStatusColor(property.status) }}
                      ></div>
                      {getStatusText(property.status)}
                    </span>
                  </div>
                </div>
                <div className="trainerUserProfile-divider"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageModal && (
        <div className="trainerUserProfile-modal">
          <div className="trainerUserProfile-imageModal">
            <div className="trainerUserProfile-modalHeader">
              <h3>Update Profile Picture</h3>
              <button 
                className="trainerUserProfile-closeBtn"
                onClick={() => setShowImageModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div className="trainerUserProfile-modalContent">
              <div className="trainerUserProfile-imagePreview">
                <img src={profileImage} alt="Profile" className="trainerUserProfile-previewImage" />
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="trainerUserProfile-fileInput"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setProfileImage(e.target.result);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <div className="trainerUserProfile-modalActions">
              <button 
                className="trainerUserProfile-cancelBtn"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </button>
              <button 
                className="trainerUserProfile-saveBtn"
                onClick={() => handleSaveImage(profileImage)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Info Modal */}
      {showInfoModal && (
        <div className="trainerUserProfile-modal">
          <div className="trainerUserProfile-infoModal">
            <div className="trainerUserProfile-modalHeader">
              <h3>Edit Personal Information</h3>
              <button 
                className="trainerUserProfile-closeBtn"
                onClick={handleCancelInfo}
              >
                <X size={20} />
              </button>
            </div>
            <div className="trainerUserProfile-modalContent">
              <div className="trainerUserProfile-formGrid">
                <div className="trainerUserProfile-formRow">
                  <div className="trainerUserProfile-formField">
                    <label>First Name</label>
                    <input 
                      type="text"
                      value={editingInfo.firstName}
                      onChange={(e) => setEditingInfo({...editingInfo, firstName: e.target.value})}
                    />
                  </div>
                  <div className="trainerUserProfile-formField">
                    <label>Last Name</label>
                    <input 
                      type="text"
                      value={editingInfo.lastName}
                      onChange={(e) => setEditingInfo({...editingInfo, lastName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="trainerUserProfile-formRow">
                  <div className="trainerUserProfile-formField">
                    <label>Email Address</label>
                    <input 
                      type="email"
                      value={editingInfo.email}
                      onChange={(e) => setEditingInfo({...editingInfo, email: e.target.value})}
                    />
                  </div>
                  <div className="trainerUserProfile-formField">
                    <label>Mobile Number</label>
                    <input 
                      type="tel"
                      value={editingInfo.mobile}
                      onChange={(e) => setEditingInfo({...editingInfo, mobile: e.target.value})}
                    />
                  </div>
                </div>
                <div className="trainerUserProfile-formField trainerUserProfile-fullWidth">
                  <label>Location</label>
                  <input 
                    type="text"
                    value={editingInfo.location}
                    onChange={(e) => setEditingInfo({...editingInfo, location: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="trainerUserProfile-modalActions">
              <button 
                className="trainerUserProfile-cancelBtn"
                onClick={handleCancelInfo}
              >
                Cancel
              </button>
              <button 
                className="trainerUserProfile-saveBtn"
                onClick={handleSaveInfo}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerUserProfile;
