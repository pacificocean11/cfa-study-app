import { useState, useEffect } from 'react';
import { api } from '../api.js';
import './Dashboard.css';

export default function Dashboard({ topics }) {
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    api('/api/progress/overview')
      .then(r => r.json())
      .then(setOverview)
      .catch(() => {});
  }, []);

  if (!overview) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="page-title">Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">style</span>
          <div className="stat-value">{overview.totalFlashcards}</div>
          <div className="stat-label">Flashcards</div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">quiz</span>
          <div className="stat-value">{overview.totalQuestions}</div>
          <div className="stat-label">Practice Questions</div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">check_circle</span>
          <div className="stat-value">{overview.reviewedCards}</div>
          <div className="stat-label">Cards Reviewed</div>
        </div>
        <div className="stat-card">
          <span className="material-symbols-outlined stat-icon">analytics</span>
          <div className="stat-value">{overview.quizStats.percentage}%</div>
          <div className="stat-label">Quiz Accuracy</div>
        </div>
      </div>

      <h2 className="section-title">Topics</h2>
      <div className="topic-grid">
        {overview.topicStats.map(topic => (
          <div key={topic.id} className="topic-card card" style={{ borderLeftColor: topic.color, borderLeftWidth: 4 }}>
            <div className="topic-header">
              <h3 className="topic-name">{topic.name}</h3>
              <div className="topic-counts">
                <span>{topic.flashcard_count} cards</span>
                <span className="dot">·</span>
                <span>{topic.question_count} questions</span>
              </div>
            </div>
            {topic.quiz_total > 0 && (
              <div className="topic-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(topic.quiz_correct / topic.quiz_total) * 100}%`, background: topic.color }}
                  />
                </div>
                <span className="progress-text">
                  {topic.quiz_correct}/{topic.quiz_total} correct
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
