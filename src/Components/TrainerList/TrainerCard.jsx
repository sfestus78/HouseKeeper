import React from 'react';
import styles from './TrainerCard.module.css';

const TrainerCard = ({ trainer, onAssignProperty }) => {
  const handleAssignClick = () => {
    onAssignProperty(trainer.id);
  };

  return (
    <div className={styles.trainerCard}>
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
              <div className={styles.levelText}>{trainer.level}</div>
            </div>
          </div>
        </div>

        <div className={styles.trainerInfo}>
          <div className={styles.trainerName}>{trainer.name}</div>
          <div className={styles.assignmentInfo}>
            <span>Assigned to </span>
            <span className={styles.assignmentCount}>{trainer.assignedProperties} Properties</span>
          </div>
        </div>

        <button
          className={styles.assignButton}
          onClick={handleAssignClick}
        >
          Assign Property
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;
