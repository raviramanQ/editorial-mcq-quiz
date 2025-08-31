import React, { useState, useEffect } from 'react';
import questionService from '../services/questionService';
import './DateSelector.css';

const DateSelector = ({ onDateSelect, selectedSection, onBackToSections }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedSection) {
      loadAvailableDates();
    }
  }, [selectedSection]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadAvailableDates = async () => {
    setIsLoading(true);
    try {
      const dates = await questionService.getAvailableDates(selectedSection.id);
      setAvailableDates(dates);
    } catch (error) {
      console.error('Error loading available dates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    onDateSelect(date);
  };

  if (isLoading) {
    return (
      <div className="date-selector-container">
        <div className="loading">
          <h2>Loading Available Question Sets...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="date-selector-container">
      <div className="date-selector">
        <div className="section-header">
          <button className="back-btn" onClick={onBackToSections}>
            ← Back to Home
          </button>
          <div className="section-info">
            <div className="section-icon" style={{ color: selectedSection.color }}>
              {selectedSection.icon}
            </div>
            <div>
              <h1>{selectedSection.title} Practice</h1>
              <p className="subtitle">{selectedSection.description}</p>
            </div>
          </div>
        </div>
        
        <div className="date-cards">
          {availableDates.map((dateInfo) => (
            <div 
              key={dateInfo.date} 
              className="date-card"
              onClick={() => handleDateSelect(dateInfo.date)}
            >
              <div className="date-header">
                <h3>{dateInfo.title}</h3>
                <span className="date-badge">{dateInfo.date}</span>
              </div>
              <p className="date-description">{dateInfo.description}</p>
              <div className="card-footer">
                <span className="question-count">Questions Available</span>
                <span className="duration">20 sec/question</span>
              </div>
            </div>
          ))}
        </div>

        {availableDates.length === 0 && (
          <div className="no-questions">
            <h3>No questions available yet</h3>
            <p>Questions for {selectedSection.title} will be added soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
