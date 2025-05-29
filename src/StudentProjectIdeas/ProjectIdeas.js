import React, { useState } from 'react';
import './ProjectIdeas.css';
import { FiEdit2, FiX } from 'react-icons/fi'; // Import icons

function ProjectIdeasPage() {
  const [projects, setProjects] = useState([
    {
      topic: 'Artificial Intelligence',
      title: 'Neural Language Models for Legal Document Understanding',
      synopsis:
        'This research explores how transformer-based models like BERT can automate understanding and classification of complex legal documents, reducing manual workload and improving accuracy in legal tech applications.',
    },
    {
      topic: 'Cyber Security',
      title: 'Decentralized Authentication Using Blockchain in IoT Devices',
      synopsis:
        'This study investigates blockchain-based security solutions for IoT authentication systems, ensuring tamper-proof identities in smart environments.',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({ topic: '', title: '', synopsis: '' });
  const [editIndex, setEditIndex] = useState(null);

  const topics = [
    'Artificial Intelligence',
    'Cyber Security',
    'Nano',
    'Autonomous Systems',
    'Mathematics',
  ];

  const groupedProjects = projects.reduce((acc, proj) => {
    if (!acc[proj.topic]) acc[proj.topic] = [];
    acc[proj.topic].push(proj);
    return acc;
  }, {});

  const addOrEditProject = () => {
    if (!formData.topic || !formData.title || !formData.synopsis) return;

    const updated = [...projects];
    if (editIndex !== null) {
      updated[editIndex] = formData;
    } else {
      updated.push(formData);
    }
    setProjects(updated);
    setFormData({ topic: '', title: '', synopsis: '' });
    setEditIndex(null);
    setShowModal(false);
  };

  const deleteProject = (index) => {
    const updated = [...projects];
    updated.splice(index, 1);
    setProjects(updated);
  };

  const openEditModal = (project, index) => {
    setFormData(project);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div className="layout">
      <nav className="sidebar"></nav>
      <div className="project-page">
        <div className="header">
          <h1>My Project Ideas</h1>
          <button onClick={() => {
            setFormData({ topic: '', title: '', synopsis: '' });
            setEditIndex(null);
            setShowModal(true);
          }}>
            + Add Project Idea
          </button>
        </div>

        {Object.keys(groupedProjects).map((topic) => (
          <div key={topic} className="topic-section">
            <h2>{topic}</h2>
            <div className="cards-container">
              {groupedProjects[topic].map((proj, idx) => {
                const globalIndex = projects.findIndex(
                  (p) => p.title === proj.title && p.synopsis === proj.synopsis
                );
                return (
                  <div className="card" key={idx}>
  <div className="card-icons">
    <FiEdit2 className="icon edit-icon" onClick={() => openEditModal(proj, globalIndex)} />
    <FiX className="icon delete-icon" onClick={() => deleteProject(globalIndex)} />
  </div>
  <div className="card-title">{proj.title}</div>
  <div className="card-topic">{proj.topic}</div>
  <div className="card-synopsis">{proj.synopsis}</div>
</div>

                );
              })}
            </div>
          </div>
        ))}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>{editIndex !== null ? 'Edit Project Idea' : 'Add Project Idea'}</h2>

              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="custom-input"
              >
                <option value="">Select Topic</option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="custom-input"
              />

              <textarea
                placeholder="Synopsis"
                value={formData.synopsis}
                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                className="custom-textarea"
              />

              <div className="modal-buttons">
                <button className="cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="add" onClick={addOrEditProject}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedProject && (
          <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedProject.title}</h2>
              <div className='Topic-Tag'> <div className="card-topic">{selectedProject.topic}</div> </div>
              <p>{selectedProject.synopsis}</p>
              <button className="close" onClick={() => setSelectedProject(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectIdeasPage;
