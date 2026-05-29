import { useState, useEffect } from 'react';
import { api } from '../api.js';
import './Flashcards.css';

export default function Flashcards({ topics }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCards = (topicId) => {
    setLoading(true);
    setFlipped(false);
    setCurrentIndex(0);
    const url = topicId ? `/api/flashcards?topic_id=${topicId}` : '/api/flashcards';
    api(url)
      .then(r => r.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCards(selectedTopic);
  }, [selectedTopic]);

  const handleReview = (confidence) => {
    if (!cards[currentIndex]) return;
    api(`/api/flashcards/${cards[currentIndex].id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ confidence }),
    }).catch(() => {});
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCards([]);
      setCurrentIndex(0);
    }
  };

  const diffClass = (d) => {
    if (d === 'easy') return 'tag-easy';
    if (d === 'hard') return 'tag-hard';
    return 'tag-medium';
  };

  if (loading) return <div className="loading">Loading flashcards...</div>;

  if (cards.length === 0) {
    return (
      <div className="flashcards">
        <h1 className="page-title">Flashcards</h1>
        <div className="filters">
          <select
            className="topic-select"
            value={selectedTopic}
            onChange={e => setSelectedTopic(e.target.value)}
          >
            <option value="">All Topics</option>
            {topics.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
        <div className="empty-state">
          <p>No more cards to review!</p>
          <button className="btn btn-primary" onClick={() => { setSelectedTopic(''); fetchCards(''); }}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  const card = cards[currentIndex];

  return (
    <div className="flashcards">
      <h1 className="page-title">Flashcards</h1>
      <div className="filters">
        <select
          className="topic-select"
          value={selectedTopic}
          onChange={e => setSelectedTopic(e.target.value)}
        >
          <option value="">All Topics</option>
          {topics.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <span className="card-counter">{currentIndex + 1} / {cards.length}</span>
      </div>

      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="flashcard-front">
            <div className="card-difficulty">
              <span className={`tag ${diffClass(card.difficulty)}`}>{card.difficulty}</span>
            </div>
            <p className="card-question">{card.question}</p>
            <p className="flip-hint">Click to reveal answer</p>
          </div>
          <div className="flashcard-back">
            <p className="card-answer">{card.answer}</p>
          </div>
        </div>
      </div>

      {flipped && (
        <div className="confidence-buttons">
          <p className="confidence-label">How well did you know this?</p>
          <div className="confidence-row">
            {[1, 2, 3, 4, 5].map(level => (
              <button
                key={level}
                className={`confidence-btn level-${level}`}
                onClick={() => handleReview(level)}
              >
                {level === 1 ? 'Not at all' : level === 2 ? 'Poorly' : level === 3 ? 'Okay' : level === 4 ? 'Well' : 'Perfectly'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
