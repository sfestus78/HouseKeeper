import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin } from 'lucide-react';
import './AssignTrainerModal.css';

const AssignTrainerModal = ({ isOpen, onClose, onAssign, property, trainers = [] }) => {
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  if (!isOpen) return null;

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trainer.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = () => {
    if (selectedTrainer) {
      onAssign(selectedTrainer.id);
      setSelectedTrainer(null);
      setSearchTerm('');
    }
  };

  const handleClose = () => {
    setSelectedTrainer(null);
    setSearchTerm('');
    onClose();
  };

  return (
    <div className="assign-modal-overlay">
      <div className="assign-modal-container">
        {/* Modal Header */}
        <div className="assign-modal-header">
          <div>
            <h2 className="assign-modal-title">Assign Trainer</h2>
            <p className="assign-modal-subtitle">
              Select a trainer to assign to <strong>{property?.name}</strong>
            </p>
          </div>
          <button 
            onClick={handleClose}
            className="assign-modal-close-btn"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="assign-modal-search">
          <input
            type="text"
            placeholder="Search trainers by name, email, or level..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="assign-modal-search-input"
          />
        </div>

        {/* Trainers List */}
        <div className="assign-modal-trainers-list">
          {filteredTrainers.length === 0 ? (
            <div className="assign-modal-no-results">
              <p>No trainers found matching your search.</p>
            </div>
          ) : (
            filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                className={`assign-modal-trainer-card ${
                  selectedTrainer?.id === trainer.id ? 'selected' : ''
                }`}
                onClick={() => setSelectedTrainer(trainer)}
              >
                <div className="assign-modal-trainer-info">
                  <img
                    src={trainer.avatar}
                    alt={trainer.name}
                    className="assign-modal-trainer-avatar"
                  />
                  <div className="assign-modal-trainer-details">
                    <h3 className="assign-modal-trainer-name">{trainer.name}</h3>
                    <div className="assign-modal-trainer-level">
                      Level: <span className="assign-modal-level-badge">{trainer.level}</span>
                    </div>
                    <div className="assign-modal-trainer-contact">
                      <div className="assign-modal-contact-item">
                        <Mail size={14} />
                        <span>{trainer.email}</span>
                      </div>
                      <div className="assign-modal-contact-item">
                        <Phone size={14} />
                        <span>{trainer.phone}</span>
                      </div>
                      <div className="assign-modal-contact-item">
                        <MapPin size={14} />
                        <span>{trainer.address}</span>
                      </div>
                    </div>
                    <div className="assign-modal-trainer-properties">
                      Currently assigned to {trainer.assignedProperties} properties
                    </div>
                  </div>
                </div>
                <div className="assign-modal-select-indicator">
                  {selectedTrainer?.id === trainer.id && (
                    <div className="assign-modal-selected-check">✓</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="assign-modal-footer">
          <button 
            onClick={handleClose}
            className="assign-modal-cancel-btn"
          >
            Cancel
          </button>
          <button 
            onClick={handleAssign}
            disabled={!selectedTrainer}
            className="assign-modal-assign-btn"
          >
            Assign Trainer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTrainerModal;
