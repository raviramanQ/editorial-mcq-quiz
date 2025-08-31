import React from 'react';
import './SectionSelector.css';

const VocabularyHome = ({ onStartQuiz }) => {
  return (
    <div className="vocabulary-home-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">📚</div>
          <h1 className="hero-title">Editorial Vocabulary</h1>
          <p className="hero-subtitle">Enhance your vocabulary with daily practice questions</p>
          <p className="hero-description">
            Test your knowledge of editorial vocabulary and word meanings. 
            Choose from different dates to practice with curated question sets.
          </p>
          
          <button className="start-quiz-btn" onClick={() => onStartQuiz()}>
            <span className="btn-icon">🚀</span>
            Start Vocabulary Quiz
          </button>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⏱️</div>
            <h3>Timed Questions</h3>
            <p>20 seconds per question to test your quick thinking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Date-wise Practice</h3>
            <p>Practice with questions organized by specific dates</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Detailed Results</h3>
            <p>Get comprehensive feedback with explanations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Editorial Focus</h3>
            <p>Words commonly found in newspapers and editorials</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyHome;
