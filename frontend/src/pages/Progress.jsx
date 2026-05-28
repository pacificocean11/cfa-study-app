import { useState, useEffect } from 'react';
import { api } from '../api.js';
import './Progress.css';

export default function Progress() {
  const [overview, setOverview] = useState(null);
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    api('/api/progress/overview')
      .then(r => r.json())
      .then(setOverview)
      .catch(() => {});
    api('/api/quiz/attempts')
      .then(r => r.json())
      .then(setAttempts)
      .catch(() => {});
  }, []);

  if (!overview) return <div className="loading">Loading progress...</div>;

  return (
    <div className="progress-page">
      <h1 className="page-title">📈 Progress Report</h1>

      <div className="progress-stats">
        <div className="stat-card">
          <div className="stat-icon">🃏</div>
          <div className="stat-value">{overview.reviewedCards}/{overview.totalFlashcards}</div>
          <div className="stat-label">Cards Reviewed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{overview.avgConfidence}</div>
          <div className="stat-label">Avg Confidence (1-5)</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-value">{overview.quizStats.attempts}</div>
          <div className="stat-label">Quiz Attempts</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{overview.quizStats.percentage}%</div>
          <div className="stat-label">Overall Accuracy</div>
        </div>
      </div>

      <h2 className="section-title">Topic Breakdown</h2>
      <div className="topic-breakdown">
        {overview.topicStats.map(topic => {
          const pct = topic.quiz_total > 0 ? Math.round((topic.quiz_correct / topic.quiz_total) * 100) : 0;
          return (
            <div key={topic.id} className="breakdown-item">
              <div className="breakdown-header">
                <span className="breakdown-name">{topic.name}</span>
                <span className="breakdown-pct">{pct}%</span>
              </div>
              <div className="breakdown-bar-bg">
                <div className="breakdown-bar-fill" style={{ width: `${pct}%`, background: topic.color }} />
              </div>
              <div className="breakdown-detail">
                <span>Quiz: {topic.quiz_correct}/{topic.quiz_total}</span>
                <span>Cards: {topic.flashcard_count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {attempts.length > 0 && (
        <>
          <h2 className="section-title">Recent Quiz Attempts</h2>
          <div className="attempts-list">
            {attempts.map(a => (
              <div key={a.id} className="attempt-item card">
                <div className="attempt-score">
                  <span className="attempt-correct">{a.score}</span>
                  <span className="attempt-slash">/</span>
                  <span className="attempt-total">{a.total}</span>
                </div>
                <div className="attempt-info">
                  <span className="attempt-pct">{Math.round((a.score / a.total) * 100)}%</span>
                  <span className="attempt-date">{new Date(a.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
