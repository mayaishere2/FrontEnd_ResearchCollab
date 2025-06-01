import React, { useState } from 'react';

const AddProjectPopup = ({ onClose, onAdd }) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const [deadline, setDeadline] = useState('');
  const [structure, setStructure] = useState({
    introduction: false,
    literatureReview: false,
    methodology: false,
    results: false,
    discussion: false,
    conclusion: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setStructure(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStructure = Object.keys(structure).filter(key => structure[key]);
    onAdd({
      projectName,
      description,
      topic,
      deadline,
      projectStructure: selectedStructure,
    });
    // Optionally reset the form here or close popup
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2 style={styles.title}>Add New Project</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            Project Name
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ ...styles.input, height: '80px' }}
            />
          </label>

          <label style={styles.label}>
            Topic
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Deadline
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={styles.input}
            />
          </label>

          <fieldset style={{ ...styles.label, border: 'none', marginTop: '10px' }}>
            <legend style={{ marginBottom: '8px', fontWeight: 'bold' }}>Project Structure (select all that apply)</legend>
            {Object.entries(structure).map(([key, checked]) => (
              <label key={key} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="checkbox"
                  name={key}
                  checked={checked}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: '8px' }}
                />
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </fieldset>

          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <button type="button" onClick={onClose} style={styles.cancelButton}>Cancel</button>
            <button type="submit" style={styles.addButton}>Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: '#fff',
    border: '2px solid teal',
    borderRadius: '8px',
    padding: '20px',
    width: '80%',
    maxWidth: '500px',
    maxHeight: '80vh',      // Limits height to 80% of viewport height
    overflowY: 'auto',     // Enables vertical scrolling if content exceeds maxHeight
    boxSizing: 'border-box',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  title: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '1.25rem',
    color: '#000',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#000',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    marginTop: '5px',
    border: '1.5px solid teal',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  addButton: {
    backgroundColor: 'teal',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    marginLeft: '10px',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: '#000',
    border: 'none',
    borderRadius: '20px',
    padding: '8px 20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
};

export default AddProjectPopup;
