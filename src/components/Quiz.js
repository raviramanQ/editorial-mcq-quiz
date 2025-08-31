import React, { useState, useEffect } from 'react';
import questionService from '../services/questionService';
import DateSelector from './DateSelector';
import VocabularyHome from './SectionSelector';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20); // 20 seconds per question
  const [isLoading, setIsLoading] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const [showDateSelector, setShowDateSelector] = useState(false);

  // Initialize state from URL and localStorage on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    const dateParam = urlParams.get('date');
    const questionParam = urlParams.get('question');
    
    if (pageParam === 'dates') {
      setShowHome(false);
      setShowDateSelector(true);
    } else if (dateParam) {
      setSelectedDate(dateParam);
      setShowHome(false);
      setShowDateSelector(false);
      loadQuestions(dateParam);
      
      // Restore question progress
      if (questionParam) {
        const questionIndex = parseInt(questionParam) - 1;
        if (questionIndex >= 0) {
          setCurrentQuestion(questionIndex);
        }
      }
      
      // Restore selected answers from localStorage
      const savedAnswers = localStorage.getItem(`quiz-answers-${dateParam}`);
      if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
      }
    }
  }, []);

  // Save state to URL and localStorage whenever it changes
  useEffect(() => {
    if (selectedDate && !showHome && !showDateSelector) {
      const url = new URL(window.location);
      url.searchParams.set('date', selectedDate);
      url.searchParams.set('question', currentQuestion + 1);
      window.history.replaceState({}, '', url);
      
      // Save answers to localStorage
      localStorage.setItem(`quiz-answers-${selectedDate}`, JSON.stringify(selectedAnswers));
    }
  }, [selectedDate, currentQuestion, selectedAnswers, showHome, showDateSelector]);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizCompleted && selectedDate && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      // Auto-move to next question when time runs out
      handleNext();
    }
  }, [timeLeft, isQuizCompleted, selectedDate, questions.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartQuiz = () => {
    setShowHome(false);
    setShowDateSelector(true);
    
    // Update URL to show date selector page
    const url = new URL(window.location);
    url.searchParams.set('page', 'dates');
    window.history.replaceState({}, '', url);
  };

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setShowDateSelector(false);
    await loadQuestions(date);
    
    // Update URL
    const url = new URL(window.location);
    url.searchParams.delete('page');
    url.searchParams.set('date', date);
    url.searchParams.set('question', '1');
    window.history.replaceState({}, '', url);
  };

  const handleBackToHome = () => {
    setShowDateSelector(false);
    setShowHome(true);
    
    // Clear URL parameters when going back to home
    const url = new URL(window.location);
    url.searchParams.delete('page');
    url.searchParams.delete('date');
    url.searchParams.delete('question');
    window.history.replaceState({}, '', url);
  };

  const loadQuestions = async (date) => {
    setIsLoading(true);
    try {
      const fetchedQuestions = await questionService.getQuestionsByDate(date, 'vocabulary');
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(20); // Reset timer for next question
    } else {
      handleQuizComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTimeLeft(20); // Reset timer for previous question
    }
  };

  const handleQuizComplete = () => {
    setIsQuizCompleted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!questions || questions.length === 0) return 0;
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    if (!questions || questions.length === 0) return 0;
    return Math.round((calculateScore() / questions.length) * 100);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeLeft(20);
    setIsQuizCompleted(false);
    setShowResults(false);
    setShowHome(true);
    setShowDateSelector(false);
    setSelectedDate(null);
    
    // Clear URL parameters and localStorage
    const url = new URL(window.location);
    url.searchParams.delete('page');
    url.searchParams.delete('date');
    url.searchParams.delete('question');
    window.history.replaceState({}, '', url);
    
    if (selectedDate) {
      localStorage.removeItem(`quiz-answers-${selectedDate}`);
    }
  };

  if (showHome) {
    return <VocabularyHome onStartQuiz={handleStartQuiz} />;
  }

  if (showDateSelector) {
    return (
      <DateSelector 
        onDateSelect={handleDateSelect} 
        selectedSection={{id: 'vocabulary', title: 'Vocabulary'}}
        onBackToSections={handleBackToHome}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>Loading Vocabulary Questions...</h2>
          <div className="spinner"></div>
          <p>Loading questions from selected date</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    
    return (
      <div className="quiz-container">
        <div className="results">
          <h2>Quiz Completed!</h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{percentage}%</span>
            </div>
            <p>You scored {score} out of {questions.length} questions correctly</p>
          </div>
          
          <div className="results-breakdown">
            <h3>Review Your Answers:</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <h4>Question {index + 1}</h4>
                  <p className="question-text">{question.question}</p>
                  <div className="answer-review">
                    <p><strong>Your answer:</strong> {userAnswer || 'Not answered'}</p>
                    <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
                    <p className="explanation"><strong>Explanation:</strong> {question.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="restart-btn" onClick={restartQuiz}>
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  // Handle case where questions haven't loaded yet or are empty
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>No Questions Available</h2>
          <p>Unable to load questions for the selected date.</p>
          <button className="restart-btn" onClick={restartQuiz}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  // Handle case where currentQuestion is out of bounds
  if (!currentQ) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>Loading Question...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="header-top">
          <button className="back-home-btn" onClick={restartQuiz}>
            ← Back to Home
          </button>
          <h1>Vocabulary Practice</h1>
        </div>
        <div className="quiz-info">
          <div className="timer">
            <span className="timer-label">Time Left:</span>
            <span className={`timer-value ${timeLeft < 10 ? 'warning' : ''}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="progress">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="question-container">
        <h2 className="question-text">{currentQ.question}</h2>
        
        <div className="options-container">
          {currentQ.options && currentQ.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
            const isSelected = selectedAnswers[currentQuestion] === optionLetter;
            
            return (
              <button
                key={index}
                className={`option-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(optionLetter)}
              >
                <span className="option-letter">{optionLetter}</span>
                <span className="option-text">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="navigation-container">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        
        <div className="question-indicators">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentQuestion ? 'active' : ''} ${
                selectedAnswers[index] ? 'answered' : ''
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        
        <button 
          className="nav-btn next-btn" 
          onClick={handleNext}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
