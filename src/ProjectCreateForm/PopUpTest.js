import React, { useState } from 'react';
import AddProjectPopup from './ProjectCreateForm'; // Adjust the path according to your folder structure

const LabDashboard = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAddProject = (projectData) => {
    console.log('New Project Data:', projectData);
    // Here you can handle the projectData,
    // e.g., send it to a backend API or update your state/store.
    
    setPopupVisible(false); // Close popup after adding
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <button
        onClick={() => setPopupVisible(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: 'teal',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: '600',
        }}
      >
        Add New Project
      </button>

      {isPopupVisible && (
        <AddProjectPopup
          onAdd={handleAddProject}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default LabDashboard;
