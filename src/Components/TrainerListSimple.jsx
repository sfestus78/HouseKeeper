import React from 'react';

const TrainerListSimple = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Trainer List Page</h1>
      <p>This is the trainer list page. It's working!</p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '16px',
        marginTop: '20px'
      }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
          <div key={id} style={{
            border: '1px solid #E1E5EA',
            borderRadius: '16px',
            padding: '16px',
            backgroundColor: '#F9F8FC'
          }}>
            <h3>Trainer {id}</h3>
            <p>Level 1</p>
            <p>Assigned to 6 Properties</p>
            <button style={{
              color: '#EF233C',
              textDecoration: 'underline',
              border: 'none',
              background: 'none',
              cursor: 'pointer'
            }}>
              Assign Property
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerListSimple;
