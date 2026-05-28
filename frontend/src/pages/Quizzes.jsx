import { useState, useEffect } from 'react';
import { api } from '../api.js';
import './Quizzes.css';

export default function Quizzes({ topics }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questionLimit, setQuestionLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setLoading(true);
    setResults([]);
    setQuizComplete(false);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    const url = selectedTopic
      ? `/api/quiz/questions?topic_id=${selectedTopic}&limit=${questionLimit}`
      : `/api/quiz/questions?limit=${questionLimit}`;
    api(url)
      .then(r => r.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
  };

  const nextQuestion = () => {
    const q = questions[currentIndex];
    const isCorrect = selectedAnswer === q.correct_index;
    if (isCorrect) setScore(s => s + 1);
    setResults(r => [...r, {
      question_id: q.id,
      correct: isCorrect,
      correct_index: q.correct_index,
      explanation: q.explanation,
    }]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      submitQuiz();
    }
  };

  const submitQuiz = () => {
    api('/api/quiz/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic_id: selectedTopic || null, answers: results }),
    }).catch(() => {});
  };

  if (questions.length === 0 && !loading) {
    return (
      <div className="quizzes">
        <h1 className="page-title">📝 Practice Quizzes</h1>
        <div className="quiz-setup card">
          <div className="setup-row">
            <label>Topic:</label>
            <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
              <option value="">All Topics</option>
              {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div className="setup-row">
            <label>Questions:</label>
            <select value={questionLimit} onChange={e => setQuestionLimit(Number(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
          <button className="btn btn-primary start-btn" onClick={startQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Loading questions...</div>;

  if (quizComplete) {
    const correct = results.filter(r => r.correct).length;
    return (
      <div className="quizzes">
        <h1 className="page-title">📝 Quiz Complete!</h1>
        <div className="quiz-result card">
          <div className="result-score">
            <span className="result-value">{correct}</span>
            <span className="result-divider">/</span>
            <span className="result-total">{results.length}</span>
          </div>
          <div className="result-percentage">{Math.round((correct / results.length) * 100)}%</div>
          <button className="btn btn-primary" onClick={() => { setQuestions([]); setResults([]); }}>
            Take Another Quiz
          </button>
        </div>
        <div className="result-details">
          {results.map((r, i) => (
            <div key={i} className={`result-item ${r.correct ? 'correct' : 'incorrect'}`}>
              <div className="result-item-header">
                <span className="result-icon">{r.correct ? '✅' : '❌'}</span>
                <span className="result-detail-label">Question {i + 1}</span>
              </div>
              <p className="result-explanation">{r.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];

  return (
    <div className="quizzes">
      <h1 className="page-title">📝 Practice Quiz</h1>
      <div className="quiz-progress">
        <div className="quiz-progress-bar">
          <div className="quiz-progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="quiz-progress-text">{currentIndex + 1} / {questions.length}</span>
      </div>

      <div className="question-card card">
        <div className="question-difficulty">
          <span className={`tag tag-${q.difficulty}`}>{q.difficulty}</span>
        </div>
        <p className="question-text">{q.question}</p>

        <div className="options">
          {q.options.map((opt, i) => {
            let cls = 'option';
            if (showResult) {
              if (i === q.correct_index) cls += ' correct';
              else if (i === selectedAnswer && i !== q.correct_index) cls += ' incorrect';
              else cls += ' disabled';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                <span className="option-text">{opt}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="question-feedback">
            <p className="explanation">{q.explanation}</p>
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
