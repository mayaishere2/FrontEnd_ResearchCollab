import React, { useState } from 'react';
import './ProjectSearchPage.css';
import { FaArrowRight } from 'react-icons/fa'; // Add this line

function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const dummyProjects = [
    { title: 'Smart Farming App', synopsis: 'Helps farmers track crops and connect with buyers.' },
    { title: 'AI Legal Assistant', synopsis: 'Analyzes contracts using NLP models.' },
    { title: 'Fitness Tracker with Firebase', synopsis: 'Tracks user workouts and syncs with the cloud.' },
  ];

  const handleSelectIdea = (title) => {
    setSearchText(title);
    setShowPopup(false);
  };

  const triggerSearch = () => {
    setQuery(searchText.trim());
  };

  return (
    <div className="search-layout">
      <nav className="search-sidebar"></nav>

      <div className="search-main">
        <div className="centered-container">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search for a project idea..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-arrow-btn" onClick={triggerSearch}>
              <FaArrowRight size={20} />
            </button>
          </div>

          <button className="choose-idea-button" onClick={() => setShowPopup(true)}>
            Choose Project Idea
          </button>
        </div>

        {query && (
          <div className="search-results">
            <p>Searching for: <strong>{query}</strong></p>
          </div>
        )}

        {showPopup && (
          <div className="modal-overlay" onClick={() => setShowPopup(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Select a Project Idea</h2>
              <div className="idea-list">
                {dummyProjects.map((proj, idx) => (
                  <div key={idx} className="idea-item" onClick={() => handleSelectIdea(proj.title)}>
                    <h4>{proj.title}</h4>
                    <p>{proj.synopsis}</p>
                  </div>
                ))}
              </div>
              <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
