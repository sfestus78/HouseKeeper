import React, { useState, useEffect } from 'react';
import TrainerCard from './TrainerCard';
import Pagination from './Pagination';
import styles from './TrainerList.module.css';

// Mock trainer data - in a real app, this would come from an API
const mockTrainers = [
  {
    id: 1,
    name: "Anthony Bridge",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/f15455d755e0110c54a8cb1e09bd9f3449d967e3?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 2,
    name: "Lois Lane",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e3ad368fd93d0065359bd1d4a2572df1a0952665?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 3,
    name: "Roger Jameson",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/32207b70718921f5952fa161ed847c0bb4f5b6e1?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 4,
    name: "Barbara Gordon",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e33c0a3b18d462a439c9ff8e8436f61cdb9ae090?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 5,
    name: "Matt Li",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/566d55e3b2f6957a2c6ce324f19a55c8b0fb2739?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 6,
    name: "Carol Danvers",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/6455f113dada3beb4b68781ec02e917fbb60a2ee?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 7,
    name: "Devaj Giri",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/25c7574d02d94bfa0f4486b858ae1e9eb65ded49?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 8,
    name: "Jeffry Christiansen",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/7423c02310c7a26a0c289ac4afa7967ba4320aa5?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 9,
    name: "Wanda Maximoff",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/a4e6c24ecc9d1fceed62e0d38c013c5e221a3ea4?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 10,
    name: "Diana Prince",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/29976af32e893a9e1b23f11a194941eea7e1a57b?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 11,
    name: "Paula Irving",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/d4b858e258da34baad55384e347357a2b8fdcbcd?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 12,
    name: "Pepper Potts",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/5a2ca595519dfacdca1f2e38aff3dc00bd726cdc?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 13,
    name: "Shemar Sanford",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/5027d3d462ad5f0e23819214446530de54a5f063?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 14,
    name: "Frank Richardson",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/145361a77c8deea20ed06c38cfbe16e883629b7a?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  },
  {
    id: 15,
    name: "Harleen Quinzel",
    avatar: "https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/779618c2cd7ff1be44d1ff22c783e67170fa4175?placeholderIfAbsent=true",
    level: "Level 1",
    assignedProperties: 6
  }
];

const TrainerList = ({ filter }) => {
  const [trainers, setTrainers] = useState(mockTrainers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [accountType, setAccountType] = useState('creator');
  const [notifications] = useState([
    { id: 1, text: "New trainer assigned to Oxford Residences", time: "5 min ago" },
    { id: 2, text: "Bot training completed for Buckingham Heights", time: "1 hour ago" },
    { id: 3, text: "Property verification pending for St. James Heights", time: "2 hours ago" }
  ]);

  const trainersPerPage = 8;
  const isFilteredForAvailable = filter === 'available';

  // Mock user data
  const getAccountName = () => "Jon Doe";
  const getUserEmail = () => "jon.doe@gmail.com";

  // Filter trainers based on search term and availability filter
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase());

    if (isFilteredForAvailable) {
      return matchesSearch && trainer.assignedProperties < 6;
    }

    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTrainers.length / trainersPerPage);
  const startIndex = (currentPage - 1) * trainersPerPage;
  const endIndex = startIndex + trainersPerPage;
  const currentTrainers = filteredTrainers.slice(startIndex, endIndex);

  const handleAssignProperty = (trainerId) => {
    console.log(`Assigning property to trainer ${trainerId}`);
    // In a real app, this would open a modal to select and assign a property
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      {/* Background with browser bar */}
      <div className={styles.browserBar}>
        <div className={styles.browserBarContent}>
          <div className={styles.browserBarLeft}>
            <img
              src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/e71dc262b006089798db2062a87eba7df0a53713?placeholderIfAbsent=true"
              alt="Browser menu"
              className={styles.menuIcon}
            />
            <div className={styles.urlBar}>
              <div className={styles.urlContent}>
                <div className={styles.urlText}>
                  https://housekeepers.com
                </div>
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/ab3c402689ba3c12d1bcce6e17c4c340179cc5ab?placeholderIfAbsent=true"
                alt="Dropdown"
                className={styles.dropdownIcon}
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
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Overview</div>
              </div>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={styles.navText}>Create New Property</div>
              </div>
              <div className={styles.navItem}>
                <img
                  src="https://api.builder.io/api/v1/image/assets/90f0127e44d34b6aade2e3c689977317/aa3a4e0c1f96066ff4bb10202c64def1bcd99d75?placeholderIfAbsent=true"
                  alt="Assign Property"
                  className={styles.navIconImage}
                />
                <div className={styles.navText}>Assign Property</div>
              </div>
              <div className={styles.navItem}>
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
                  <div className={styles.profileName}>
                    <div className={styles.nameText}>{getAccountName()}</div>
                  </div>
                  <div className={styles.profileEmail}>{getUserEmail()}</div>
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
                <TrainerCard
                  key={trainer.id}
                  trainer={trainer}
                  onAssignProperty={handleAssignProperty}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerList;
