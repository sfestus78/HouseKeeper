import React, { useState, useEffect } from 'react';
import TrainerInfoModal from './TrainerInfoModal';
import AssignPropertyModal from './AssignPropertyModal';
import CongratulationsModal from './TrainerCongratulationsModal';
import { mockTrainers } from '../shared/trainersData';
import { mockProperties } from '../shared/propertiesData';
import styles from './TrainersPage.module.css';

const TrainersPage = ({ onNavigate }) => {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showTrainerInfoModal, setShowTrainerInfoModal] = useState(false);
  const [showAssignPropertyModal, setShowAssignPropertyModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
  const [assignmentData, setAssignmentData] = useState(null);

  const trainersPerPage = 12;

  // Get unassigned properties
  const getUnassignedProperties = () => {
    return mockProperties.filter(property => property.trainerStatus === 'unassigned');
  };

  // Filter trainers based on search term
  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);
  const startIndex = (currentPage - 1) * trainersPerPage;
  const endIndex = startIndex + trainersPerPage;
  const currentTrainers = filteredTrainers.slice(startIndex, endIndex);

  const handleAssignProperty = (trainer) => {
    setSelectedTrainer(trainer);
    setShowTrainerInfoModal(true);
  };

  const handleTrainerInfoModalClose = () => {
    setShowTrainerInfoModal(false);
    setSelectedTrainer(null);
  };

  const handleAssignToProperty = () => {
    setShowTrainerInfoModal(false);
    setShowAssignPropertyModal(true);
  };

  const handleAssignPropertyModalClose = () => {
    setShowAssignPropertyModal(false);
  };

  const handlePropertyAssigned = (property) => {
    setAssignmentData({
      trainer: selectedTrainer,
      property: property
    });
    setShowAssignPropertyModal(false);
    setShowCongratulationsModal(true);
    
    // Update trainer's assigned properties count
    setTrainers(prevTrainers =>
      prevTrainers.map(trainer =>
        trainer.id === selectedTrainer.id
          ? { ...trainer, assignedProperties: trainer.assignedProperties + 1 }
          : trainer
      )
    );
  };

  const handleCongratulationsModalClose = () => {
    setShowCongratulationsModal(false);
    setSelectedTrainer(null);
    setAssignmentData(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.trainersPageContainer}>
      {/* Browser Bar */}
      <div className={styles.browserBar}>
        <div className={styles.browserBarContent}>
          <div className={styles.browserBarLeft}>
            <img
              src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e71dc262b006089798db2062a87eba7df0a53713?placeholderIfAbsent=true"
              alt="Browser menu"
              className={styles.browserMenuIcon}
            />
            <div className={styles.urlBar}>
              <div className={styles.urlContent}>
                <div className={styles.urlText}>https://housekeepers.com</div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/ab3c402689ba3c12d1bcce6e17c4c340179cc5ab?placeholderIfAbsent=true"
                alt="Dropdown"
                className={styles.urlDropdownIcon}
              />
            </div>
          </div>
          <img
            src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/4489c9007e93a9ecad2e57ea3a541ab03c1959e7?placeholderIfAbsent=true"
            alt="Browser controls"
            className={styles.browserControls}
          />
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <div className={styles.sidebarColumn}>
          <div className={styles.sidebar}>
            {/* Logo Section */}
            <div className={styles.logoSection}>
              <img
                src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/f59cfd379b0660c1dc6b0e7ac118e100d0156d3d?placeholderIfAbsent=true"
                alt="Housekeepers Logo"
                className={styles.logo}
              />
              <div className={styles.logoText}>Housekeepers</div>
            </div>

            {/* Navigation */}
            <nav className={styles.navBar}>
              <div className={styles.navItem} onClick={() => onNavigate && onNavigate('creatorDashboard')}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Overview</div>
              </div>
              <div className={styles.navItem} onClick={() => onNavigate && onNavigate('creatorNewProperty')}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Create New Property</div>
              </div>
              <div className={styles.navItem} onClick={() => onNavigate && onNavigate('assignProperty')}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/aa3a4e0c1f96066ff4bb10202c64def1bcd99d75?placeholderIfAbsent=true"
                  alt="Assign Property"
                  className={styles.navIconImage}
                />
                <div className={styles.navText}>Assign Property</div>
              </div>
              <div className={styles.navItem} onClick={() => onNavigate && onNavigate('allProperties')}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>All Properties</div>
              </div>
              <div className={`${styles.navItem} ${styles.navItemActive}`}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Trainers</div>
              </div>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Settings</div>
              </div>
              <div className={styles.navItem}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/eb04e19b734f40615a0437afcb57df342f9d438e?placeholderIfAbsent=true"
                  alt="Help Center"
                  className={styles.navIconImage}
                />
                <div className={styles.navText}>Help Center</div>
              </div>
            </nav>

            {/* Divider */}
            <div className={styles.divider}></div>

            {/* Profile Section */}
            <div className={styles.profileSection}>
              <div className={styles.profileAvatar}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/4ef254d4774ea3f50c8297fd11f1a70b7badd794?placeholderIfAbsent=true"
                  alt="User Avatar"
                  className={styles.avatarImage}
                />
              </div>
              <div className={styles.profileInfo}>
                <div className={styles.profileDetails}>
                  <div className={styles.profileName}>Jon Doe</div>
                  <div className={styles.profileEmail}>jon.doe@gmail.com</div>
                </div>
                <div className={styles.logoutButton}>Log out</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.contentColumn}>
          <div className={styles.mainContent}>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.searchSection}>
                <div className={styles.searchBar}>
                  <input
                    type="text"
                    placeholder="Enter Property Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                  />
                  <div className={styles.searchIcon}></div>
                </div>
                <div className={styles.notificationContainer}>
                  <div className={styles.notificationBell}>
                    <div className={styles.notificationDot}></div>
                  </div>
                </div>
              </div>

              <div className={styles.accountSwitcher}>
                <div className={styles.switcherLabel}>Switch account type</div>
                <div className={styles.switcherControls}>
                  <div className={styles.switcherOption}>Creator</div>
                  <div className={styles.toggle}>
                    <div className={styles.toggleSlider}>
                      <div className={styles.toggleButton}></div>
                    </div>
                  </div>
                  <div className={styles.switcherOption}>Trainer</div>
                </div>
              </div>
            </div>

            {/* Page Title */}
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>List of Trainers</h1>
              <p className={styles.pageSubtitle}>
                Fill in the following fields to add a new property.
              </p>
            </div>

            {/* Trainers Grid */}
            <div className={styles.trainersGrid}>
              {currentTrainers.map((trainer) => (
                <div key={trainer.id} className={styles.trainerCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <img
                        src={trainer.avatar}
                        alt={trainer.name}
                        className={styles.avatar}
                      />
                      <div className={styles.levelBadge}>
                        <div className={styles.levelBadgeInner}>
                          <div className={styles.levelIcon}></div>
                          <div className={styles.levelText}>Level 1</div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.trainerInfo}>
                      <div className={styles.trainerName}>{trainer.name}</div>
                      <div className={styles.assignmentInfo}>
                        <span>Assigned to </span>
                        <span className={styles.assignmentCount}>
                          {trainer.assignedProperties} Properties
                        </span>
                      </div>
                    </div>

                    <button
                      className={styles.assignButton}
                      onClick={() => handleAssignProperty(trainer)}
                    >
                      Assign Property
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => i + 1).map((page) => (
                  <div
                    key={page}
                    className={`${styles.paginationItem} ${
                      currentPage === page ? styles.paginationItemActive : ''
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </div>
                ))}
                {totalPages > 4 && (
                  <>
                    <div className={styles.paginationEllipsis}>...</div>
                    <div
                      className={`${styles.paginationItem} ${
                        currentPage === totalPages ? styles.paginationItemActive : ''
                      }`}
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <TrainerInfoModal
        isOpen={showTrainerInfoModal}
        trainer={selectedTrainer}
        onClose={handleTrainerInfoModalClose}
        onAssignToProperty={handleAssignToProperty}
      />

      <AssignPropertyModal
        isOpen={showAssignPropertyModal}
        trainer={selectedTrainer}
        properties={getUnassignedProperties()}
        onClose={handleAssignPropertyModalClose}
        onPropertyAssigned={handlePropertyAssigned}
      />

      <CongratulationsModal
        isOpen={showCongratulationsModal}
        assignmentData={assignmentData}
        onClose={handleCongratulationsModalClose}
      />
    </div>
  );
};

export default TrainersPage;
