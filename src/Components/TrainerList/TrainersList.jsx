import React, { useState } from 'react';
import './TrainersList.css';

const TrainersList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock trainers data
  const trainers = [
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
    }
  ];

  const trainersPerPage = 8;
  const totalPages = Math.ceil(trainers.length / trainersPerPage);
  const startIndex = (currentPage - 1) * trainersPerPage;
  const currentTrainers = trainers.slice(startIndex, startIndex + trainersPerPage);

  const TrainerCard = ({ trainer }) => (
    <div className="trainer-card">
      <div className="trainer-card-content">
        <div className="trainer-header">
          <img src={trainer.avatar} alt={trainer.name} className="trainer-avatar" />
          <div className="trainer-level-badge">{trainer.level}</div>
        </div>
        <div className="trainer-info">
          <div className="trainer-name">{trainer.name}</div>
          <div className="trainer-assigned">
            Assigned Properties: <span className="assignment-count">{trainer.assignedProperties}</span>
          </div>
        </div>
        <div className="assign-property-link">Assign Property</div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="pagination-container">
      <div className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}>1</div>
      <div className={`pagination-button ${currentPage === 2 ? 'active' : ''}`}>2</div>
      <div className={`pagination-button ${currentPage === 3 ? 'active' : ''}`}>3</div>
      <div className={`pagination-button ${currentPage === 4 ? 'active' : ''}`}>4</div>
      <div className="pagination-ellipsis">...</div>
      <div className="pagination-button">15</div>
    </div>
  );

  return (
    <div className="trainers-list-container">
      <div className="trainers-header">
        <div className="page-title">List of Trainers</div>
        <div className="page-subtitle">
          Fill in the following fields to add a new property.
        </div>
      </div>

      <div className="trainers-grid">
        {currentTrainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default TrainersList;
